"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`nav ${isSolid ? "is-solid" : ""}`}
      id="nav"
    >
      {/* Logo */}
      <a className="nav-logo" href="#top">
        <span className="nav-mark">G</span>
        <span className="nav-word">Grabysówka</span>
      </a>

      {/* Navigation */}
      <nav className="nav-links" id="navLinks">
        <a href="#sprzedaz">Konstrukcje</a>
        <a href="#konfigurator">Konfigurator</a>
        <a href="#biznes">Gotowy biznes</a>
        <a href="#teren">Teren</a>
        <a href="#galeria">Galeria</a>
        <a href="#kontakt">Kontakt</a>
      </nav>

      {/* Mode switch */}
      <div
        className="mode-switch"
        role="tablist"
        aria-label="Wybierz ofertę"
      >
        <button
          type="button"
          className="mode-btn is-active"
          role="tab"
          aria-selected="true"
        >
          Konstrukcje
        </button>

        <button
          type="button"
          className="mode-btn"
          role="tab"
          aria-selected="false"
        >
          Biznes
        </button>
      </div>

      {/* CTA */}
      <a className="nav-cta" href="#kontakt">
        Zapytaj
      </a>

      {/* Mobile menu */}
      <button
        className="nav-burger"
        type="button"
        aria-label="Menu"
      >
        <span></span>
        <span></span>
      </button>
    </header>
  );
}