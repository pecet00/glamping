"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    image: "/img/_MG_0980-HDR.jpg",
    caption: "Namiot przy lesie",
    alt: "Namiot safari Grabysówka na drewnianym tarasie",
  },
  {
    image: "/img/_MG_0959-HDR.jpg",
    caption: "Rząd lodgy",
    alt: "Rząd namiotów safari przy żwirowej alei",
  },
  {
    image: "/img/_MG_0987-HDR.jpg",
    caption: "Taras i kwiaty",
    alt: "Taras namiotu z nawłocią i lasem w tle",
  },
  {
    image: "/img/_MG_0455-HDR.jpg",
    caption: "Stół z widokiem",
    alt: "Jadalnia w namiocie otwarta na łąkę",
  },
  {
    image: "/img/_MG_0938-HDR.jpg",
    caption: "Wejście do środka",
    alt: "Wnętrze namiotu safari od wejścia",
  },
  {
    image: "/img/_MG_0737-HDR.jpg",
    caption: "Sypialnia",
    alt: "Sypialnia z białą pościelą i nawłocią",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => {
        return (current + 1) % slides.length;
      });
    }, 6200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-media">
        <div className="hero-slides">
          {slides.map((slide, index) => (
            <figure
              key={slide.image}
              className={`hero-slide ${
                index === currentSlide ? "is-on" : ""
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
              />
            </figure>
          ))}
        </div>

        <div className="hero-veil" />
      </div>

      <div className="hero-copy">
        <p className="eyebrow reveal">
          Grabysówka · sprzedaż, nie wynajem
        </p>

        <h1 className="reveal">
          Konstrukcja na działkę.
          <br />
          <em>Albo cały biznes.</em>
        </h1>

        <p className="lead reveal">
          Budujemy namioty safari na Twoim gruncie. Możesz też kupić
          Grabysówkę pod klucz: działka, sześć lodgy, media i wyposażenie.
        </p>

        <div className="hero-split reveal">
          <button type="button" className="split-card">
            <span className="split-kicker">Oferta 01</span>
            <strong>Konstrukcje</strong>
            <span>
              Konfigurator · 1 do 6 sztuk · montaż na Twojej działce
            </span>
          </button>

          <button type="button" className="split-card">
            <span className="split-kicker">Oferta 02</span>
            <strong>Gotowy biznes</strong>
            <span>
              Działka + 6 namiotów + infrastruktura · start od przekazania
            </span>
          </button>
        </div>
      </div>

      <div className="hero-stats">
        <div>
          <b>6</b>
          <span>lodgy na terenie</span>
        </div>

        <div>
          <b>pod klucz</b>
          <span>działka i media</span>
        </div>

        <div>
          <b>8–12 tyg.</b>
          <span>montaż na Twoim gruncie</span>
        </div>
      </div>

      <div className="hero-pager">
        <p className="hero-caption">
          {slides[currentSlide].caption}
        </p>

        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={index === currentSlide ? "is-on" : ""}
              aria-label={`Przejdź do slajdu ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <a className="scroll-hint" href="#sprzedaz">
        zjedź
      </a>
    </section>
  );
}