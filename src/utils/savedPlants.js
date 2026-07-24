export const SAVED_PLANTS_KEY = "floraseek-saved-plants";
export const SAVED_PLANTS_EVENT = "floraseek-saved-plants-change";

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readSavedPlantIds() {
  if (!hasStorage()) {
    return [];
  }

  try {
    const saved = JSON.parse(window.localStorage.getItem(SAVED_PLANTS_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function writeSavedPlantIds(ids) {
  if (!hasStorage()) {
    return;
  }

  const uniqueIds = [...new Set(ids)];
  window.localStorage.setItem(SAVED_PLANTS_KEY, JSON.stringify(uniqueIds));
  window.dispatchEvent(new CustomEvent(SAVED_PLANTS_EVENT, { detail: uniqueIds }));
}

export function toggleSavedPlantId(plantId) {
  const savedIds = readSavedPlantIds();
  const nextIds = savedIds.includes(plantId)
    ? savedIds.filter((id) => id !== plantId)
    : [...savedIds, plantId];

  writeSavedPlantIds(nextIds);
  return nextIds;
}
