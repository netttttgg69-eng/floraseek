export const ALL_VALUE = "all";

export const filterOptions = {
  difficulty: [
    { label: "All difficulties", value: ALL_VALUE },
    { label: "Easy", value: "easy" },
    { label: "Moderate", value: "moderate" },
    { label: "Hard", value: "hard" },
    { label: "Extreme", value: "extreme" },
  ],
  climate: [
    { label: "All climates", value: ALL_VALUE },
    { label: "Temperate", value: "temperate" },
    { label: "Tropical", value: "tropical" },
    { label: "Subtropical", value: "subtropical" },
    { label: "Desert", value: "desert" },
    { label: "Continental", value: "continental" },
  ],
  type: [
    { label: "All types", value: ALL_VALUE },
    { label: "Flowers", value: "flower" },
    { label: "Plants", value: "plant" },
  ],
};

export const labels = {
  difficulty: {
    easy: "Easy",
    moderate: "Moderate",
    hard: "Hard",
    extreme: "Extreme",
  },
  climate: {
    temperate: "Temperate",
    tropical: "Tropical",
    subtropical: "Subtropical",
    desert: "Desert",
    continental: "Continental",
  },
  type: {
    flower: "Flower",
    plant: "Plant",
  },
};

const noteUnavailable =
  "Detailed care notes were not included in the Wix export. This profile preserves the original category information and is ready for researched notes to be added.";

export const plants = [
  {
    id: "sunflower",
    name: "Sunflower",
    slug: "sunflower",
    image: "/images/plants/sunflower.png",
    legacyPaths: ["/sunflower"],
    difficulty: "easy",
    type: "flower",
    climates: ["temperate", "subtropical"],
    summary: "A bright flower profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "gold",
  },
  {
    id: "rose",
    name: "Rose",
    slug: "rose",
    image: "/images/plants/rose.png",
    legacyPaths: ["/rose"],
    difficulty: "moderate",
    type: "flower",
    climates: ["temperate"],
    summary: "A classic flower profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "rose",
  },
  {
    id: "tulip",
    name: "Tulip",
    slug: "tulip",
    image: "/images/plants/tulip.png",
    legacyPaths: ["/tulip"],
    difficulty: "easy",
    type: "flower",
    climates: ["temperate", "continental"],
    summary: "An easy flower profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "coral",
  },
  {
    id: "lavender",
    name: "Lavender",
    slug: "lavender",
    image: "/images/plants/lavender.png",
    legacyPaths: ["/lavender"],
    difficulty: "easy",
    type: "flower",
    climates: ["temperate"],
    summary: "An easy flower profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "lavender",
  },
  {
    id: "cactus",
    name: "Cactus",
    slug: "cactus",
    image: "/images/plants/cactus.png",
    legacyPaths: ["/cactus"],
    difficulty: "easy",
    type: "plant",
    climates: ["subtropical", "desert"],
    summary: "A resilient plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "sage",
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    slug: "aloe-vera",
    image: "/images/plants/aloe-vera.png",
    legacyPaths: ["/aloevera", "/aloe-vera"],
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "mint",
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    slug: "snake-plant",
    image: "/images/plants/snake-plant.png",
    legacyPaths: ["/snakeplant", "/snake-plant"],
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "forest",
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    slug: "peace-lily",
    image: "/images/plants/peace-lily.png",
    legacyPaths: ["/peacelily", "/peace-lily"],
    difficulty: "easy",
    type: "flower",
    climates: ["tropical", "subtropical"],
    summary: "An easy flower profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "ivory",
  },
  {
    id: "spider-plant",
    name: "Spider Plant",
    slug: "spider-plant",
    image: "/images/plants/spider-plant.png",
    legacyPaths: ["/spiderplant", "/spider-plant"],
    difficulty: "easy",
    type: "plant",
    climates: ["temperate"],
    summary: "An easy plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "lime",
  },
  {
    id: "zz-plant",
    name: "ZZ Plant",
    slug: "zz-plant",
    image: "/images/plants/zz-plant.png",
    legacyPaths: ["/zzplant", "/zz-plant"],
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "emerald",
  },
  {
    id: "chinese-evergreen",
    name: "Chinese Evergreen",
    slug: "chinese-evergreen",
    image: "/images/plants/chinese-evergreen.png",
    legacyPaths: ["/chineseevergreen", "/chinese-evergreen"],
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "teal",
  },
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    slug: "monstera-deliciosa",
    image: "/images/plants/monstera-deliciosa.png",
    legacyPaths: ["/monsteradeliciosa", "/monstera-deliciosa"],
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical"],
    summary: "A moderate plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "forest",
  },
  {
    id: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    slug: "fiddle-leaf-fig",
    image: "/images/plants/fiddle-leaf-fig.png",
    legacyPaths: ["/fiddleleaffig", "/fiddle-leaf-fig"],
    difficulty: "hard",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "A harder plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "olive",
  },
  {
    id: "orchid",
    name: "Orchid",
    slug: "orchid",
    image: "/images/plants/orchid.png",
    legacyPaths: ["/orchid"],
    difficulty: "hard",
    type: "flower",
    climates: ["tropical", "subtropical"],
    summary: "A harder flower profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "orchid",
  },
  {
    id: "pitcher-plant",
    name: "Pitcher Plant",
    slug: "pitcher-plant",
    image: "/images/plants/pitcher-plant.png",
    legacyPaths: ["/pitcherplant", "/pitcher-plant"],
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "A moderate plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "moss",
  },
  {
    id: "welwitschia",
    name: "Welwitschia",
    slug: "welwitschia",
    image: "/images/plants/welwitschia.png",
    legacyPaths: ["/welwitschia"],
    difficulty: "extreme",
    type: "plant",
    climates: ["desert"],
    summary: "An extreme plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "sand",
  },
  {
    id: "corpse-flower",
    name: "Corpse Flower",
    slug: "corpse-flower",
    image: "/images/plants/corpse-flower.png",
    legacyPaths: ["/corpseflower", "/corpse-flower"],
    difficulty: "easy",
    type: "flower",
    climates: ["tropical"],
    summary: "A tropical flower profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "plum",
  },
  {
    id: "pothos",
    name: "Pothos",
    slug: "pothos",
    image: "/images/plants/pothos.png",
    legacyPaths: ["/pothos"],
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "lime",
  },
  {
    id: "anthurium",
    name: "Anthurium",
    slug: "anthurium",
    image: "/images/plants/anthurium.png",
    legacyPaths: ["/anthurium"],
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "A moderate plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "red",
  },
  {
    id: "kalanchoe",
    name: "Kalanchoe",
    slug: "kalanchoe",
    image: "/images/plants/kalanchoe.png",
    legacyPaths: ["/kalanchoe"],
    difficulty: "easy",
    type: "flower",
    climates: ["desert", "subtropical"],
    summary: "An easy flower profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "coral",
  },
  {
    id: "jade-plant",
    name: "Jade Plant",
    slug: "jade-plant",
    image: "/images/plants/jade-plant.png",
    legacyPaths: ["/jadeplant", "/jade-plant"],
    difficulty: "easy",
    type: "plant",
    climates: ["desert", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "jade",
  },
  {
    id: "croton",
    name: "Croton",
    slug: "croton",
    image: "/images/plants/croton.png",
    legacyPaths: ["/croton"],
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "A moderate plant profile from the original Floraseek finder.",
    care: noteUnavailable,
    accent: "amber",
  },
  {
    id: "bonsai",
    name: "Bonsai",
    slug: "bonsai",
    image: "/images/plants/bonsai.png",
    legacyPaths: ["/bonsai"],
    difficulty: "hard",
    type: "plant",
    climates: ["temperate", "subtropical"],
    summary: "A hard plant profile from the original Floraseek finder data.",
    care: noteUnavailable,
    accent: "bark",
  },
];

export function labelFor(category, value) {
  return labels[category]?.[value] ?? value;
}

export function formatList(values, category) {
  return values.map((value) => labelFor(category, value)).join(", ");
}

export function normalizeFilter(value) {
  const normalized = String(value || ALL_VALUE).trim().toLowerCase();
  return normalized === "" ? ALL_VALUE : normalized;
}

export function filterPlants(filters) {
  const difficulty = normalizeFilter(filters.difficulty);
  const climate = normalizeFilter(filters.climate);
  const type = normalizeFilter(filters.type);

  return plants.filter((plant) => {
    const matchesDifficulty = difficulty === ALL_VALUE || plant.difficulty === difficulty;
    const matchesClimate = climate === ALL_VALUE || plant.climates.includes(climate);
    const matchesType = type === ALL_VALUE || plant.type === type;

    return matchesDifficulty && matchesClimate && matchesType;
  });
}

export function getPlantBySlug(slug) {
  const normalizedSlug = `/${String(slug || "").replace(/^\/+/, "")}`;

  return plants.find((plant) => (
    plant.slug === slug ||
    plant.legacyPaths.includes(normalizedSlug)
  ));
}

export function getRelatedPlants(currentPlant, limit = 3) {
  const scored = plants
    .filter((plant) => plant.id !== currentPlant.id)
    .map((plant) => {
      const sharedClimate = plant.climates.some((climate) => currentPlant.climates.includes(climate));
      const sharedType = plant.type === currentPlant.type;
      const sharedDifficulty = plant.difficulty === currentPlant.difficulty;

      return {
        plant,
        score: Number(sharedClimate) + Number(sharedType) + Number(sharedDifficulty),
      };
    })
    .sort((a, b) => b.score - a.score || a.plant.name.localeCompare(b.plant.name));

  return scored.slice(0, limit).map(({ plant }) => plant);
}

export const missingAssetNote =
  "Plant images live in public/images/plants as PNG files. If a plant-specific PNG is missing, Floraseek falls back to public/images/plants/placeholder.png.";
