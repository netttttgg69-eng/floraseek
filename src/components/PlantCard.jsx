import { useLanguage } from "../i18n/context.js";
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
  const { t } = useLanguage();
  const compact = variant === "finder";
  return (
    <article className={`plant-card ${compact ? "plant-card-compact" : ""}`}>
      <PlantImage plant={plant} />
      <SavePlantButton plant={plant} className="plant-card-save" />
      <div className="plant-card-body">
        <div>
          <p className="eyebrow">{t(labelFor("type", plant.type))}</p>
          <h3><Link className="plant-title-link" to={`/plants/${plant.slug}`}>{t(plant.name)}</Link></h3>
        </div>
        {compact ? (
          <div className="plant-card-tags" aria-label={t("{name} key details", { name: t(plant.name) })}>
            <Badge category="difficulty" value={plant.difficulty} />
            {plant.climates?.[0] && <Badge category="climate" value={plant.climates[0]} />}
            <span className="badge">{t(compactCategoryLabels[plant.category] || plant.category)}</span>
          </div>
        ) : (
          <>
            <Badge category="category" value={plant.category} />
            <p>{t(plant.shortDescription || plant.summary)}</p>
            <dl className="plant-facts">
              <div><dt>{t("Difficulty")}</dt><dd>{t(labelFor("difficulty", plant.difficulty))}</dd></div>
              <div><dt>{t("Climate")}</dt><dd>{formatList(plant.climates, "climate", t)}</dd></div>
            </dl>
          </>
        )}
        <div className="plant-card-actions"><ComparePlantButton plant={plant} /></div>
      </div>
    </article>
  );
}
