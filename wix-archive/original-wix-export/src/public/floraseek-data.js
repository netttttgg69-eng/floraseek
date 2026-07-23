export const ALL_VALUE = "all";

export const FILTER_OPTIONS = {
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
    { label: "All plant types", value: ALL_VALUE },
    { label: "Flowers", value: "flower" },
    { label: "Plants", value: "plant" },
  ],
};

export const LABELS = {
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
    tundra: "Tundra",
  },
  type: {
    flower: "Flower",
    plant: "Plant",
  },
};

export const PLANTS = [
  {
    _id: "sunflower",
    name: "Sunflower",
    buttonId: "sunflowerBtn",
    cardId: "sunflowerCard",
    pageUrl: "/sunflower",
    difficulty: "easy",
    type: "flower",
    climates: ["temperate", "subtropical"],
  },
  {
    _id: "rose",
    name: "Rose",
    buttonId: "roseBtn",
    cardId: "roseCard",
    pageUrl: "/rose",
    difficulty: "moderate",
    type: "flower",
    climates: ["temperate"],
  },
  {
    _id: "tulip",
    name: "Tulip",
    buttonId: "tulipBtn",
    cardId: "tulipCard",
    pageUrl: "/tulip",
    difficulty: "easy",
    type: "flower",
    climates: ["temperate", "continental"],
  },
  {
    _id: "lavender",
    name: "Lavender",
    buttonId: "lavenderBtn",
    cardId: "lavenderCard",
    pageUrl: "/lavender",
    difficulty: "easy",
    type: "flower",
    climates: ["temperate"],
  },
  {
    _id: "cactus",
    name: "Cactus",
    buttonId: "cactusBtn",
    cardId: "cactusCard",
    pageUrl: "/cactus",
    difficulty: "easy",
    type: "plant",
    climates: ["subtropical", "desert"],
  },
  {
    _id: "aloe-vera",
    name: "Aloe Vera",
    buttonId: "aloeBtn",
    cardId: "aloeCard",
    pageUrl: "/aloevera",
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "snake-plant",
    name: "Snake Plant",
    buttonId: "snakePlantBtn",
    cardId: "snakePlantCard",
    pageUrl: "/snakeplant",
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "peace-lily",
    name: "Peace Lily",
    buttonId: "peaceLilyBtn",
    cardId: "peaceLilyCard",
    pageUrl: "/peacelily",
    difficulty: "easy",
    type: "flower",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "spider-plant",
    name: "Spider Plant",
    buttonId: "spiderPlantBtn",
    cardId: "spiderPlantCard",
    pageUrl: "/spiderplant",
    difficulty: "easy",
    type: "plant",
    climates: ["temperate"],
  },
  {
    _id: "zz-plant",
    name: "ZZ Plant",
    buttonId: "zzPlantBtn",
    cardId: "zzPlantCard",
    pageUrl: "/zzplant",
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "chinese-evergreen",
    name: "Chinese Evergreen",
    buttonId: "chineseEvergreenBtn",
    cardId: "chineseEvergreenCard",
    pageUrl: "/chineseevergreen",
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    buttonId: "monsterdelicousBtn",
    cardId: "monsteraDeliciosaCard",
    pageUrl: "/monsteradeliciosa",
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical"],
  },
  {
    _id: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    buttonId: "fiddleleafFigBtn",
    cardId: "fiddleLeafFigCard",
    pageUrl: "/fiddleleaffig",
    difficulty: "hard",
    type: "plant",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "orchid",
    name: "Orchid",
    buttonId: "orchidBtn",
    cardId: "orchidCard",
    pageUrl: "/orchid",
    difficulty: "hard",
    type: "flower",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "pitcher-plant",
    name: "Pitcher Plant",
    buttonId: "pitcherPlantBtn",
    cardId: "pitcherPlantCard",
    pageUrl: "/pitcherplant",
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "welwitschia",
    name: "Welwitschia",
    buttonId: "welvitchiaBtn",
    cardId: "welwitschiaCard",
    pageUrl: "/welwitschia",
    difficulty: "extreme",
    type: "plant",
    climates: ["desert"],
  },
  {
    _id: "corpse-flower",
    name: "Corpse Flower",
    buttonId: "corpsePlantBtn",
    cardId: "corpseFlowerCard",
    pageUrl: "/corpseflower",
    difficulty: "easy",
    type: "flower",
    climates: ["tropical"],
  },
  {
    _id: "pothos",
    name: "Pothos",
    buttonId: "pothosBtn",
    cardId: "pothosCard",
    pageUrl: "/pothos",
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "anthurium",
    name: "Anthurium",
    buttonId: "AnthuriumBtn",
    cardId: "anthuriumCard",
    pageUrl: "/anthurium",
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "kalanchoe",
    name: "Kalanchoe",
    buttonId: "KalanchoeBtn",
    cardId: "kalanchoeCard",
    pageUrl: "/kalanchoe",
    difficulty: "easy",
    type: "flower",
    climates: ["desert", "subtropical"],
  },
  {
    _id: "jade-plant",
    name: "Jade Plant",
    buttonId: "JadeplantBtn",
    cardId: "jadePlantCard",
    pageUrl: "/jadeplant",
    difficulty: "easy",
    type: "plant",
    climates: ["desert", "subtropical"],
  },
  {
    _id: "croton",
    name: "Croton",
    buttonId: "CrotonBtn",
    cardId: "crotonCard",
    pageUrl: "/croton",
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical", "subtropical"],
  },
  {
    _id: "bonsai",
    name: "Bonsai",
    buttonId: "BonsaiBtn",
    cardId: "bonsaiCard",
    pageUrl: "",
    difficulty: "hard",
    type: "plant",
    climates: ["temperate", "subtropical"],
  },
];

export function normalizeValue(value) {
  const normalized = String(value || ALL_VALUE).trim().toLowerCase();
  return normalized === "" ? ALL_VALUE : normalized;
}

export function labelFor(category, value) {
  return LABELS[category] && LABELS[category][value]
    ? LABELS[category][value]
    : value;
}

export function formatList(values, category) {
  return values.map((value) => labelFor(category, value)).join(", ");
}

export function getPlantDescription(plant) {
  return `${labelFor("difficulty", plant.difficulty)} ${labelFor("type", plant.type).toLowerCase()} profile for ${formatList(plant.climates, "climate")} climates.`;
}

export function getPlantDisplayData(plant) {
  return {
    ...plant,
    description: getPlantDescription(plant),
    difficultyLabel: labelFor("difficulty", plant.difficulty),
    typeLabel: labelFor("type", plant.type),
    climateLabel: formatList(plant.climates, "climate"),
    imageAlt: `${plant.name} plant image`,
  };
}

export function getPlantsForDisplay(plants = PLANTS) {
  return plants.map(getPlantDisplayData);
}

export function filterPlants(filters = {}) {
  const difficulty = normalizeValue(filters.difficulty);
  const climate = normalizeValue(filters.climate);
  const type = normalizeValue(filters.type);

  return PLANTS.filter((plant) => {
    const matchesDifficulty = difficulty === ALL_VALUE || plant.difficulty === difficulty;
    const matchesClimate = climate === ALL_VALUE || plant.climates.includes(climate);
    const matchesType = type === ALL_VALUE || plant.type === type;

    return matchesDifficulty && matchesClimate && matchesType;
  });
}

export function getPlantById(id) {
  return PLANTS.find((plant) => plant._id === id);
}

export function getPlantsByType(type) {
  return PLANTS.filter((plant) => plant.type === type);
}

export function getRandomPlant(plants = PLANTS) {
  const pageReadyPlants = plants.filter((plant) => plant.pageUrl);
  return pageReadyPlants[Math.floor(Math.random() * pageReadyPlants.length)];
}
