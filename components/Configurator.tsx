"use client";

import { useEffect, useState } from "react";

import {
  models,
  sizes,
  woods,
  quantities,
  defaultConfig,
  type Config,
} from "@/data/configurator";

type Extra = {
  id: string;
  label: string;
  price: number;
  active: boolean;
};

const money = (value: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(value);

export default function Configurator() {
  const [config, setConfig] =
    useState<Config>(defaultConfig);

  const [cmsExtras, setCmsExtras] =
    useState<Extra[]>([]);

  // =========================
  // MODAL / FORMULARZ
  // =========================

  const [showModal, setShowModal] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [consent, setConsent] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [sent, setSent] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================
  // POBIERANIE DODATKÓW Z CMS
  // =========================

  useEffect(() => {
    fetch("/api/extras")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Nie udało się pobrać dodatków"
          );
        }

        return res.json();
      })
      .then((data) => {
        setCmsExtras(
          data.docs.filter(
            (item: Extra) => item.active
          )
        );
      })
      .catch((error) => {
        console.error(
          "Błąd pobierania dodatków:",
          error
        );
      });
  }, []);

  // =========================
  // AKTUALNA KONFIGURACJA
  // =========================

  const model = models.find(
    (item) => item.id === config.model
  )!;

  const size = sizes.find(
    (item) => item.id === config.size
  )!;

  const wood = woods.find(
    (item) => item.id === config.wood
  )!;

  const quantity = quantities.find(
    (item) => item.id === config.qty
  )!;

  const selectedExtras =
    cmsExtras.filter((item) =>
      config.extras.includes(item.id)
    );

  // =========================
  // CENA
  // =========================

  const extrasTotal =
    selectedExtras.reduce(
      (sum, item) => sum + item.price,
      0
    );

  const unitPrice =
    model.base +
    size.add +
    wood.add +
    extrasTotal;

  const subtotal =
    unitPrice * quantity.mul;

  const hasDiscount =
    quantity.mul >= 4;

  const total = Math.round(
    subtotal *
      (hasDiscount ? 0.95 : 1)
  );

  const pricePerUnit = Math.round(
    total / quantity.mul
  );

  const weeks =
    quantity.mul >= 4
      ? "10–14"
      : config.model === "safari"
        ? "8–10"
        : "10–12";

  // =========================
  // ZMIANA KONFIGURACJI
  // =========================

  const choose = (
    key: keyof Config,
    value: string
  ) => {
    setConfig((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleExtra = (id: string) => {
    setConfig((current) => {
      const selected =
        current.extras.includes(id);

      return {
        ...current,

        extras: selected
          ? current.extras.filter(
              (item) => item !== id
            )
          : [
              ...current.extras,
              id,
            ],
      };
    });
  };

  // =========================
  // OTWARCIE MODALA
  // =========================

  const openModal = () => {
    setError("");
    setSent(false);
    setShowModal(true);
  };

  // =========================
  // ZAMKNIĘCIE MODALA
  // =========================

  const closeModal = () => {
    if (sending) {
      return;
    }

    setShowModal(false);
    setError("");
  };

  // =========================
  // WYSŁANIE KONFIGURACJI
  // =========================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError(
        "Podaj adres e-mail."
      );
      return;
    }

    if (!consent) {
      setError(
        "Zaakceptuj zgodę na kontakt."
      );
      return;
    }

    setSending(true);

    try {
      const response = await fetch(
        "/api/configuration-requests",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),

            contactConsent:
              consent,

            configuration: {
              model: config.model,
              size: config.size,
              wood: config.wood,
              qty: config.qty,
              extras: config.extras,
            },

            total,
          }),
        }
      );

      const responseText =
      await response.text();

    let data: {
      error?: string;
    };

    try {
      data = JSON.parse(responseText);
    } catch {
      console.error(
        "Serwer zwrócił nie-JSON:",
        responseText
      );

      throw new Error(
        `Serwer zwrócił błąd HTTP ${response.status}`
      );
    }

    if (!response.ok) {
      console.error(
        "Błąd API:",
        response.status,
        data
      );

  throw new Error(
    data.error ||
      `Błąd API: ${response.status}`
  );
}

      setSent(true);
    } catch (error) {
      console.error(
        "Błąd wysyłania konfiguracji:",
        error
      );

      setError(
        "Nie udało się wysłać konfiguracji. Spróbuj ponownie."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      className="glamping-configurator"
      id="konfigurator"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="glamping-configurator__header">
        <div>
          <span className="glamping-configurator__label">
            KONFIGURATOR
          </span>

          <h2>
            Zbuduj swoją
            <br />
            <em>Grabysówkę.</em>
          </h2>
        </div>

        <p>
          Wybierz model, powierzchnię,
          konstrukcję oraz dodatki.
          Cena zostanie obliczona
          automatycznie.
        </p>
      </div>

      {/* =====================================================
          GŁÓWNA KARTA
      ===================================================== */}

      <div className="glamping-configurator__card">

        {/* ===================================================
            ZDJĘCIE
        =================================================== */}

        <div className="glamping-configurator__visual">
          <img
            src={model.img}
            alt={model.label}
          />

          <div className="glamping-configurator__visual-overlay" />

          <div className="glamping-configurator__visual-info">
            <span>TWÓJ WYBÓR</span>

            <strong>
              {model.label}
            </strong>

            <small>
              {size.label} ·{" "}
              {quantity.label}
            </small>
          </div>
        </div>

        {/* ===================================================
            OPCJE
        =================================================== */}

        <div className="glamping-configurator__options">

          {/* MODEL */}

          <ConfigGroup
            number="01"
            title="Model"
          >
            <div className="glamping-configurator__grid">
              {models.map((item) => (
                <Choice
                  key={item.id}
                  active={
                    config.model ===
                    item.id
                  }
                  title={item.label}
                  subtitle={money(
                    item.base
                  )}
                  onClick={() =>
                    choose(
                      "model",
                      item.id
                    )
                  }
                />
              ))}
            </div>
          </ConfigGroup>

          {/* POWIERZCHNIA */}

          <ConfigGroup
            number="02"
            title="Powierzchnia"
          >
            <div className="glamping-configurator__grid">
              {sizes.map((item) => (
                <Choice
                  key={item.id}
                  active={
                    config.size ===
                    item.id
                  }
                  title={item.label}
                  subtitle={
                    item.add === 0
                      ? "w cenie"
                      : `+${money(
                          item.add
                        )}`
                  }
                  onClick={() =>
                    choose(
                      "size",
                      item.id
                    )
                  }
                />
              ))}
            </div>
          </ConfigGroup>

          {/* KONSTRUKCJA */}

          <ConfigGroup
            number="03"
            title="Konstrukcja"
          >
            <div className="glamping-configurator__grid">
              {woods.map((item) => (
                <Choice
                  key={item.id}
                  active={
                    config.wood ===
                    item.id
                  }
                  title={item.label}
                  subtitle={
                    item.add === 0
                      ? "w cenie"
                      : `+${money(
                          item.add
                        )}`
                  }
                  onClick={() =>
                    choose(
                      "wood",
                      item.id
                    )
                  }
                />
              ))}
            </div>
          </ConfigGroup>

          {/* LICZBA SZTUK */}

          <ConfigGroup
            number="04"
            title="Liczba sztuk"
          >
            <div className="glamping-configurator__grid">
              {quantities.map(
                (item) => (
                  <Choice
                    key={item.id}
                    active={
                      config.qty ===
                      item.id
                    }
                    title={
                      item.label
                    }
                    subtitle={
                      item.mul >= 4
                        ? "rabat 5%"
                        : item.mul === 1
                          ? "pojedyncza"
                          : "zestaw"
                    }
                    onClick={() =>
                      choose(
                        "qty",
                        item.id
                      )
                    }
                  />
                )
              )}
            </div>
          </ConfigGroup>

          {/* DODATKI */}

          <ConfigGroup
            number="05"
            title="Dodatki"
            optional
          >
            <div className="glamping-configurator__extras">
              {cmsExtras.map(
                (item) => {
                  const active =
                    config.extras.includes(
                      item.id
                    );

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`glamping-configurator__extra ${
                        active
                          ? "is-active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleExtra(
                          item.id
                        )
                      }
                    >
                      <span className="glamping-configurator__check">
                        {active
                          ? "✓"
                          : ""}
                      </span>

                      <span>
                        <strong>
                          {
                            item.label
                          }
                        </strong>

                        <small>
                          {item.price ===
                          0
                            ? "W cenie"
                            : `+${money(
                                item.price
                              )}`}
                        </small>
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </ConfigGroup>
        </div>
      </div>

      {/* =====================================================
          PODSUMOWANIE
      ===================================================== */}

      <div className="glamping-configurator__summary">

        <div>
          <span className="glamping-configurator__summary-label">
            TWOJA KONFIGURACJA
          </span>

          <div className="glamping-configurator__tags">
            <span>
              {model.label}
            </span>

            <span>
              {size.label}
            </span>

            <span>
              {quantity.label}
            </span>

            {selectedExtras.length >
              0 && (
              <span>
                +{" "}
                {
                  selectedExtras.length
                }{" "}
                dodatki
              </span>
            )}
          </div>
        </div>

        <div className="glamping-configurator__prices">
          <div>
            <span>
              Łącznie
            </span>

            <strong>
              {money(total)}
            </strong>
          </div>

          <div>
            <span>
              Za sztukę
            </span>

            <strong>
              {money(
                pricePerUnit
              )}
            </strong>
          </div>
        </div>

        <div className="glamping-configurator__cta">
          <p>
            Realizacja:{" "}
            {weeks} tygodni

            {hasDiscount && (
              <>
                <br />
                <b>
                  Rabat 5% przy pakiecie
                </b>
              </>
            )}
          </p>

          <button
            type="button"
            onClick={openModal}
          >
            Wyślij specyfikację
            <span>→</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {showModal && (
        <div
          className="glamping-configurator__modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="glamping-configurator__modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* ZAMKNIĘCIE */}

            <button
              type="button"
              className="glamping-configurator__modal-close"
              onClick={closeModal}
              disabled={sending}
              aria-label="Zamknij"
            >
              ×
            </button>

            {/* =================================================
                FORMULARZ
            ================================================= */}

            {!sent ? (
              <>
                <span className="glamping-configurator__label">
                  SPECYFIKACJA
                </span>

                <h3>
                  Wyślij swoją
                  <br />
                  konfigurację
                </h3>

                <p>
                  Podaj adres e-mail.
                  Zapiszemy Twoją
                  konfigurację i
                  skontaktujemy się
                  z Tobą w jej sprawie.
                </p>

                <form
                  onSubmit={
                    handleSubmit
                  }
                >

                  {/* EMAIL */}

                  <label>
                    <span>
                      Adres e-mail
                    </span>

                    <input
                      type="email"
                      value={email}
                      onChange={(
                        event
                      ) =>
                        setEmail(
                          event.target
                            .value
                        )
                      }
                      placeholder="twoj@email.pl"
                      required
                      disabled={
                        sending
                      }
                    />
                  </label>

                  {/* ZGODA */}

                  <label className="glamping-configurator__consent">
                    <input
                      type="checkbox"
                      checked={
                        consent
                      }
                      onChange={(
                        event
                      ) =>
                        setConsent(
                          event.target
                            .checked
                        )
                      }
                      disabled={
                        sending
                      }
                    />

                    <span>
                      Wyrażam zgodę
                      na kontakt
                      w sprawie
                      przygotowanej
                      konfiguracji.
                    </span>
                  </label>

                  {/* BŁĄD */}

                  {error && (
                    <p className="glamping-configurator__error">
                      {error}
                    </p>
                  )}

                  {/* WYSŁANIE */}

                  <button
                    type="submit"
                    disabled={sending}
                  >
                    {sending
                      ? "Zapisywanie..."
                      : "Wyślij specyfikację"}
                  </button>
                </form>
              </>
            ) : (

              /* =================================================
                 SUKCES
              ================================================= */

              <div className="glamping-configurator__success">

                <span>
                  ✓
                </span>

                <h3>
                  Specyfikacja
                  została
                  zapisana
                </h3>

                <p>
                  Dziękujemy.
                  Skontaktujemy się
                  z Tobą w sprawie
                  Twojej konfiguracji.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  Zamknij
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   GROUP
========================================================= */

type ConfigGroupProps = {
  number: string;
  title: string;
  optional?: boolean;
  children: React.ReactNode;
};

function ConfigGroup({
  number,
  title,
  optional,
  children,
}: ConfigGroupProps) {
  return (
    <div className="glamping-configurator__group">
      <div className="glamping-configurator__group-title">
        <span>
          {number}
        </span>

        <h3>
          {title}
        </h3>

        {optional && (
          <small>
            opcjonalne
          </small>
        )}
      </div>

      {children}
    </div>
  );
}

/* =========================================================
   CHOICE
========================================================= */

type ChoiceProps = {
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
};

function Choice({
  active,
  title,
  subtitle,
  onClick,
}: ChoiceProps) {
  return (
    <button
      type="button"
      className={`glamping-configurator__choice ${
        active
          ? "is-active"
          : ""
      }`}
      onClick={onClick}
    >
      <span className="glamping-configurator__radio">
        {active && (
          <i />
        )}
      </span>

      <span>
        <strong>
          {title}
        </strong>

        <small>
          {subtitle}
        </small>
      </span>
    </button>
  );
}