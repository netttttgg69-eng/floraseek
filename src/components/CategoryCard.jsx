import { ArrowRight, Flower2, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryCard({ type, count }) {
  const isFlower = type === "flower";

  return (
    <Link className={`category-card ${isFlower ? "flower-card" : "plant-card-link"}`} to={isFlower ? "/flowers" : "/plants"}>
      <span className="category-icon" aria-hidden="true">
        {isFlower ? <Flower2 size={30} /> : <Sprout size={30} />}
      </span>
      <span>
        <strong>{isFlower ? "Flowers" : "Plants"}</strong>
        <small>{count} profiles</small>
      </span>
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
