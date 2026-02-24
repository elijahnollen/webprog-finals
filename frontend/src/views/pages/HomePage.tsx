import { useEffect } from "react";
import type { CSSProperties } from "react";
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
import { ProjectsSection } from "../components/ProjectsSection";
import { SiteHeader } from "../components/SiteHeader";
import { SkillsSection } from "../components/SkillsSection";

function revealStyle(delayMs: number): CSSProperties {
  return { ["--reveal-delay" as "--reveal-delay"]: `${delayMs}ms` } as CSSProperties;
}

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

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (revealTargets.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          target.classList.add("is-visible");
          currentObserver.unobserve(target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <SiteHeader />

      <main className="home-main">
        <div className="scroll-reveal" style={revealStyle(0)}>
          <AboutSection />
        </div>

        <div className="scroll-reveal" style={revealStyle(60)}>
          <EducationSection
            items={educationItems}
            activeIndex={activeEducationIndex}
            onSelect={setActiveEducationIndex}
          />
        </div>

        <div className="scroll-reveal" style={revealStyle(90)}>
          <SkillsSection items={skillItems} />
        </div>

        <div className="scroll-reveal" style={revealStyle(120)}>
          <HobbiesSection items={hobbies} onOpen={openHobby} />
        </div>

        <div className="scroll-reveal" style={revealStyle(150)}>
          <GoalsSection items={goals} />
        </div>

        <div className="scroll-reveal" style={revealStyle(180)}>
          <ProjectsSection />
        </div>

        <div className="scroll-reveal" style={revealStyle(210)}>
          <GuestbookSection />
        </div>

        <div className="scroll-reveal" style={revealStyle(240)}>
          <GallerySection
            items={galleryItems}
            activeIndex={activeGalleryIndex}
            onNext={nextGallery}
            onPrev={prevGallery}
            onSelect={setActiveGalleryIndex}
          />
        </div>
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
