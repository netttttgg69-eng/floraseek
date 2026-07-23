import { Home, Search } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setPageMeta } from "../utils/meta.js";

export default function NotFoundPage() {
  useEffect(() => {
    setPageMeta("Page not found", "This Floraseek page could not be found.");
  }, []);

  return (
    <section className="not-found">
      <div className="container not-found-card">
        <p className="eyebrow">404</p>
        <h1>This path has not sprouted yet.</h1>
        <p>
          The page you opened is not part of the Floraseek catalogue. Try the finder or return home.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/finder">
            <Search size={18} aria-hidden="true" />
            Open Finder
          </Link>
          <Link className="button secondary" to="/">
            <Home size={18} aria-hidden="true" />
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
