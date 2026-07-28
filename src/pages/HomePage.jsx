import {
  ArrowRight,
  CircleDot,
  Filter,
  Flower2,
  House,
  Leaf,
  Scissors,
  Sparkles,
  Sprout,
  TreePine,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.jsx";
import ClimateFinder from "../components/ClimateFinder.jsx";
import PlantCard from "../components/PlantCard.jsx";
import PlantOfWeek from "../components/PlantOfWeek.jsx";
import RandomPlantButton from "../components/RandomPlantButton.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { plants } from "../data/plants.js";
import { setPageMeta } from "../utils/meta.js";

const featuredIds = ["monstera-deliciosa", "sunflower", "snake-plant"];
const homepageCategories = [
  { name: "Flowers", Icon: Flower2 },
  { name: "Succulents", Icon: Sprout },
  { name: "Trees", Icon: TreePine },
  { name: "Houseplants", Icon: House },
  { name: "Climbers", Icon: Leaf },
  { name: "Carnivorous Plants", Icon: CircleDot },
  { name: "Techniques", Icon: Scissors },
];

export default function HomePage() {
  const featuredPlants = plants.filter((plant) => featuredIds.includes(plant.id));
  const flowerCount = plants.filter((plant) => plant.type === "flower").length;
  const plantCount = plants.filter((plant) => plant.type === "plant").length;
  const climateCount = new Set(plants.flatMap((plant) => plant.climates)).size;
  const difficultyCount = new Set(plants.map((plant) => plant.difficulty)).size;

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
              FIND YOUR PERFECT PLANT
            </p>
            <h1>Find the right plant with a clearer, calmer Floraseek.</h1>
            <p className="hero-lede">
              Explore a collection of plants and flowers and discover the ones best suited to your
              climate, experience, and preferences.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/finder">
                Open Plant Finder
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button secondary" to="/plants">
                Browse plants
              </Link>
              <RandomPlantButton />
            </div>
          </div>

          <div className="hero-panel" aria-label="Floraseek overview">
            <div className="hero-card hero-card-large">
              <Sparkles size={24} aria-hidden="true" />
              <strong>{plants.length}</strong>
              <span>Plant profiles available</span>
            </div>
            <div className="hero-card">
              <Filter size={24} aria-hidden="true" />
              <strong>{climateCount}</strong>
              <span>Climate categories</span>
            </div>
            <div className="hero-card">
              <Leaf size={24} aria-hidden="true" />
              <strong>{difficultyCount}</strong>
              <span>Difficulty levels</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section quiz-home-section">
        <div className="container split-section">
          <div>
            <p className="eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              Guided pick
            </p>
            <h2>Not sure which plant to choose?</h2>
            <p>
              Answer a few quick questions about climate, category, type, and challenge level to
              get three recommendations from the Floraseek catalogue.
            </p>
          </div>
          <div className="quiz-home-panel">
            <strong>{plants.length}</strong>
            <span>plants and techniques can be scored for your preferences</span>
            <Link className="button primary" to="/find-my-plant">
              Take the plant quiz
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Weekly pick" title="Plant of the Week">
            A deterministic weekly feature chosen from the central Floraseek plant catalogue.
          </SectionHeader>
          <PlantOfWeek />
        </div>
      </section>

      <section className="section muted">
        <div className="container">
          <SectionHeader eyebrow="Categories" title="Browse by category">
            Choose a broad group and open the Plant Finder with that category already selected.
          </SectionHeader>
          <div className="broad-category-grid">
            {homepageCategories.map(({ name, Icon }) => {
              const count = plants.filter((plant) => plant.category === name).length;

              return (
                <Link
                  key={name}
                  className="broad-category-card"
                  to={`/finder?category=${encodeURIComponent(name)}`}
                >
                  <span className="category-icon" aria-hidden="true">
                    <Icon size={26} />
                  </span>
                  <span>
                    <strong>{name}</strong>
                    <small>{count} profiles</small>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Featured" title="Start with a few Floraseek highlights">
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
          <ClimateFinder />
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
