import { useLanguage } from "../i18n/context.js";
const fallbackPlantImage = "/images/plants/placeholder.png";

export default function PlantImage({ plant, size = "card" }) {
  const { t } = useLanguage();
  return (
    <img
      className={`plant-image plant-image-${size}`}
      src={plant.image || fallbackPlantImage}
      alt={t("{name} plant", { name: t(plant.name) })}
      loading={size === "hero" ? "eager" : "lazy"}
      onError={(event) => {
        if (!event.currentTarget.src.endsWith(fallbackPlantImage)) {
          event.currentTarget.src = fallbackPlantImage;
        }
      }}
    />
  );
}
