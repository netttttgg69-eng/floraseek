import { NavLink, Outlet } from "react-router-dom";
import { Leaf, Search, Sprout } from "lucide-react";

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

          <div className="nav-links">
            <NavLink to="/finder">
              <Search size={17} />
              Finder
            </NavLink>
            <NavLink to="/flowers">Flowers</NavLink>
            <NavLink to="/plants">Plants</NavLink>
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
              A standalone React version of the Floraseek school project, built for Vercel.
            </p>
          </div>
          <div className="footer-links" aria-label="Footer navigation">
            <NavLink to="/finder">Plant Finder</NavLink>
            <NavLink to="/flowers">Flowers</NavLink>
            <NavLink to="/plants">Plants</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
