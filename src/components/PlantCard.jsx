import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatList, labelFor } from "../data/plants.js";
import Badge from "./Badge.jsx";
import ComparePlantButton from "./ComparePlantButton.jsx";
import PlantImage from "./PlantImage.jsx";
import SavePlantButton from "./SavePlantButton.jsx";

const compactCategoryLabels = {
  Flowers: "Flower",
  Houseplants: "Houseplant",
  Succulents: "Succulent",
  "Trees & Shrubs": "Tree/Shrub",
  "Edible Plants": "Edible",
  "Special Plants": "Special",
  Techniques: "Technique",
};

function getCompactCategoryLabel(plant) {
  return compactCategoryLabels[plant.category] || labelFor("type", plant.type);
}

export default function PlantCard({ plant, variant = "default" }) {
  const isFinderCard = variant === "finder";
  const isRelatedCard = variant === "related";
  const description = plant.shortDescription || plant.summary;
  const profilePath = `/plants/${plant.slug}`;
  const cardClassName = [
    "plant-card",
    isFinderCard ? "plant-card-compact plant-card-clickable" : "",
    isRelatedCard ? "plant-card-related" : "",
  ].filter(Boolean).join(" ");
  const compactTags = [
    { kind: "difficulty", label: labelFor("difficulty", plant.difficulty) },
    { kind: "climate", label: plant.climates?.[0] ? labelFor("climate", plant.climates[0]) : "" },
    { kind: "category", label: getCompactCategoryLabel(plant) },
  ].filter((tag) => tag.label);

  return (
    <article className={cardClassName}>
      {isFinderCard && (
        <Link className="plant-card-link-overlay" to={profilePath} aria-label={`View ${plant.name}`} />
      )}
      <SavePlantButton plant={plant} className="plant-card-save" />
      {isRelatedCard ? (
        <Link className="plant-image-link" to={profilePath} aria-label={`View ${plant.name}`}>
          <PlantImage plant={plant} />
        </Link>
      ) : (
        <PlantImage plant={plant} />
      )}
      <div className="plant-card-body">
        <div>
          <p className="eyebrow">{labelFor("type", plant.type)}</p>
          <h3>
            {isRelatedCard ? (
              <Link className="plant-title-link" to={profilePath}>
                {plant.name}
              </Link>
            ) : plant.name}
          </h3>
          {isFinderCard ? (
            <div className="plant-card-tags" aria-label={`${plant.name} key details`}>
              {compactTags.map((tag) => (
                <span className={`plant-card-chip plant-card-chip-${tag.kind}`} key={`${plant.id}-${tag.kind}`}>
                  {tag.label}
                </span>
              ))}
            </div>
          ) : (
            <>
              <Badge category="category" value={plant.category} />
              <p>{description}</p>
            </>
          )}
        </div>

        {!isFinderCard && (
          <dl className="plant-facts compact">
            <div>
              <dt>Difficulty</dt>
              <dd>
                <Badge category="difficulty" value={plant.difficulty} />
              </dd>
            </div>
            <div>
              <dt>Climate</dt>
              <dd>{formatList(plant.climates, "climate")}</dd>
            </div>
        </dl>
        )}

        <div className={`plant-card-actions ${isFinderCard ? "plant-card-actions-compact" : ""}`.trim()}>
          {!isFinderCard && !isRelatedCard && (
            <Link className="text-link" to={profilePath} aria-label={`View ${plant.name}`}>
              View plant
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          )}
          <ComparePlantButton plant={plant} />
        </div>
      </div>
    </article>
  );
}
