import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { GuestbookEntry } from "../../models/guestbook";

interface GuestbookWallProps {
  entries: GuestbookEntry[];
  loading: boolean;
}

interface NotePlacement {
  left: number;
  top: number;
  angle: number;
  z: number;
  accent: string;
}

interface NoteSize {
  width: number;
  height: number;
}

interface DragState {
  id: string;
  pointerId: number;
  offsetX: number;
  offsetY: number;
}

interface LayoutMetrics {
  noteSize: NoteSize;
  margin: number;
  gapX: number;
  gapY: number;
  columns: number;
  originX: number;
  canvasHeight: number;
  maxLeft: number;
  maxTop: number;
}

const NOTE_ACCENTS = ["#fdeff4", "#ffdce7", "#ffcddc", "#ffc0d3", "#ff9fbe", "#ff7fa8"];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function hashValue(input: string): number {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getNoteSize(boardWidth: number): NoteSize {
  if (boardWidth < 560) {
    return { width: 168, height: 152 };
  }

  return { width: 224, height: 180 };
}

function parseDateValue(value: string): number {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

function buildLayoutMetrics(boardWidth: number, boardHeight: number, entryCount: number): LayoutMetrics {
  const noteSize = getNoteSize(boardWidth);
  const margin = 12;
  const gapX = 18;
  const gapY = 18;

  if (boardWidth === 0 || boardHeight === 0) {
    return {
      noteSize,
      margin,
      gapX,
      gapY,
      columns: 1,
      originX: margin,
      canvasHeight: boardHeight,
      maxLeft: margin,
      maxTop: margin
    };
  }

  const availableWidth = Math.max(noteSize.width, boardWidth - margin * 2);
  const columns = Math.max(1, Math.floor((availableWidth + gapX) / (noteSize.width + gapX)));
  const usedWidth = columns * noteSize.width + (columns - 1) * gapX;
  const originX = margin + Math.max(0, (availableWidth - usedWidth) / 2);
  const rows = Math.max(1, Math.ceil(Math.max(entryCount, 1) / columns));
  const contentHeight = margin * 2 + rows * noteSize.height + (rows - 1) * gapY;
  const canvasHeight = Math.max(boardHeight, contentHeight);
  const maxLeft = Math.max(margin, boardWidth - noteSize.width - margin);
  const maxTop = Math.max(margin, canvasHeight - noteSize.height - margin);

  return {
    noteSize,
    margin,
    gapX,
    gapY,
    columns,
    originX,
    canvasHeight,
    maxLeft,
    maxTop
  };
}

function buildGridPlacement(index: number, layout: LayoutMetrics): Pick<NotePlacement, "left" | "top"> {
  const row = Math.floor(index / layout.columns);
  const column = index % layout.columns;
  const left = clamp(
    layout.originX + column * (layout.noteSize.width + layout.gapX),
    layout.margin,
    layout.maxLeft
  );
  const top = clamp(
    layout.margin + row * (layout.noteSize.height + layout.gapY),
    layout.margin,
    layout.maxTop
  );

  return { left, top };
}

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Unknown date";
  }
  return parsed.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function buildAutoPlacement(
  entry: GuestbookEntry,
  index: number,
  layout: LayoutMetrics
): NotePlacement {
  const { left, top } = buildGridPlacement(index, layout);
  const seed = hashValue(`${entry.id}:${entry.name}:${index}`);

  return {
    left,
    top,
    angle: 0,
    z: index + 1,
    accent: NOTE_ACCENTS[seed % NOTE_ACCENTS.length]
  };
}

export function GuestbookWall({ entries, loading }: GuestbookWallProps) {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const zRef = useRef(12);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [manualPlacements, setManualPlacements] = useState<Record<string, NotePlacement>>({});

  const sortedEntries = useMemo(() => {
    return [...entries].sort((left, right) => {
      const dateDiff = parseDateValue(right.createdAt) - parseDateValue(left.createdAt);
      if (dateDiff !== 0) {
        return dateDiff;
      }

      const nameDiff = left.name.localeCompare(right.name);
      if (nameDiff !== 0) {
        return nameDiff;
      }

      return left.id.localeCompare(right.id);
    });
  }, [entries]);

  const layout = useMemo(
    () => buildLayoutMetrics(boardSize.width, boardSize.height, sortedEntries.length),
    [boardSize.width, boardSize.height, sortedEntries.length]
  );

  const autoPlacements = useMemo(() => {
    const next: Record<string, NotePlacement> = {};
    sortedEntries.forEach((entry, index) => {
      next[entry.id] = buildAutoPlacement(entry, index, layout);
    });
    return next;
  }, [sortedEntries, layout]);

  const placements = useMemo(() => {
    const next: Record<string, NotePlacement> = { ...autoPlacements };
    Object.entries(manualPlacements).forEach(([id, placement]) => {
      if (!next[id]) {
        return;
      }

      next[id] = placement;
    });
    return next;
  }, [autoPlacements, manualPlacements]);

  useEffect(() => {
    const element = boardRef.current;
    if (!element) {
      return;
    }

    const updateBoardSize = () => {
      const { width, height } = element.getBoundingClientRect();
      setBoardSize({ width, height });
    };

    updateBoardSize();
    const observer = new ResizeObserver(updateBoardSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setManualPlacements((previous) => {
      const activeIds = new Set(sortedEntries.map((entry) => entry.id));
      const next: Record<string, NotePlacement> = {};
      let changed = false;

      Object.entries(previous).forEach(([id, placement]) => {
        if (!activeIds.has(id)) {
          changed = true;
          return;
        }

        const left = clamp(placement.left, layout.margin, layout.maxLeft);
        const top = clamp(placement.top, layout.margin, layout.maxTop);
        if (left !== placement.left || top !== placement.top) {
          changed = true;
        }

        next[id] = {
          ...placement,
          left,
          top
        };
      });

      if (!changed && Object.keys(previous).length === Object.keys(next).length) {
        return previous;
      }
      return next;
    });
  }, [sortedEntries, layout.margin, layout.maxLeft, layout.maxTop]);

  const startDrag = (
    event: PointerEvent<HTMLLIElement>,
    id: string
  ): void => {
    const board = boardRef.current;
    const note = placements[id];
    if (!board || !note) {
      return;
    }

    const boardRect = board.getBoundingClientRect();
    dragRef.current = {
      id,
      pointerId: event.pointerId,
      offsetX: event.clientX - boardRect.left + board.scrollLeft - note.left,
      offsetY: event.clientY - boardRect.top + board.scrollTop - note.top
    };

    zRef.current += 1;
    setManualPlacements((previous) => {
      const base = previous[id] ?? placements[id];
      if (!base) {
        return previous;
      }

      return {
        ...previous,
        [id]: {
          ...base,
          z: zRef.current
        }
      };
    });

    setDraggingId(id);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLLIElement>, id: string): void => {
    const dragState = dragRef.current;
    const board = boardRef.current;
    if (!dragState || dragState.id !== id || !board) {
      return;
    }

    const boardRect = board.getBoundingClientRect();
    const margin = layout.margin;
    const left = clamp(
      event.clientX - boardRect.left + board.scrollLeft - dragState.offsetX,
      margin,
      layout.maxLeft
    );
    const top = clamp(
      event.clientY - boardRect.top + board.scrollTop - dragState.offsetY,
      margin,
      layout.maxTop
    );

    setManualPlacements((previous) => {
      const base = previous[id] ?? placements[id];
      if (!base) {
        return previous;
      }

      return {
        ...previous,
        [id]: {
          ...base,
          left,
          top
        }
      };
    });
  };

  const endDrag = (event: PointerEvent<HTMLLIElement>, id: string): void => {
    const dragState = dragRef.current;
    if (!dragState || dragState.id !== id || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragRef.current = null;
    setDraggingId(null);
  };

  const stopNoteDrag = (event: PointerEvent<HTMLParagraphElement>): void => {
    event.stopPropagation();
  };

  if (loading) {
    return <p>Loading entries...</p>;
  }

  if (entries.length === 0) {
    return <p>No entries yet. Be the first to sign.</p>;
  }

  return (
    <div className="guestbook-wall-shell">
      <p className="guestbook-wall-hint">Notes are sorted by latest entry. Drag to rearrange.</p>
      <div className="guestbook-wall-board" ref={boardRef}>
        <ul className="guestbook-wall-notes" style={{ height: `${layout.canvasHeight}px` }}>
          {sortedEntries.map((entry, index) => {
            const placement = placements[entry.id];
            const noteStyle: CSSProperties & { ["--note-accent"]?: string } = placement
              ? {
                  left: `${placement.left}px`,
                  top: `${placement.top}px`,
                  transform: `rotate(${placement.angle}deg)`,
                  zIndex: placement.z,
                  "--note-accent": placement.accent
                }
              : {
                  left: `${16 + (index % 4) * 28}px`,
                  top: `${16 + index * 12}px`
                };

            return (
              <li
                key={entry.id}
                className={`guestbook-note ${draggingId === entry.id ? "is-dragging" : ""}`}
                style={noteStyle}
                onPointerDown={(event) => startDrag(event, entry.id)}
                onPointerMove={(event) => drag(event, entry.id)}
                onPointerUp={(event) => endDrag(event, entry.id)}
                onPointerCancel={(event) => endDrag(event, entry.id)}
              >
                <span className="guestbook-note-pin" aria-hidden="true" />
                <p className="guestbook-note-head">
                  <strong>{entry.name}</strong>
                  <span>{formatDate(entry.createdAt)}</span>
                </p>
                <p
                  className="guestbook-note-message"
                  onPointerDown={stopNoteDrag}
                  onPointerMove={stopNoteDrag}
                  onPointerUp={stopNoteDrag}
                  onPointerCancel={stopNoteDrag}
                >
                  {entry.message}
                </p>
                {entry.sticker ? (
                  <img
                    src={entry.sticker}
                    alt={`${entry.name}'s sticker`}
                    className="guestbook-note-sticker"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
