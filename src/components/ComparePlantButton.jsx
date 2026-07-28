import { GitCompareArrows } from "lucide-react";
import useComparison from "../hooks/useComparison.js";

export default function ComparePlantButton({ plant, className = "" }) {
  const {
    addToComparison,
    canAddToComparison,
    comparisonLimit,
    isCompared,
    removeFromComparison,
  } = useComparison();
  const compared = isCompared(plant.id);
  const addDisabled = !compared && !canAddToComparison;
  const label = compared ? "In comparison" : addDisabled ? "Compare full" : "Compare";

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
      disabled={addDisabled}
      title={
        addDisabled
          ? `Remove a plant before comparing more than ${comparisonLimit}.`
          : undefined
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
