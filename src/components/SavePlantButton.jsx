import { useLanguage } from "../i18n/context.js";
import { Heart } from "lucide-react";
import useSavedPlants from "../hooks/useSavedPlants.js";

export default function SavePlantButton({ plant, className = "" }) {
  const { t } = useLanguage();
  const { isSaved, toggleSaved } = useSavedPlants();
  const saved = isSaved(plant.id);

  return (
    <button
      className={`save-plant-button ${saved ? "saved" : ""} ${className}`.trim()}
      type="button"
      aria-pressed={saved}
      aria-label={saved ? t("Remove {name} from saved plants", { name: t(plant.name) }) : t("Save {name}", { name: t(plant.name) })}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSaved(plant.id);
      }}
    >
      <Heart size={18} aria-hidden="true" fill={saved ? "currentColor" : "none"} />
      <span>{saved ? t("Saved") : t("Save")}</span>
    </button>
  );
}
