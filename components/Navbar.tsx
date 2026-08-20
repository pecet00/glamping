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
        <a href="#galeria">Galeria</a>
        <a href="#kontakt">Kontakt</a>
      </nav>



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