import {
  ArrowRight,
  Apple,
  Flower2,
  House,
  Leaf,
  Scissors,
  Sprout,
  TreePine,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.jsx";
import ClimateFinder from "../components/ClimateFinder.jsx";
import PlantCard from "../components/PlantCard.jsx";
import PlantOfWeek from "../components/PlantOfWeek.jsx";
import RandomPlantButton from "../components/RandomPlantButton.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import SiteIntro from "../components/SiteIntro.jsx";
import { ALL_VALUE, filterOptions, labels, plants } from "../data/plants.js";
import { setPageMeta } from "../utils/meta.js";

const featuredIds = ["monstera-deliciosa", "sunflower", "snake-plant"];
const heroPlantIds = ["monstera-deliciosa", "snake-plant", "venus-flytrap"];
const heroStripIds = [
  "sunflower",
  "rubber-plant",
  "cactus",
  "orchid",
  "strawberry-plant",
  "butterwort",
  "bonsai",
  "fiddle-leaf-fig",
];
const experienceOptions = [
  { label: "Any experience", value: ALL_VALUE },
  { label: "Beginner", value: "easy" },
  { label: "Some experience", value: "moderate" },
  { label: "Experienced", value: "hard" },
  { label: "Expert", value: "extreme" },
];
const homepageCategories = [
  { name: "Flowers", Icon: Flower2 },
  { name: "Houseplants", Icon: House },
  { name: "Succulents", Icon: Sprout },
  { name: "Trees & Shrubs", Icon: TreePine },
  { name: "Edible Plants", Icon: Apple },
  { name: "Special Plants", Icon: Leaf },
  { name: "Techniques", Icon: Scissors },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [heroFilters, setHeroFilters] = useState({
    climate: ALL_VALUE,
    difficulty: ALL_VALUE,
    type: ALL_VALUE,
  });
  const featuredPlants = plants.filter((plant) => featuredIds.includes(plant.id));
  const flowerCount = plants.filter((plant) => plant.type === "flower").length;
  const plantCount = plants.filter((plant) => plant.type === "plant").length;
  const climateCount = new Set(plants.flatMap((plant) => plant.climates)).size;
  const difficultyCount = new Set(plants.map((plant) => plant.difficulty)).size;
  const heroPlants = useMemo(
    () => heroPlantIds.map((plantId) => plants.find((plant) => plant.id === plantId)).filter(Boolean),
    []
  );
  const heroStripPlants = useMemo(
    () => heroStripIds.map((plantId) => plants.find((plant) => plant.id === plantId)).filter(Boolean),
    []
  );
  const [primaryHeroPlant, lowLightPlant, tropicalPlant] = heroPlants;

  useEffect(() => {
    setPageMeta(
      "Plant Finder",
      "Explore Floraseek, a polished plant and flower finder for difficulty, climate, and plant type."
    );
  }, []);

  function updateHeroFilter(key, value) {
    setHeroFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  function openFilteredFinder(event) {
    event.preventDefault();

    const searchParams = new URLSearchParams();
    Object.entries(heroFilters).forEach(([key, value]) => {
      if (value !== ALL_VALUE) {
        searchParams.set(key, value);
      }
    });

    const queryString = searchParams.toString();
    navigate(queryString ? `/finder?${queryString}` : "/finder");
  }

  return (
    <div className="home-page">
      <SiteIntro />
      <section className="hero editorial-hero">
        <div className="container editorial-hero-inner">
          <div className="editorial-hero-grid">
            <div className="hero-copy editorial-hero-copy">
              <p className="hero-index-label">
                FLORASEEK PLANT INDEX · {plants.length} SPECIES
              </p>
              <h1>Find a plant that fits your life.</h1>
              <p className="hero-lede">
                A botanical field guide for matching real plants to your climate, routine, and
                confidence level without losing the pleasure of discovery.
              </p>

              <form className="hero-finder-panel" onSubmit={openFilteredFinder}>
                <label>
                  <span>Climate</span>
                  <select
                    value={heroFilters.climate}
                    onChange={(event) => updateHeroFilter("climate", event.target.value)}
                  >
                    {filterOptions.climate.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Experience</span>
                  <select
                    value={heroFilters.difficulty}
                    onChange={(event) => updateHeroFilter("difficulty", event.target.value)}
                  >
                    {experienceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Plant type</span>
                  <select
                    value={heroFilters.type}
                    onChange={(event) => updateHeroFilter("type", event.target.value)}
                  >
                    {filterOptions.type.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <button className="button primary hero-submit-button" type="submit">
                  Find my plant
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </form>

              <div className="hero-quiet-actions">
                <RandomPlantButton className="hero-random-link" />
              </div>

              <p className="hero-index-summary">
                {plants.length} plant profiles · {climateCount} climates · {difficultyCount} difficulty levels
              </p>
            </div>

            <div className="hero-collage" aria-label="Botanical plant specimen collage">
              <span className="hero-specimen-number" aria-hidden="true">01</span>
              {primaryHeroPlant && (
                <figure className="collage-frame collage-frame-main">
                  <img src={primaryHeroPlant.image} alt={`${primaryHeroPlant.name} leaves`} />
                  <figcaption>
                    <span>{primaryHeroPlant.name}</span>
                    <em>Monstera deliciosa</em>
                  </figcaption>
                </figure>
              )}
              {lowLightPlant && (
                <figure className="collage-frame collage-frame-small collage-frame-low">
                  <img src={lowLightPlant.image} alt={`${lowLightPlant.name} plant`} />
                </figure>
              )}
              {tropicalPlant && (
                <figure className="collage-frame collage-frame-small collage-frame-tropical">
                  <img src={tropicalPlant.image} alt={`${tropicalPlant.name} plant`} />
                </figure>
              )}
              <span className="annotation annotation-low">LOW LIGHT</span>
              <span className="annotation annotation-beginner">BEGINNER FRIENDLY</span>
              <span className="annotation annotation-tropical">TROPICAL</span>
            </div>
          </div>

          <div className="hero-plant-strip" aria-label="Featured plant profiles">
            {heroStripPlants.map((plant) => (
              <Link className="hero-strip-card" key={plant.id} to={`/plants/${plant.slug}`}>
                <img src={plant.image} alt={`${plant.name} plant`} loading="lazy" />
                <span>
                  <strong>{plant.name}</strong>
                  <small>
                    {plant.category} · {labels.difficulty[plant.difficulty]}
                  </small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section quiz-home-section">
        <div className="container split-section">
          <div>
            <p className="eyebrow">
              <Leaf size={16} aria-hidden="true" />
              Guided pick
            </p>
            <h2>Not sure which plant to choose?</h2>
            <p>
              Answer a few quick questions about experience, climate, category, and challenge level to
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
    </div>
  );
}
