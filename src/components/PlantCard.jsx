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

export default function PlantCard({ plant, variant = "default" }) {
  const compact = variant === "finder";
  return (
    <article className={`plant-card ${compact ? "plant-card-compact" : ""}`}>
      <PlantImage plant={plant} />
      <SavePlantButton plant={plant} className="plant-card-save" />
      <div className="plant-card-body">
        <div>
          <p className="eyebrow">{labelFor("type", plant.type)}</p>
          <h3><Link className="plant-title-link" to={`/plants/${plant.slug}`}>{plant.name}</Link></h3>
        </div>
        {compact ? (
          <div className="plant-card-tags" aria-label={`${plant.name} key details`}>
            <Badge category="difficulty" value={plant.difficulty} />
            {plant.climates?.[0] && <Badge category="climate" value={plant.climates[0]} />}
            <span className="badge">{compactCategoryLabels[plant.category] || plant.category}</span>
          </div>
        ) : (
          <>
            <Badge category="category" value={plant.category} />
            <p>{plant.shortDescription || plant.summary}</p>
            <dl className="plant-facts">
              <div><dt>Difficulty</dt><dd>{labelFor("difficulty", plant.difficulty)}</dd></div>
              <div><dt>Climate</dt><dd>{formatList(plant.climates, "climate")}</dd></div>
            </dl>
          </>
        )}
        <div className="plant-card-actions"><ComparePlantButton plant={plant} /></div>
      </div>
    </article>
  );
}
