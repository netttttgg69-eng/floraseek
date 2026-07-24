import { NavLink, Outlet } from "react-router-dom";
import { Heart, Leaf, Search, Sprout, Users } from "lucide-react";
import PlantSearch from "./PlantSearch.jsx";

export default function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className="nav container" aria-label="Main navigation">
          <NavLink to="/" className="brand" aria-label="Floraseek homepage">
            <span className="brand-mark" aria-hidden="true">
              <Sprout size={22} />
            </span>
            <span>
              <strong>Floraseek</strong>
              <small>Plant discovery guide</small>
            </span>
          </NavLink>

          <PlantSearch className="nav-search" placeholder="Search Floraseek" />

          <div className="nav-links">
            <NavLink to="/">
              <Leaf size={17} />
              Home
            </NavLink>
            <NavLink to="/finder">
              <Search size={17} />
              Plant Finder
            </NavLink>
            <NavLink to="/saved-plants">
              <Heart size={17} />
              Saved Plants
            </NavLink>
            <NavLink to="/about">
              <Users size={17} />
              Who We Are
            </NavLink>
          </div>
        </nav>
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
            <NavLink to="/saved-plants">Saved Plants</NavLink>
            <NavLink to="/flowers">Flowers</NavLink>
            <NavLink to="/plants">Plants</NavLink>
            <NavLink to="/about">Who We Are</NavLink>
            <NavLink to="/ai-policy">AI Policy</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
