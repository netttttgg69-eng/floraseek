import { GitCompareArrows } from "lucide-react";
import useComparison from "../hooks/useComparison.js";

export default function ComparePlantButton({ plant, className = "" }) {
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
        compared
          ? `Remove ${plant.name} from comparison`
          : `Add ${plant.name} to comparison`
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
      <span>{label}</span>
    </button>
  );
}
