import { Leaf, Search, Sprout } from "lucide-react";
import { useEffect } from "react";
import { setPageMeta } from "../utils/meta.js";

export default function AboutPage() {
  useEffect(() => {
    setPageMeta(
      "Who We Are",
      "Learn what Floraseek is and how it helps people discover plants."
    );
  }, []);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <Sprout size={16} aria-hidden="true" />
            About Floraseek
          </p>
          <h1>Who We Are</h1>
          <p>
            Floraseek helps people discover plants suited to their preferences and environment
            through clear browsing, filtering, and plant profiles.
          </p>
        </div>

        <div className="info-grid">
          <article className="detail-card">
            <Leaf size={24} aria-hidden="true" />
            <h2>Plant discovery made clearer</h2>
            <p>
              Users can browse plants by climate, difficulty, and plant type, then open each profile
              to compare simple details before deciding what to explore next.
            </p>
          </article>
          <article className="detail-card">
            <Search size={24} aria-hidden="true" />
            <h2>An educational project</h2>
            <p>
              Floraseek began as a project focused on making plant selection simpler and clearer.
              The website is intended as an educational plant-discovery tool.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
