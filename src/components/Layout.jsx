import { useLanguage } from "../i18n/context.js";
import LanguageSelector from "./LanguageSelector.jsx";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import useComparison from "../hooks/useComparison.js";
import FlowerBuckDisplay from "./FlowerBuckDisplay.jsx";
import PlantSearch from "./PlantSearch.jsx";

const mainNavLinks = [
  { to: "/", label: "Home" },
  { to: "/finder", label: "Plant Finder" },
  { to: "/blog", label: "Blog" },
  { to: "/compare", label: "Compare", showCount: true },
  { to: "/saved-plants", label: "Saved Plants" },
];

const mobileNavLinks = [
  ...mainNavLinks,
  { to: "/about", label: "About the Creator" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const { t } = useLanguage();
  const { comparisonCount } = useComparison();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  function closeHeaderPanels() {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }

  useEffect(() => {
    closeHeaderPanels();
  }, [pathname]);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        closeHeaderPanels();
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function renderNavLink({ to, label, showCount }) {
    return (
      <NavLink key={to} to={to} onClick={closeHeaderPanels}>
        <span>{t(label)}</span>
        {showCount && comparisonCount > 0 && (
          <span
            className="nav-count"
            aria-label={t("{comparisonCount} plants selected for comparison", { comparisonCount })}
          >
            {comparisonCount}
          </span>
        )}
      </NavLink>
    );
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav container">
          <NavLink to="/" className="brand" aria-label={t("Floraseek homepage")}>
            <img
              className="brand-logo"
              src="/images/floraseek-logo.svg"
              alt="Floraseek"
              width="224"
              height="48"
            />
          </NavLink>

          <nav className="nav-links desktop-nav" aria-label={t("Main navigation")}>
            {t(mainNavLinks.map(renderNavLink))}
          </nav>

          <PlantSearch
            className="nav-search desktop-search"
            label={t("Search plants")}
            placeholder={t("Search plants")}
          />

          <LanguageSelector />
          <FlowerBuckDisplay />
          <NavLink className="nav-contact" to="/contact">{t("Contact")}</NavLink>

          <div className="mobile-header-actions">
            <button
              className="header-icon-button"
              type="button"
              aria-label={t("Open plant search")}
              aria-controls="mobile-search-panel"
              aria-expanded={isMobileSearchOpen}
              onClick={() => {
                setIsMobileSearchOpen((isOpen) => !isOpen);
                setIsMobileMenuOpen(false);
              }}
            >
              {isMobileSearchOpen ? <X size={21} aria-hidden="true" /> : <Search size={21} aria-hidden="true" />}
            </button>
            <button
              className="header-icon-button"
              type="button"
              aria-label={isMobileMenuOpen ? t("Close navigation menu") : t("Open navigation menu")}
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen((isOpen) => !isOpen);
                setIsMobileSearchOpen(false);
              }}
            >
              {isMobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {isMobileSearchOpen && (
          <div className="mobile-search-panel container" id="mobile-search-panel">
            <PlantSearch
              className="mobile-search"
              label={t("Search plants")}
              placeholder={t("Search plants")}
              onEscape={closeHeaderPanels}
              onSelect={closeHeaderPanels}
            />
          </div>
        )}

        {isMobileMenuOpen && (
          <nav className="mobile-menu-panel container" id="mobile-navigation" aria-label={t("Mobile navigation")}>
            {t(mobileNavLinks.map(renderNavLink))}
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <NavLink to="/" className="brand" aria-label={t("Floraseek homepage")}>
            <img className="brand-logo" src="/images/floraseek-logo.svg" alt="Floraseek" width="224" height="48" />
          </NavLink>
          <nav className="footer-links" aria-label={t("Footer navigation")}>
            <NavLink to="/flowers">{t("Flowers")}</NavLink>
            <NavLink to="/plants">{t("Plants")}</NavLink>
            <NavLink to="/about">{t("About the Creator")}</NavLink>
            <NavLink to="/contact">{t("Contact")}</NavLink>
            <NavLink to="/ai-policy">{t("AI Policy")}</NavLink>
          </nav>
        </div>
      </footer>
    </div>
  );
}
