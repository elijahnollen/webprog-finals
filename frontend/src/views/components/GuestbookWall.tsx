import { useEffect, useRef, useState } from "react";
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

const NOTE_ACCENTS = ["#ffe082", "#b9f6ca", "#ffccbc", "#b3e5fc", "#f8bbd0", "#d1c4e9"];

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

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Unknown date";
  }
  return parsed.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function buildPlacement(
  entry: GuestbookEntry,
  index: number,
  boardWidth: number,
  boardHeight: number,
  z: number
): NotePlacement {
  const noteSize = getNoteSize(boardWidth);
  const margin = 12;
  const maxX = Math.max(margin, boardWidth - noteSize.width - margin);
  const maxY = Math.max(margin, boardHeight - noteSize.height - margin);
  const seed = hashValue(`${entry.id}:${entry.name}:${index}`);
  const ratioX = ((seed % 997) + 1) / 998;
  const ratioY = (((seed >> 3) % 991) + 1) / 992;
  const left = margin + ratioX * Math.max(0, maxX - margin);
  const top = margin + ratioY * Math.max(0, maxY - margin);
  const angle = ((seed % 15) - 7) * 0.7;

  return {
    left,
    top,
    angle,
    z,
    accent: NOTE_ACCENTS[seed % NOTE_ACCENTS.length]
  };
}

export function GuestbookWall({ entries, loading }: GuestbookWallProps) {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const zRef = useRef(12);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, NotePlacement>>({});

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
    if (boardSize.width === 0 || boardSize.height === 0) {
      return;
    }

    setPlacements((previous) => {
      const noteSize = getNoteSize(boardSize.width);
      const margin = 12;
      const maxLeft = Math.max(margin, boardSize.width - noteSize.width - margin);
      const maxTop = Math.max(margin, boardSize.height - noteSize.height - margin);
      const next: Record<string, NotePlacement> = {};

      entries.forEach((entry, index) => {
        const existing = previous[entry.id];
        if (existing) {
          next[entry.id] = {
            ...existing,
            left: clamp(existing.left, margin, maxLeft),
            top: clamp(existing.top, margin, maxTop)
          };
          return;
        }

        zRef.current += 1;
        next[entry.id] = buildPlacement(entry, index, boardSize.width, boardSize.height, zRef.current);
      });

      return next;
    });
  }, [entries, boardSize.width, boardSize.height]);

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
      offsetX: event.clientX - boardRect.left - note.left,
      offsetY: event.clientY - boardRect.top - note.top
    };

    zRef.current += 1;
    setPlacements((previous) => ({
      ...previous,
      [id]: {
        ...previous[id],
        z: zRef.current
      }
    }));

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
    const noteSize = getNoteSize(boardRect.width);
    const margin = 12;
    const maxLeft = Math.max(margin, boardRect.width - noteSize.width - margin);
    const maxTop = Math.max(margin, boardRect.height - noteSize.height - margin);
    const left = clamp(event.clientX - boardRect.left - dragState.offsetX, margin, maxLeft);
    const top = clamp(event.clientY - boardRect.top - dragState.offsetY, margin, maxTop);

    setPlacements((previous) => ({
      ...previous,
      [id]: {
        ...previous[id],
        left,
        top
      }
    }));
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

  if (loading) {
    return <p>Loading entries...</p>;
  }

  if (entries.length === 0) {
    return <p>No entries yet. Be the first to sign.</p>;
  }

  return (
    <div className="guestbook-wall-shell">
      <p className="guestbook-wall-hint">Drag notes around the board.</p>
      <div className="guestbook-wall-board" ref={boardRef}>
        <ul className="guestbook-wall-notes">
          {entries.map((entry, index) => {
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
                <p className="guestbook-note-message">{entry.message}</p>
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
