import { Link } from "react-router-dom";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Hobbies", href: "#hobbies" },
  { label: "Goals", href: "#goals" },
  { label: "Guestbook", href: "#guestbook" },
  { label: "Picture Gallery", href: "#gallery" }
];

export function SiteHeader() {
  return (
    <div className="header-wrapper">
      <header className="header-section">
        <h1>Hi, I&apos;m Eli!</h1>
      </header>

      <nav className="menu-space" id="navbar">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <Link to="/resources">Resources</Link>
      </nav>
    </div>
  );
}
