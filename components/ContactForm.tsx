"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Na razie tylko UI.
    // Później podepniemy wysyłkę formularza.
    setSent(true);
  };

  return (
    <section
      className="glamping-contact"
      id="kontakt"
    >
      <div className="glamping-contact__inner">

        {/* LEWA STRONA */}

        <div className="glamping-contact__intro">
          <span>NAPISZMY</span>

          <h2>
            Opowiedz nam
            <br />
            o swoim
            <br />
            <em>projekcie.</em>
          </h2>

          <p>
            Planujesz własną przestrzeń
            glampingową, kilka namiotów
            albo cały kompleks?
            Napisz kilka słów.
          </p>

          <div className="glamping-contact__details">
            <div>
              <span>E-MAIL</span>
              <a href="mailto:hello@grabysowka.pl">
                hello@grabysowka.pl
              </a>
            </div>

            <div>
              <span>TELEFON</span>
              <a href="tel:+48123456789">
                +48 123 456 789
              </a>
            </div>
          </div>
        </div>

        {/* PRAWA STRONA */}

        <div className="glamping-contact__form-wrap">

          {sent ? (
            <div className="glamping-contact__success">
              <span>✓</span>

              <h3>
                Dziękujemy.
              </h3>

              <p>
                Twoja wiadomość została
                przygotowana do wysłania.
                Skontaktujemy się z Tobą
                tak szybko, jak to możliwe.
              </p>

              <button
                type="button"
                onClick={() =>
                  setSent(false)
                }
              >
                Wyślij kolejną wiadomość
              </button>
            </div>
          ) : (
            <form
              className="glamping-contact__form"
              onSubmit={handleSubmit}
            >

              {/* IMIĘ */}

              <label>
                <span>Imię i nazwisko</span>

                <input
                  type="text"
                  name="name"
                  placeholder="Jan Kowalski"
                  required
                />
              </label>

              {/* EMAIL + TELEFON */}

              <div className="glamping-contact__row">

                <label>
                  <span>E-mail</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="jan@example.com"
                    required
                  />
                </label>

                <label>
                  <span>Telefon</span>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+48"
                  />
                </label>

              </div>

              {/* TYP PROJEKTU */}

              <label>
                <span>Typ projektu</span>

                <select
                  name="project"
                  defaultValue=""
                >
                  <option
                    value=""
                    disabled
                  >
                    Wybierz opcję
                  </option>

                  <option value="single">
                    Jeden namiot
                  </option>

                  <option value="park">
                    Park glampingowy
                  </option>

                  <option value="hotel">
                    Resort / hotel
                  </option>

                  <option value="other">
                    Inny projekt
                  </option>
                </select>
              </label>

              {/* WIADOMOŚĆ */}

              <label>
                <span>Opowiedz o projekcie</span>

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Opowiedz nam o swojej działce, liczbie namiotów i planowanym terminie..."
                />
              </label>

              {/* ZGODA */}

              <label className="glamping-contact__consent">
                <input
                  type="checkbox"
                  required
                />

                <span>
                  Zgadzam się na kontakt
                  w sprawie mojego zapytania.
                </span>
              </label>

              {/* BUTTON */}

              <button
                type="submit"
                className="glamping-contact__submit"
              >
                <span>
                  Wyślij zapytanie
                </span>

                <span>→</span>
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}