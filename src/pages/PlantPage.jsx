import { ArrowLeft, Compass, Flower2, Leaf, ShoppingBag, ThermometerSun } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Badge from "../components/Badge.jsx";
import ComparePlantButton from "../components/ComparePlantButton.jsx";
import PlantCard from "../components/PlantCard.jsx";
import PlantImage from "../components/PlantImage.jsx";
import SavePlantButton from "../components/SavePlantButton.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { formatList, getPlantBySlug, getRelatedPlants, labelFor } from "../data/plants.js";
import { setPageMeta } from "../utils/meta.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function PlantPage() {
  const { slug, legacySlug } = useParams();
  const plant = getPlantBySlug(slug || legacySlug);

  useEffect(() => {
    if (plant) {
      setPageMeta(
        plant.name,
        plant.shortDescription || `${plant.name} profile in Floraseek: ${labelFor("difficulty", plant.difficulty)} ${labelFor("type", plant.type).toLowerCase()} for ${formatList(plant.climates, "climate")} climates.`
      );
    }
  }, [plant]);

  if (!plant) {
    return <NotFoundPage />;
  }

  const relatedPlants = getRelatedPlants(plant);
  const shopUrl = (plant.shopUrl || "").trim();
  const description = plant.shortDescription || plant.summary;
  const isTechniqueProfile = plant.category === "Techniques" || plant.type === "technique";
  const shopCardLabel = isTechniqueProfile ? "Learn how to do this" : "Shop seeds here";

  return (
    <>
      <section className="plant-hero">
        <div className="container plant-hero-grid">
          <div className="plant-hero-copy">
            <Link className="back-link" to="/finder">
              <ArrowLeft size={17} aria-hidden="true" />
              Back to Plant Finder
            </Link>
            <p className="eyebrow">
              <Leaf size={16} aria-hidden="true" />
              {labelFor("type", plant.type)} profile
            </p>
            <h1>{plant.name}</h1>
            <p>{description}</p>
            <div className="profile-badges">
              <Badge category="category" value={plant.category} />
              <Badge category="difficulty" value={plant.difficulty} />
              <span>{formatList(plant.climates, "climate")}</span>
              <span>{labelFor("type", plant.type)}</span>
            </div>
            <div className="profile-actions">
              <SavePlantButton plant={plant} className="profile-save-button" />
              <ComparePlantButton plant={plant} className="profile-compare-button" />
            </div>
          </div>
          <div className="plant-hero-image-frame">
            <PlantImage plant={plant} size="hero" />
            {plant.id === "hydrangea" && (
              <Link
                className="hydrangea-field-trigger"
                to="/flower-field"
                aria-label="Open the hidden Flower Field"
              >
                <Flower2 size={14} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container plant-detail-grid">
          <article className="detail-card">
            <h2>Quick summary</h2>
            <p>{description}</p>
            <dl className="plant-facts">
              <div>
                <dt>
                  <Compass size={17} aria-hidden="true" />
                  Difficulty
                </dt>
                <dd>{labelFor("difficulty", plant.difficulty)}</dd>
              </div>
              <div>
                <dt>
                  <ThermometerSun size={17} aria-hidden="true" />
                  Climate
                </dt>
                <dd>{formatList(plant.climates, "climate")}</dd>
              </div>
              <div>
                <dt>
                  <Leaf size={17} aria-hidden="true" />
                  Type
                </dt>
                <dd>{labelFor("type", plant.type)}</dd>
              </div>
            </dl>
          </article>

          <article className="detail-card shop-card">
            <div>
              <p className="eyebrow">
                <ShoppingBag size={16} aria-hidden="true" />
                {isTechniqueProfile ? "Technique" : "Seeds"}
              </p>
              <h2>{shopCardLabel}</h2>
              {!shopUrl && !isTechniqueProfile && <p className="shop-note">Coming soon</p>}
            </div>
            {isTechniqueProfile ? (
              <a className="button primary shop-button" href="#">
                {shopCardLabel}
              </a>
            ) : shopUrl ? (
              <a
                className="button primary shop-button"
                href={shopUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shopCardLabel}
              </a>
            ) : (
              <button className="button primary shop-button" type="button" disabled>
                {shopCardLabel}
              </button>
            )}
          </article>
        </div>
      </section>

      <section className="section muted">
        <div className="container">
          <SectionHeader eyebrow="Related" title="Explore similar profiles">
            Related plants share a type, climate, or difficulty with {plant.name}.
          </SectionHeader>
          <div className="card-grid three">
            {relatedPlants.map((relatedPlant) => (
              <PlantCard key={relatedPlant.id} plant={relatedPlant} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
