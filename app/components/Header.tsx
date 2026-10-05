import { useEffect, useState } from "react";

const links = [
  { href: "#projects", label: "Проекты", id: "projects" },
  { href: "#about", label: "Обо мне", id: "about" },
  { href: "#contact", label: "Контакты", id: "contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });

    const sections = links.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-25% 0px -60%", threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="header" data-scrolled={scrolled} data-menu-open={menuOpen}>
        <a className="logo" href="#top" aria-label="nk6357 — наверх" onClick={() => setMenuOpen(false)}>
          <span>nk</span>6357
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map((link) => (
            <a key={link.id} href={link.href} aria-current={active === link.id ? "location" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="availability" aria-label="Доступен для новых проектов">
          <span className="availability__dot" aria-hidden="true" />
          <span>Доступен к работе</span>
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span aria-hidden="true" /><span aria-hidden="true" />
        </button>
      </header>

      <nav className="mobile-nav" id="mobile-menu" data-open={menuOpen} aria-label="Мобильная навигация" aria-hidden={!menuOpen}>
        <span className="mobile-nav__index">NAV / 03</span>
        {links.map((link, index) => (
          <a key={link.id} href={link.href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
            <span>0{index + 1}</span>{link.label}
          </a>
        ))}
        <div className="mobile-nav__footer">Full-stack · AI · Product · Design</div>
      </nav>
    </>
  );
}
