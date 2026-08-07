import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  GitCompareArrows,
  Heart,
  Leaf,
  Menu,
  Search,
  Sparkles,
  Sprout,
  Users,
  X,
} from "lucide-react";
import useComparison from "../hooks/useComparison.js";
import FlowerBuckDisplay from "./FlowerBuckDisplay.jsx";
import PlantSearch from "./PlantSearch.jsx";

const mainNavLinks = [
  { to: "/", label: "Home", Icon: Leaf },
  { to: "/finder", label: "Plant Finder", Icon: Search },
  { to: "/find-my-plant", label: "Find My Plant", Icon: Sparkles },
  { to: "/compare", label: "Compare", Icon: GitCompareArrows, showCount: true },
  { to: "/saved-plants", label: "Saved Plants", Icon: Heart },
];

const mobileNavLinks = [
  ...mainNavLinks,
  { to: "/about", label: "About the Creator", Icon: Users },
];

export default function Layout() {
  const { comparisonCount, comparisonLimit } = useComparison();
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

  function renderNavLink({ to, label, Icon, showCount }) {
    return (
      <NavLink key={to} to={to} onClick={closeHeaderPanels}>
        <Icon size={17} aria-hidden="true" />
        <span>{label}</span>
        {showCount && (
          <span
            className="nav-count"
            aria-label={`${comparisonCount} of ${comparisonLimit} plants selected for comparison`}
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
            <span className="brand-mark" aria-hidden="true">
              <Sprout size={22} />
            </span>
            <span>
              <strong>Floraseek</strong>
              <small>Plant discovery guide</small>
            </span>
          </NavLink>

          <PlantSearch
            className="nav-search desktop-search"
            label="Search plants"
            placeholder="Search plants"
          />

          <nav className="nav-links desktop-nav" aria-label="Main navigation">
            {mainNavLinks.map(renderNavLink)}
          </nav>

          <FlowerBuckDisplay />

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
          <div>
            <div className="footer-brand">
              <Leaf size={18} />
              Floraseek
            </div>
            <p>
              An educational plant-discovery tool for browsing by climate, difficulty, and type.
            </p>
          </div>
          <div className="footer-links" aria-label="Footer navigation">
            <NavLink to="/finder">Plant Finder</NavLink>
            <NavLink to="/find-my-plant">Find My Plant</NavLink>
            <NavLink to="/compare">Compare</NavLink>
            <NavLink to="/saved-plants">Saved Plants</NavLink>
            <NavLink to="/flowers">Flowers</NavLink>
            <NavLink to="/plants">Plants</NavLink>
            <NavLink to="/about">About the Creator</NavLink>
            <NavLink to="/ai-policy">AI Policy</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
