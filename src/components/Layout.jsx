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
        <span>{label}</span>
        {showCount && comparisonCount > 0 && (
          <span
            className="nav-count"
            aria-label={`${comparisonCount} plants selected for comparison`}
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
          <NavLink to="/" className="brand" aria-label="Floraseek homepage">
            <img
              className="brand-logo"
              src="/images/floraseek-logo.svg"
              alt="Floraseek"
              width="224"
              height="48"
            />
          </NavLink>

          <nav className="nav-links desktop-nav" aria-label="Main navigation">
            {mainNavLinks.map(renderNavLink)}
          </nav>

          <PlantSearch
            className="nav-search desktop-search"
            label="Search plants"
            placeholder="Search plants"
          />

          <FlowerBuckDisplay />
          <NavLink className="nav-contact" to="/contact">Contact</NavLink>

          <div className="mobile-header-actions">
            <button
              className="header-icon-button"
              type="button"
              aria-label="Open plant search"
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
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
              label="Search plants"
              placeholder="Search plants"
              onEscape={closeHeaderPanels}
              onSelect={closeHeaderPanels}
            />
          </div>
        )}

        {isMobileMenuOpen && (
          <nav className="mobile-menu-panel container" id="mobile-navigation" aria-label="Mobile navigation">
            {mobileNavLinks.map(renderNavLink)}
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <NavLink to="/" className="brand" aria-label="Floraseek homepage">
            <img className="brand-logo" src="/images/floraseek-logo.svg" alt="Floraseek" width="224" height="48" />
          </NavLink>
          <nav className="footer-links" aria-label="Footer navigation">
            <NavLink to="/flowers">Flowers</NavLink>
            <NavLink to="/plants">Plants</NavLink>
            <NavLink to="/about">About the Creator</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/ai-policy">AI Policy</NavLink>
          </nav>
        </div>
      </footer>
    </div>
  );
}
