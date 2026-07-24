import { ArrowRight, CalendarDays, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { formatList, labelFor } from "../data/plants.js";
import { getPlantOfWeek } from "../utils/plantOfWeek.js";
import Badge from "./Badge.jsx";
import PlantImage from "./PlantImage.jsx";

export default function PlantOfWeek() {
  const { plant, week, year } = getPlantOfWeek();

  return (
    <article className="plant-week-card">
      <PlantImage plant={plant} />
      <div className="plant-week-copy">
        <p className="eyebrow">
          <CalendarDays size={16} aria-hidden="true" />
          Week {week}, {year}
        </p>
        <h3>{plant.name}</h3>
        <p>{plant.summary}</p>
        <div className="profile-badges plant-week-badges">
          <Badge category="difficulty" value={plant.difficulty} />
          <span>{formatList(plant.climates, "climate")}</span>
          <span>
            <Leaf size={14} aria-hidden="true" />
            {labelFor("type", plant.type)}
          </span>
        </div>
        <Link className="button primary" to={`/plants/${plant.slug}`}>
          Open plant page
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
