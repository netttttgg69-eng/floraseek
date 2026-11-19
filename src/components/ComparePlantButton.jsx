import { useLanguage } from "../i18n/context.js";
import { GitCompareArrows } from "lucide-react";
import useComparison from "../hooks/useComparison.js";

export default function ComparePlantButton({ plant, className = "" }) {
  const { t } = useLanguage();
  const {
    addToComparison,
    isCompared,
    removeFromComparison,
  } = useComparison();
  const compared = isCompared(plant.id);
  const label = compared ? "In comparison" : "Compare";

  return (
    <button
      className={`compare-plant-button ${compared ? "compared" : ""} ${className}`.trim()}
      type="button"
      aria-pressed={compared}
      aria-label={
        compared ? t("Remove {name} from comparison", { name: t(plant.name) }) : t("Add {name} to comparison", { name: t(plant.name) })
      }
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (compared) {
          removeFromComparison(plant.id);
        } else {
          addToComparison(plant.id);
        }
      }}
    >
      <GitCompareArrows size={17} aria-hidden="true" />
      <span>{t(label)}</span>
    </button>
  );
}
