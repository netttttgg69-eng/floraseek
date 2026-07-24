import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatList, labelFor } from "../data/plants.js";
import Badge from "./Badge.jsx";
import PlantImage from "./PlantImage.jsx";
import SavePlantButton from "./SavePlantButton.jsx";

export default function PlantCard({ plant }) {
  return (
    <article className="plant-card">
      <SavePlantButton plant={plant} className="plant-card-save" />
      <PlantImage plant={plant} />
      <div className="plant-card-body">
        <div>
          <p className="eyebrow">{labelFor("type", plant.type)}</p>
          <h3>{plant.name}</h3>
          <p>{plant.summary}</p>
        </div>

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

        <Link className="text-link" to={`/plants/${plant.slug}`} aria-label={`View ${plant.name}`}>
          View plant
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
