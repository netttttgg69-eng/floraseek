import { useEffect, useMemo, useState } from "react";
import {
  readSavedPlantIds,
  SAVED_PLANTS_EVENT,
  SAVED_PLANTS_KEY,
  toggleSavedPlantId,
} from "../utils/savedPlants.js";

export default function useSavedPlants() {
  const [savedPlantIds, setSavedPlantIds] = useState(() => readSavedPlantIds());

  useEffect(() => {
    function syncSavedPlants(event) {
      setSavedPlantIds(Array.isArray(event.detail) ? event.detail : readSavedPlantIds());
    }

    function syncFromStorage(event) {
      if (!event.key || event.key === SAVED_PLANTS_KEY) {
        setSavedPlantIds(readSavedPlantIds());
      }
    }

    window.addEventListener(SAVED_PLANTS_EVENT, syncSavedPlants);
    window.addEventListener("storage", syncFromStorage);

    return () => {
      window.removeEventListener(SAVED_PLANTS_EVENT, syncSavedPlants);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  return useMemo(() => ({
    savedPlantIds,
    isSaved: (plantId) => savedPlantIds.includes(plantId),
    toggleSaved: (plantId) => {
      setSavedPlantIds(toggleSavedPlantId(plantId));
    },
  }), [savedPlantIds]);
}
