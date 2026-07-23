import { ArrowRight, Filter, Leaf, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.jsx";
import PlantCard from "../components/PlantCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { plants } from "../data/plants.js";
import { setPageMeta } from "../utils/meta.js";

const featuredIds = ["monstera-deliciosa", "sunflower", "snake-plant"];

export default function HomePage() {
  const featuredPlants = plants.filter((plant) => featuredIds.includes(plant.id));
  const flowerCount = plants.filter((plant) => plant.type === "flower").length;
  const plantCount = plants.filter((plant) => plant.type === "plant").length;

  useEffect(() => {
    setPageMeta(
      "Plant Finder",
      "Explore Floraseek, a polished plant and flower finder for difficulty, climate, and plant type."
    );
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <Leaf size={16} aria-hidden="true" />
              School project showcase
            </p>
            <h1>Find the right plant with a clearer, calmer Floraseek.</h1>
            <p className="hero-lede">
              Browse plant and flower profiles by difficulty, climate, and type in a refined,
              presentation-ready site built for Vercel.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/finder">
                Open Plant Finder
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button secondary" to="/plants">
                Browse plants
              </Link>
            </div>
          </div>

          <div className="hero-panel" aria-label="Floraseek project overview">
            <div className="hero-card hero-card-large">
              <Sparkles size={24} aria-hidden="true" />
              <strong>{plants.length}</strong>
              <span>Plant profiles preserved from the original project</span>
            </div>
            <div className="hero-card">
              <Filter size={24} aria-hidden="true" />
              <strong>3</strong>
              <span>Filters working together</span>
            </div>
            <div className="hero-card">
              <Leaf size={24} aria-hidden="true" />
              <strong>0</strong>
              <span>Wix runtime dependencies</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Featured" title="Start with a few project highlights">
            These cards use the same plant catalogue as the finder, so the whole site stays consistent.
          </SectionHeader>
          <div className="card-grid three">
            {featuredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container split-section">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>Filter by the details that matter.</h2>
            <p>
              Choose a difficulty, climate, and plant type. Floraseek updates the results instantly
              and keeps the matching plant count visible, so the finder feels clear and responsive.
            </p>
            <Link className="text-link" to="/finder">
              Try the finder
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="steps">
            <div>
              <span>01</span>
              <strong>Pick a difficulty</strong>
              <p>Easy, Moderate, Hard, Extreme, or All.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Choose a climate</strong>
              <p>Temperate, Tropical, Subtropical, Desert, Continental, or All.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Explore matching cards</strong>
              <p>Open each plant page for a clean summary and related profiles.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Categories" title="Browse by plant type">
            Jump straight to flowers or general plant profiles.
          </SectionHeader>
          <div className="category-grid">
            <CategoryCard type="flower" count={flowerCount} />
            <CategoryCard type="plant" count={plantCount} />
          </div>
        </div>
      </section>
    </>
  );
}
