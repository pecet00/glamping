"use client";

import { useState } from "react";

const images = [
  {
    src: "/img/_MG_0980-HDR.jpg",
    alt: "Namiot safari Grabysówka na drewnianym tarasie",
  },
  {
    src: "/img/_MG_0987-HDR.jpg",
    alt: "Taras namiotu z nawłocią i lasem w tle",
  },
  {
    src: "/img/_MG_0455-HDR.jpg",
    alt: "Jadalnia w namiocie otwarta na łąkę",
  },
  {
    src: "/img/_MG_0938-HDR.jpg",
    alt: "Wnętrze namiotu safari od wejścia",
  },
  {
    src: "/img/_MG_0737-HDR.jpg",
    alt: "Sypialnia z białą pościelą i nawłocią",
  },
];

export default function Gallery() {
  const [activeImage, setActiveImage] =
    useState<number | null>(null);

  return (
    <section
      className="glamping-gallery"
      id="galeria"
    >
      <div className="glamping-gallery__header">
        <div>
          <span>GALERIA</span>

          <h2>
            Zobacz ją
            <br />
            <em>z bliska.</em>
          </h2>
        </div>

        <p>
          Zajrzyj do środka, zobacz detale
          konstrukcji i sprawdź, jak
          Grabysówka wygląda w otoczeniu
          natury.
        </p>
      </div>

      <div className="glamping-gallery__grid">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`glamping-gallery__item glamping-gallery__item--${index + 1}`}
            onClick={() =>
              setActiveImage(index)
            }
          >
            <img
              src={image.src}
              alt={image.alt}
            />

            <span>+</span>
          </button>
        ))}
      </div>

      {activeImage !== null && (
        <div
          className="glamping-gallery__lightbox"
          onClick={() =>
            setActiveImage(null)
          }
        >
          <button
            type="button"
            className="glamping-gallery__close"
            onClick={() =>
              setActiveImage(null)
            }
          >
            ×
          </button>

          <img
            src={images[activeImage].src}
            alt={images[activeImage].alt}
            onClick={(event) =>
              event.stopPropagation()
            }
          />
        </div>
      )}
    </section>
  );
}