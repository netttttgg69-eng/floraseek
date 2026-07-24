const fallbackPlantImage = "/images/plants/placeholder.png";

export default function PlantImage({ plant, size = "card" }) {
  return (
    <img
      className={`plant-image plant-image-${size}`}
      src={plant.image || fallbackPlantImage}
      alt={`${plant.name} plant`}
      loading={size === "hero" ? "eager" : "lazy"}
      onError={(event) => {
        if (!event.currentTarget.src.endsWith(fallbackPlantImage)) {
          event.currentTarget.src = fallbackPlantImage;
        }
      }}
    />
  );
}
