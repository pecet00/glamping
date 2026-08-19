import Link from "next/link";

export default function Footer() {
  return (
    <footer className="glamping-footer">
      <div className="glamping-footer__inner">

        {/* GÓRA */}

        <div className="glamping-footer__top">

          <div className="glamping-footer__brand">
            <Link
              href="/"
              className="glamping-footer__logo"
            >
              GRABYSÓWKA
            </Link>

            <p>
              Namioty glampingowe
              <br />
              tworzone z myślą o naturze.
            </p>
          </div>

          <nav className="glamping-footer__nav">
            <span>Nawigacja</span>

            <Link href="#modele">
              Modele
            </Link>

            <Link href="#konfigurator">
              Konfigurator
            </Link>

            <Link href="#galeria">
              Galeria
            </Link>

            <Link href="#kontakt">
              Kontakt
            </Link>
          </nav>

          <div className="glamping-footer__contact">
            <span>Kontakt</span>

            <a href="mailto:hello@grabysowka.pl">
              hello@grabysowka.pl
            </a>

            <a href="tel:+48123456789">
              +48 123 456 789
            </a>
          </div>

          <div className="glamping-footer__social">
            <span>Znajdź nas</span>

            <a
              href="#"
              aria-label="Instagram"
            >
              Instagram ↗
            </a>

            <a
              href="#"
              aria-label="Facebook"
            >
              Facebook ↗
            </a>
          </div>

        </div>


        {/* DÓŁ */}

        <div className="glamping-footer__bottom">

          <span>
            © {new Date().getFullYear()} Grabysówka
          </span>

          <div>
            <a href="#">
              Polityka prywatności
            </a>

            <a href="#">
              Cookies
            </a>
          </div>

          <span>
            Website made by FK
          </span>

        </div>

      </div>
    </footer>
  );
}