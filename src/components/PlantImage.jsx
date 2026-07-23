import { ImageOff, Leaf } from "lucide-react";

export default function PlantImage({ plant, size = "card" }) {
  if (plant.image) {
    return (
      <img
        className={`plant-image plant-image-${size}`}
        src={plant.image}
        alt={`${plant.name} plant`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`plant-placeholder plant-placeholder-${size} accent-${plant.accent}`}
      role="img"
      aria-label={`Placeholder illustration for ${plant.name}. Original image was not included in the Wix export.`}
    >
      <div className="placeholder-glow" aria-hidden="true" />
      <Leaf className="placeholder-leaf" size={size === "hero" ? 92 : 54} aria-hidden="true" />
      <div className="placeholder-label">
        <ImageOff size={16} aria-hidden="true" />
        <span>Image placeholder</span>
      </div>
    </div>
  );
}
