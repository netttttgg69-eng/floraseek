import { useEffect, useMemo, useState } from "react";
import {
  addComparisonPlantId,
  clearComparisonPlantIds,
  COMPARISON_EVENT,
  COMPARISON_KEY,
  MAX_COMPARISON_PLANTS,
  readComparisonPlantIds,
  removeComparisonPlantId,
} from "../utils/comparison.js";

export default function useComparison() {
  const [comparisonPlantIds, setComparisonPlantIds] = useState(() => readComparisonPlantIds());

  useEffect(() => {
    function syncComparison(event) {
      setComparisonPlantIds(
        Array.isArray(event.detail) ? event.detail : readComparisonPlantIds()
      );
    }

    function syncFromStorage(event) {
      if (!event.key || event.key === COMPARISON_KEY) {
        setComparisonPlantIds(readComparisonPlantIds());
      }
    }

    window.addEventListener(COMPARISON_EVENT, syncComparison);
    window.addEventListener("storage", syncFromStorage);

    return () => {
      window.removeEventListener(COMPARISON_EVENT, syncComparison);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  return useMemo(() => ({
    comparisonCount: comparisonPlantIds.length,
    comparisonLimit: MAX_COMPARISON_PLANTS,
    comparisonPlantIds,
    canAddToComparison: comparisonPlantIds.length < MAX_COMPARISON_PLANTS,
    isCompared: (plantId) => comparisonPlantIds.includes(plantId),
    addToComparison: (plantId) => {
      setComparisonPlantIds(addComparisonPlantId(plantId));
    },
    removeFromComparison: (plantId) => {
      setComparisonPlantIds(removeComparisonPlantId(plantId));
    },
    clearComparison: () => {
      setComparisonPlantIds(clearComparisonPlantIds());
    },
  }), [comparisonPlantIds]);
}
