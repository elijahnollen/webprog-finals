import { useHomeController } from "../../controllers/useHomeController";
import {
  educationItems,
  galleryItems,
  goals,
  hobbies,
  skillItems
} from "../../models/content";
import { AboutSection } from "../components/AboutSection";
import { EducationSection } from "../components/EducationSection";
import { GallerySection } from "../components/GallerySection";
import { GoalsSection } from "../components/GoalsSection";
import { GuestbookSection } from "../components/GuestbookSection";
import { HobbiesSection } from "../components/HobbiesSection";
import { HobbyModal } from "../components/HobbyModal";
import { SiteHeader } from "../components/SiteHeader";
import { SkillsSection } from "../components/SkillsSection";

export function HomePage() {
  const {
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
  } = useHomeController();

  return (
    <div className="home-page">
      <SiteHeader />

      <main className="home-main">
        <AboutSection />

        <EducationSection
          items={educationItems}
          activeIndex={activeEducationIndex}
          onSelect={setActiveEducationIndex}
        />

        <SkillsSection items={skillItems} />

        <HobbiesSection items={hobbies} onOpen={openHobby} />

        <GoalsSection items={goals} />

        <GuestbookSection />

        <GallerySection
          items={galleryItems}
          activeIndex={activeGalleryIndex}
          onNext={nextGallery}
          onPrev={prevGallery}
          onSelect={setActiveGalleryIndex}
        />
      </main>

      <HobbyModal
        title={activeHobbyMeta?.title ?? "Hobby"}
        open={activeHobby !== null}
        items={selectedHobbyItems}
        onClose={closeHobby}
      />
    </div>
  );
}
