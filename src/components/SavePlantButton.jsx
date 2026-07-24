import { Heart } from "lucide-react";
import useSavedPlants from "../hooks/useSavedPlants.js";

export default function SavePlantButton({ plant, className = "" }) {
  const { isSaved, toggleSaved } = useSavedPlants();
  const saved = isSaved(plant.id);

  return (
    <button
      className={`save-plant-button ${saved ? "saved" : ""} ${className}`.trim()}
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${plant.name} from saved plants` : `Save ${plant.name}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSaved(plant.id);
      }}
    >
      <Heart size={18} aria-hidden="true" fill={saved ? "currentColor" : "none"} />
      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
