import { useCallback, useMemo, useState } from "react";
import { educationItems, galleryItems, HobbyItem, hobbies, mediaItems } from "../models/content";

interface HomeController {
  activeEducationIndex: number;
  setActiveEducationIndex: (index: number) => void;
  activeGalleryIndex: number;
  setActiveGalleryIndex: (index: number) => void;
  nextGallery: () => void;
  prevGallery: () => void;
  activeHobby: HobbyItem["key"] | null;
  openHobby: (key: HobbyItem["key"]) => void;
  closeHobby: () => void;
  selectedHobbyItems: typeof mediaItems;
  activeHobbyMeta: HobbyItem | null;
}

export function useHomeController(): HomeController {
  const [activeEducationIndex, setActiveEducationIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeHobby, setActiveHobby] = useState<HobbyItem["key"] | null>(null);

  const nextGallery = useCallback(() => {
    setActiveGalleryIndex((index) => (index + 1) % galleryItems.length);
  }, []);

  const prevGallery = useCallback(() => {
    setActiveGalleryIndex((index) => (index - 1 + galleryItems.length) % galleryItems.length);
  }, []);

  const openHobby = useCallback((key: HobbyItem["key"]) => setActiveHobby(key), []);
  const closeHobby = useCallback(() => setActiveHobby(null), []);

  const selectedHobbyItems = useMemo(() => {
    if (activeHobby === "movies") {
      return mediaItems.filter((item) => item.type === "movie");
    }

    if (activeHobby === "books") {
      return mediaItems.filter((item) => item.type === "book");
    }

    return [];
  }, [activeHobby]);

  const activeHobbyMeta = useMemo(
    () => hobbies.find((hobby) => hobby.key === activeHobby) ?? null,
    [activeHobby]
  );

  return {
    activeEducationIndex,
    setActiveEducationIndex,
    activeGalleryIndex,
    setActiveGalleryIndex,
    nextGallery,
    prevGallery,
    activeHobby,
    openHobby,
    closeHobby,
    selectedHobbyItems,
    activeHobbyMeta
  };
}

export const homeCounts = {
  education: educationItems.length,
  hobbies: hobbies.length,
  gallery: galleryItems.length
};
