export const COMPARISON_KEY = "floraseek-comparison";
export const COMPARISON_EVENT = "floraseek-comparison-change";
export const MAX_COMPARISON_PLANTS = 3;

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function sanitizeComparisonPlantIds(ids) {
  if (!Array.isArray(ids)) {
    return [];
  }

  return [...new Set(ids.filter((id) => typeof id === "string"))].slice(0, MAX_COMPARISON_PLANTS);
}

export function readComparisonPlantIds() {
  if (!hasStorage()) {
    return [];
  }

  try {
    return sanitizeComparisonPlantIds(
      JSON.parse(window.localStorage.getItem(COMPARISON_KEY) || "[]")
    );
  } catch {
    return [];
  }
}

export function writeComparisonPlantIds(ids) {
  if (!hasStorage()) {
    return [];
  }

  const sanitizedIds = sanitizeComparisonPlantIds(ids);
  window.localStorage.setItem(COMPARISON_KEY, JSON.stringify(sanitizedIds));
  window.dispatchEvent(new CustomEvent(COMPARISON_EVENT, { detail: sanitizedIds }));

  return sanitizedIds;
}

export function addComparisonPlantId(plantId) {
  const comparedIds = readComparisonPlantIds();

  if (comparedIds.includes(plantId) || comparedIds.length >= MAX_COMPARISON_PLANTS) {
    return comparedIds;
  }

  return writeComparisonPlantIds([...comparedIds, plantId]);
}

export function removeComparisonPlantId(plantId) {
  return writeComparisonPlantIds(readComparisonPlantIds().filter((id) => id !== plantId));
}

export function clearComparisonPlantIds() {
  return writeComparisonPlantIds([]);
}

export function getComparisonRows(selectedPlants, helpers) {
  const rows = [
    {
      key: "shortDescription",
      label: "Short description",
      getValue: (plant) => plant.shortDescription || plant.summary,
    },
    {
      key: "difficulty",
      label: "Difficulty",
      getValue: (plant) => helpers.labelFor("difficulty", plant.difficulty),
    },
    {
      key: "climate",
      label: "Climate",
      getValue: (plant) => helpers.formatList(plant.climates, "climate"),
    },
    {
      key: "type",
      label: "Type",
      getValue: (plant) => helpers.labelFor("type", plant.type),
    },
    {
      key: "category",
      label: "Category",
      getValue: (plant) => plant.category,
    },
  ];

  return rows.map((row) => {
    const values = selectedPlants.map((plant) => row.getValue(plant));
    const normalizedValues = values.map((value) => String(value).toLowerCase());

    return {
      ...row,
      values,
      isDifferent: new Set(normalizedValues).size > 1,
    };
  });
}
