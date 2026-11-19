import { useLanguage } from "../i18n/context.js";
import { ArrowLeft, Compass, Leaf, ShoppingBag, ThermometerSun } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Badge from "../components/Badge.jsx";
import ComparePlantButton from "../components/ComparePlantButton.jsx";
import PlantCard from "../components/PlantCard.jsx";
import PlantGuides from "../components/PlantGuides.jsx";
import PlantImage from "../components/PlantImage.jsx";
import SavePlantButton from "../components/SavePlantButton.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { formatList, getPlantBySlug, getRelatedPlants, labelFor } from "../data/plants.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function PlantPage() {
  const { t } = useLanguage();
  const { slug, legacySlug } = useParams();
  const plant = getPlantBySlug(slug || legacySlug);

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
              {t("Back to Plant Finder")}
            </Link>
            <p className="eyebrow">
              <Leaf size={16} aria-hidden="true" />
              {t("{type} profile", { type: t(labelFor("type", plant.type)) })}
            </p>
            <h1>{t(plant.name)}</h1>
            <p>{t(description)}</p>
            <div className="profile-badges">
              <Badge category="category" value={plant.category} />
              <Badge category="difficulty" value={plant.difficulty} />
              <span>{formatList(plant.climates, "climate", t)}</span>
              <span>{t(labelFor("type", plant.type))}</span>
            </div>
            <div className="profile-actions">
              <SavePlantButton plant={plant} className="profile-save-button" />
              <ComparePlantButton plant={plant} className="profile-compare-button" />
            </div>
          </div>
          <div className="plant-hero-image-frame">
            <PlantImage plant={plant} size="hero" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container plant-detail-grid">
          <article className="detail-card">
            <h2>{t("Growing conditions")}</h2>
            <dl className="plant-facts">
              <div>
                <dt>
                  <Compass size={17} aria-hidden="true" />
                  {t("Difficulty")}
                </dt>
                <dd>{t(labelFor("difficulty", plant.difficulty))}</dd>
              </div>
              <div>
                <dt>
                  <ThermometerSun size={17} aria-hidden="true" />
                  {t("Climate")}
                </dt>
                <dd>{formatList(plant.climates, "climate", t)}</dd>
              </div>
              <div>
                <dt>
                  <Leaf size={17} aria-hidden="true" />
                  {t("Type")}
                </dt>
                <dd>{t(labelFor("type", plant.type))}</dd>
              </div>
            </dl>
          </article>

          <article className="detail-card shop-card">
            <div>
              <p className="eyebrow">
                <ShoppingBag size={16} aria-hidden="true" />
                {isTechniqueProfile ? t("Technique") : t("Seeds")}
              </p>
              <h2>{isTechniqueProfile ? t("Technique guide") : t("Seed availability")}</h2>
              {!shopUrl && !isTechniqueProfile && <p className="shop-note">{t("Coming soon")}</p>}
            </div>
            {isTechniqueProfile ? (
              <a className="button primary shop-button" href="#growing-guide">
                {t(shopCardLabel)}
              </a>
            ) : shopUrl ? (
              <a
                className="button primary shop-button"
                href={shopUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(shopCardLabel)}
              </a>
            ) : (
              <button className="button primary shop-button" type="button" disabled>
                {t(shopCardLabel)}
              </button>
            )}
          </article>
        </div>
      </section>

      <PlantGuides key={plant.id} guide={plant.growingGuide} />

      <section className="section muted">
        <div className="container">
          <SectionHeader eyebrow={t("Related")} title={t("Explore similar profiles")}>{t("Related plants share a type, climate, or difficulty with {name}.", { name: t(plant.name) })}</SectionHeader>
          <div className="card-grid three">
            {relatedPlants.map((relatedPlant) => (
              <PlantCard key={relatedPlant.id} plant={relatedPlant} variant="related" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
