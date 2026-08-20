"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name =
      String(formData.get("name") || "").trim();

    const email =
      String(formData.get("email") || "").trim();

    const phone =
      String(formData.get("phone") || "").trim();

    const project =
      String(formData.get("project") || "");

    const message =
      String(formData.get("message") || "").trim();

    const contactConsent =
      formData.get("contactConsent") === "on";

    try {
      const response = await fetch(
        "/api/contact-requests",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            phone,
            project,
            message,
            contactConsent,
          }),
        }
      );

      const responseText =
        await response.text();

      let data: {
        error?: string;
        success?: boolean;
        id?: string;
      } = {};

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error(
          "Serwer zwrócił nie-JSON:",
          responseText
        );

        throw new Error(
          `Błąd serwera HTTP ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Błąd API: ${response.status}`
        );
      }

      console.log(
        "Zgłoszenie zapisane:",
        data.id
      );

      form.reset();

      setSent(true);
    } catch (error) {
      console.error(
        "Błąd wysyłania formularza:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Nie udało się wysłać formularza."
      );
    } finally {
      setSending(false);
    }
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
                Twoje zapytanie zostało
                zapisane. Skontaktujemy się
                z Tobą tak szybko, jak to
                możliwe.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setError("");
                }}
              >
                Wyślij kolejne zapytanie
              </button>
            </div>
          ) : (
            <form
              className="glamping-contact__form"
              onSubmit={handleSubmit}
            >

              {/* IMIĘ */}

              <label>
                <span>
                  Imię i nazwisko
                </span>

                <input
                  type="text"
                  name="name"
                  placeholder="Jan Kowalski"
                  required
                  disabled={sending}
                />
              </label>

              {/* EMAIL + TELEFON */}

              <div className="glamping-contact__row">

                <label>
                  <span>
                    E-mail
                  </span>

                  <input
                    type="email"
                    name="email"
                    placeholder="jan@example.com"
                    required
                    disabled={sending}
                  />
                </label>

                <label>
                  <span>
                    Telefon
                  </span>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+48"
                    disabled={sending}
                  />
                </label>

              </div>

              {/* TYP PROJEKTU */}

              <label>
                <span>
                  Typ projektu
                </span>

                <select
                  name="project"
                  defaultValue=""
                  disabled={sending}
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
                <span>
                  Opowiedz o projekcie
                </span>

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Opowiedz nam o swojej działce, liczbie namiotów i planowanym terminie..."
                  disabled={sending}
                />
              </label>

              {/* ZGODA */}

              <label className="glamping-contact__consent">
                <input
                  type="checkbox"
                  name="contactConsent"
                  required
                  disabled={sending}
                />

                <span>
                  Zgadzam się na kontakt
                  w sprawie mojego zapytania.
                </span>
              </label>

              {/* BŁĄD */}

              {error && (
                <p className="glamping-contact__error">
                  {error}
                </p>
              )}

              {/* BUTTON */}

              <button
                type="submit"
                className="glamping-contact__submit"
                disabled={sending}
              >
                <span>
                  {sending
                    ? "Wysyłanie..."
                    : "Wyślij zapytanie"}
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