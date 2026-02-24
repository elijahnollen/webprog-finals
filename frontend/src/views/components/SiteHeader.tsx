import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Hobbies", href: "#hobbies" },
  { label: "Goals", href: "#goals" },
  { label: "Projects", href: "#projects" },
  { label: "Guestbook", href: "#guestbook" },
  { label: "Picture Gallery", href: "#gallery" }
];

export function SiteHeader() {
  const [activeHref, setActiveHref] = useState(navItems[0].href);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const syncActiveFromScroll = () => {
      const marker = window.innerHeight * 0.4;
      const sectionAtMarker = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= marker && rect.bottom > marker;
      });

      if (sectionAtMarker) {
        const nextActive = `#${sectionAtMarker.id}`;
        setActiveHref((previous) => (previous === nextActive ? previous : nextActive));
        return;
      }

      let nearestSection = sections[0];
      let nearestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - marker);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestSection = section;
        }
      });

      const nextActive = `#${nearestSection.id}`;
      setActiveHref((previous) => (previous === nextActive ? previous : nextActive));
    };

    syncActiveFromScroll();
    window.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    window.addEventListener("resize", syncActiveFromScroll);

    return () => {
      window.removeEventListener("scroll", syncActiveFromScroll);
      window.removeEventListener("resize", syncActiveFromScroll);
    };
  }, []);

  return (
    <div className="header-wrapper">
      <header className="header-section" />

      <nav className="menu-space" id="navbar">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={item.href === activeHref ? "is-active" : undefined}
            onClick={() => setActiveHref(item.href)}
          >
            {item.label}
          </a>
        ))}
        <Link to="/resources">Resources</Link>
      </nav>
    </div>
  );
}
