import { useLanguage } from "../i18n/context.js";
import { ArrowRight, Flower2, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryCard({ type, count }) {
  const { t } = useLanguage();
  const isFlower = type === "flower";

  return (
    <Link className={`category-card ${isFlower ? "flower-card" : "plant-card-link"}`} to={isFlower ? "/flowers" : "/plants"}>
      <span className="category-icon" aria-hidden="true">
        {isFlower ? <Flower2 size={30} /> : <Sprout size={30} />}
      </span>
      <span>
        <strong>{isFlower ? t("Flowers") : t("Plants")}</strong>
        <small>{t("{count} profiles", { count })}</small>
      </span>
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
