import { useLanguage } from "../i18n/context.js";
import { Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <section className="not-found">
      <div className="container not-found-card">
        <p className="eyebrow">404</p>
        <h1>{t("This path has not sprouted yet.")}</h1>
        <p>
          {t("The page you opened is not part of the Floraseek catalogue. Try the finder or return home.")}
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/finder">
            <Search size={18} aria-hidden="true" />
            {t("Open Finder")}
          </Link>
          <Link className="button secondary" to="/">
            <Home size={18} aria-hidden="true" />
            {t("Home")}
          </Link>
        </div>
      </div>
    </section>
  );
}
