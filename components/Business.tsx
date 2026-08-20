"use client";

export default function Business() {
  return (
    <section
      className="glamping-business"
      id="biznes"
    >
      <div className="glamping-business__inner">

        {/* LEWA STRONA */}

        <div className="glamping-business__content">

          <span className="glamping-business__eyebrow">
            GOTOWY BIZNES GLAMPINGOWY
          </span>

          <h2>
            Kup gotowe miejsce
            <br />
            <em>i zacznij działać.</em>
          </h2>

          <p className="glamping-business__lead">
            Nie musisz budować biznesu glampingowego
            od podstaw. Oferujemy gotowe miejsca
            przygotowane do rozpoczęcia działalności.
          </p>

          <p>
            Kupujesz działkę wraz z kompleksem
            wyposażonych apartamentów glampingowych,
            przygotowanych do przyjmowania gości.
            Otrzymujesz gotowe miejsce, infrastrukturę
            i wyposażenie potrzebne do prowadzenia
            działalności.
          </p>

          <a
            href="#kontakt"
            className="glamping-business__button"
          >
            <span>
              Zapytaj o gotową inwestycję
            </span>

            <span>→</span>
          </a>

        </div>

        {/* PRAWA STRONA */}

        <div className="glamping-business__visual">

          <div className="glamping-business__image">
            <div className="glamping-business__image-placeholder">
              <span>
                GOTOWA INWESTYCJA
              </span>

              <strong>
                DZIAŁKA + APARTAMENTY
              </strong>
            </div>
          </div>

          <div className="glamping-business__card">

            <span>
              W PAKIECIE
            </span>

            <ul>
              <li>
                <span>01</span>
                Gotowa działka
              </li>

              <li>
                <span>02</span>
                Apartamenty glampingowe
              </li>

              <li>
                <span>03</span>
                Pełne wyposażenie
              </li>

              <li>
                <span>04</span>
                Zagospodarowanie terenu
              </li>

              <li>
                <span>05</span>
                Obiekt przygotowany
                do działalności
              </li>
            </ul>

          </div>

        </div>

      </div>

      {/* DOLNY PAS */}

      <div className="glamping-business__bottom">

        <div>
          <strong>
            DZIAŁKA
          </strong>

          <span>
            Gotowe miejsce
          </span>
        </div>

        <div>
          <strong>
            APARTAMENTY
          </strong>

          <span>
            Wyposażone i gotowe
          </span>
        </div>

        <div>
          <strong>
            INFRASTRUKTURA
          </strong>

          <span>
            Przygotowana do działania
          </span>
        </div>

        <div>
          <strong>
            INWESTYCJA
          </strong>

          <span>
            Jeden kompletny zakup
          </span>
        </div>

      </div>
    </section>
  );
}