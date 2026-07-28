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
    image: "/images/plants/aaron-burden-2IzoIHBqYAo-unsplash.jpg",
    shopUrl: "",
    legacyPaths: ["/sunflower"],
    difficulty: "easy",
    type: "flower",
    climates: ["temperate", "subtropical"],
    summary: "A bright flower profile from the original Floraseek finder.",
    shortDescription: "Sunflowers are tall flowering plants recognised for their large golden flower heads and dark central discs. They grow best in sunny locations and are often planted for decoration, pollinators, cut flowers, and their edible seeds.",
    care: noteUnavailable,
    accent: "gold",
  },
  {
    id: "rose",
    name: "Rose",
    slug: "rose",
    image: "/images/plants/rose.jpg",
    shopUrl: "",
    legacyPaths: ["/rose"],
    difficulty: "moderate",
    type: "flower",
    climates: ["temperate"],
    summary: "A classic flower profile from the original Floraseek finder.",
    shortDescription: "Roses are flowering shrubs known for their layered blooms, attractive colours, and often strong fragrance. They are widely grown in gardens and containers, with different varieties used for decoration, cut flowers, climbing displays, and ground cover.",
    care: noteUnavailable,
    accent: "rose",
  },
  {
    id: "tulip",
    name: "Tulip",
    slug: "tulip",
    image: "/images/plants/tulip.jpg",
    shopUrl: "",
    legacyPaths: ["/tulip"],
    difficulty: "easy",
    type: "flower",
    climates: ["temperate", "continental"],
    summary: "An easy flower profile from the original Floraseek finder.",
    shortDescription: "Tulips are spring-flowering bulb plants known for their smooth, cup-shaped blooms and wide variety of colours. They grow from bulbs planted before the flowering season and are commonly used in garden beds, pots, and cut-flower displays.",
    care: noteUnavailable,
    accent: "coral",
  },
  {
    id: "lavender",
    name: "Lavender",
    slug: "lavender",
    image: "/images/plants/Lavendar.jpg",
    shopUrl: "",
    legacyPaths: ["/lavender"],
    difficulty: "easy",
    type: "flower",
    climates: ["temperate"],
    summary: "An easy flower profile from the original Floraseek finder.",
    shortDescription: "Lavender is an aromatic flowering plant known for its narrow grey-green leaves and spikes of purple flowers. It is valued for its fragrance, attractive blooms, ability to attract pollinators, and preference for sunny, well-drained conditions.",
    care: noteUnavailable,
    accent: "lavender",
  },
  {
    id: "cactus",
    name: "Cactus",
    slug: "cactus",
    image: "/images/plants/cactus.jpg",
    shopUrl: "",
    legacyPaths: ["/cactus"],
    difficulty: "easy",
    type: "plant",
    climates: ["subtropical", "desert"],
    summary: "A resilient plant profile from the original Floraseek finder.",
    shortDescription: "Cacti are plants adapted to survive in dry environments by storing water in thick stems. Many species have spines instead of leaves and are popular because of their unusual shapes, drought tolerance, and low watering requirements.",
    care: noteUnavailable,
    accent: "sage",
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    slug: "aloe-vera",
    image: "/images/plants/aloevera.jpg",
    shopUrl: "",
    legacyPaths: ["/aloevera", "/aloe-vera"],
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    shortDescription: "Aloe vera is a succulent with thick, pointed leaves that store water and contain a clear gel. It is commonly grown indoors or in dry gardens because it needs little watering and prefers bright, warm conditions.",
    care: noteUnavailable,
    accent: "mint",
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    slug: "snake-plant",
    image: "/images/plants/snakeplant.jpg",
    shopUrl: "",
    legacyPaths: ["/snakeplant", "/snake-plant"],
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    shortDescription: "The snake plant is a tough houseplant with stiff, upright leaves that often have striped or patterned markings. It is popular because it tolerates lower light, dry indoor air, and longer periods between watering than many houseplants.",
    care: noteUnavailable,
    accent: "forest",
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    slug: "peace-lily",
    image: "/images/plants/peacelily.jpg",
    shopUrl: "",
    legacyPaths: ["/peacelily", "/peace-lily"],
    difficulty: "easy",
    type: "flower",
    climates: ["tropical", "subtropical"],
    summary: "An easy flower profile from the original Floraseek finder.",
    shortDescription: "The peace lily is a tropical houseplant with dark green leaves and elegant white flower-like structures. It is popular in homes and offices because it can tolerate lower light, although it grows and flowers best in bright indirect light.",
    care: noteUnavailable,
    accent: "ivory",
  },
  {
    id: "spider-plant",
    name: "Spider Plant",
    slug: "spider-plant",
    image: "/images/plants/spiderplant.jpg",
    shopUrl: "",
    legacyPaths: ["/spiderplant", "/spider-plant"],
    difficulty: "easy",
    type: "plant",
    climates: ["temperate"],
    summary: "An easy plant profile from the original Floraseek finder.",
    shortDescription: "The spider plant is an adaptable houseplant with long, arching leaves that are often striped green and white. Mature plants produce hanging stems with small flowers and young plantlets that can be removed and grown as new plants.",
    care: noteUnavailable,
    accent: "lime",
  },
  {
    id: "zz-plant",
    name: "ZZ Plant",
    slug: "zz-plant",
    image: "/images/plants/zzplant.jpg",
    shopUrl: "",
    legacyPaths: ["/zzplant", "/zz-plant"],
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    shortDescription: "The ZZ plant is a durable indoor plant with thick stems, glossy leaves, and underground structures that store water. It is popular because it tolerates lower light, irregular watering, and indoor conditions that may challenge less resilient plants.",
    care: noteUnavailable,
    accent: "emerald",
  },
  {
    id: "chinese-evergreen",
    name: "Chinese Evergreen",
    slug: "chinese-evergreen",
    image: "/images/plants/chineseevergreen.jpg",
    shopUrl: "",
    legacyPaths: ["/chineseevergreen", "/chinese-evergreen"],
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    shortDescription: "Chinese evergreen is a hardy houseplant with broad leaves patterned in shades of green, silver, cream, or red. It is especially popular indoors because it tolerates lower light levels and requires less attention than many tropical plants.",
    care: noteUnavailable,
    accent: "teal",
  },
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    slug: "monstera-deliciosa",
    image: "/images/plants/monsteradelicous.jpg",
    shopUrl: "",
    legacyPaths: ["/monsteradeliciosa", "/monstera-deliciosa"],
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical"],
    summary: "A moderate plant profile from the original Floraseek finder.",
    shortDescription: "Monstera deliciosa is a tropical climbing plant famous for its large leaves that develop natural splits and holes as they mature. It is widely grown indoors for its dramatic foliage and can become very large when given support.",
    care: noteUnavailable,
    accent: "forest",
  },
  {
    id: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    slug: "fiddle-leaf-fig",
    image: "/images/plants/fiddle leaf fig.jpg",
    shopUrl: "",
    legacyPaths: ["/fiddleleaffig", "/fiddle-leaf-fig"],
    difficulty: "hard",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "A harder plant profile from the original Floraseek finder.",
    shortDescription: "The fiddle leaf fig is a popular indoor tree with large, glossy leaves shaped somewhat like violins. It is often used as a decorative feature plant, although it can be sensitive to changes in light, temperature, and watering.",
    care: noteUnavailable,
    accent: "olive",
  },
  {
    id: "orchid",
    name: "Orchid",
    slug: "orchid",
    image: "/images/plants/orchid.jpg",
    shopUrl: "",
    legacyPaths: ["/orchid"],
    difficulty: "hard",
    type: "flower",
    climates: ["tropical", "subtropical"],
    summary: "A harder flower profile from the original Floraseek finder.",
    shortDescription: "Orchids are flowering plants admired for their detailed, long-lasting blooms and wide variety of colours and shapes. Many commonly grown orchids prefer bright indirect light, airflow, and a specialised growing medium rather than ordinary garden soil.",
    care: noteUnavailable,
    accent: "orchid",
  },
  {
    id: "pitcher-plant",
    name: "Pitcher Plant",
    slug: "pitcher-plant",
    image: "/images/plants/pitcherplant.jpg",
    shopUrl: "",
    legacyPaths: ["/pitcherplant", "/pitcher-plant"],
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "A moderate plant profile from the original Floraseek finder.",
    shortDescription: "Pitcher plants are carnivorous plants with specialised leaves shaped like containers filled with digestive liquid. Insects are attracted inside, become trapped, and provide nutrients that help the plant survive in nutrient-poor soil.",
    care: noteUnavailable,
    accent: "moss",
  },
  {
    id: "welwitschia",
    name: "Welwitschia",
    slug: "welwitschia",
    image: "/images/plants/welwitchia.jpeg",
    shopUrl: "",
    legacyPaths: ["/welwitschia"],
    difficulty: "extreme",
    type: "plant",
    climates: ["desert"],
    summary: "An extreme plant profile from the original Floraseek finder.",
    shortDescription: "Welwitschia is an unusual desert plant native to parts of southern Africa and grows only two main leaves throughout its life. These leaves continue growing for many years, becoming split and twisted by harsh desert conditions.",
    care: noteUnavailable,
    accent: "sand",
  },
  {
    id: "corpse-flower",
    name: "Corpse Flower",
    slug: "corpse-flower",
    image: "/images/plants/corsepeflower.jpg",
    shopUrl: "",
    legacyPaths: ["/corpseflower", "/corpse-flower"],
    difficulty: "easy",
    type: "flower",
    climates: ["tropical"],
    summary: "A tropical flower profile from the original Floraseek finder.",
    shortDescription: "The corpse flower is a rare tropical plant famous for producing one of the largest flowering structures in the world. When blooming, it releases a powerful smell resembling rotting material to attract insects that help with pollination.",
    care: noteUnavailable,
    accent: "plum",
  },
  {
    id: "pothos",
    name: "Pothos",
    slug: "pothos",
    image: "/images/plants/pothos.jpg",
    shopUrl: "",
    legacyPaths: ["/pothos"],
    difficulty: "easy",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    shortDescription: "Pothos is a fast-growing trailing houseplant with heart-shaped leaves that may be green, yellow, white, or patterned. It is popular with beginners because it adapts to different indoor conditions and can grow in hanging pots or climb supports.",
    care: noteUnavailable,
    accent: "lime",
  },
  {
    id: "anthurium",
    name: "Anthurium",
    slug: "anthurium",
    image: "/images/plants/anthurium.jpg",
    shopUrl: "",
    legacyPaths: ["/anthurium"],
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "A moderate plant profile from the original Floraseek finder.",
    shortDescription: "Anthurium is a tropical houseplant with glossy green leaves and colourful, heart-shaped structures surrounding its flowers. It is popular indoors because of its distinctive appearance and ability to flower for long periods in warm, humid conditions.",
    care: noteUnavailable,
    accent: "red",
  },
  {
    id: "kalanchoe",
    name: "Kalanchoe",
    slug: "kalanchoe",
    image: "/images/plants/kalanchoe.jpg",
    shopUrl: "",
    legacyPaths: ["/kalanchoe"],
    difficulty: "easy",
    type: "flower",
    climates: ["desert", "subtropical"],
    summary: "An easy flower profile from the original Floraseek finder.",
    shortDescription: "Kalanchoe is a compact succulent with thick leaves and clusters of small, brightly coloured flowers. It is commonly grown as an indoor flowering plant because it requires limited watering and can produce blooms that last for several weeks.",
    care: noteUnavailable,
    accent: "coral",
  },
  {
    id: "jade-plant",
    name: "Jade Plant",
    slug: "jade-plant",
    image: "/images/plants/jadeplant.jpg",
    shopUrl: "",
    legacyPaths: ["/jadeplant", "/jade-plant"],
    difficulty: "easy",
    type: "plant",
    climates: ["desert", "subtropical"],
    summary: "An easy plant profile from the original Floraseek finder.",
    shortDescription: "The jade plant is a slow-growing succulent with thick, rounded leaves and woody stems that can develop a miniature tree-like form. It is popular indoors because it stores water efficiently and can live for many years with proper care.",
    care: noteUnavailable,
    accent: "jade",
  },
  {
    id: "croton",
    name: "Croton",
    slug: "croton",
    image: "/images/plants/croton.jpg",
    shopUrl: "",
    legacyPaths: ["/croton"],
    difficulty: "moderate",
    type: "plant",
    climates: ["tropical", "subtropical"],
    summary: "A moderate plant profile from the original Floraseek finder.",
    shortDescription: "Croton is a tropical foliage plant known for its thick leaves marked with bright combinations of green, yellow, orange, red, and purple. It is grown mainly for its bold colours and becomes most vibrant when given strong light.",
    care: noteUnavailable,
    accent: "amber",
  },
  {
    id: "bonsai",
    name: "Bonsai",
    slug: "bonsai",
    image: "/images/plants/bonsai.jpg",
    shopUrl: "",
    legacyPaths: ["/bonsai"],
    difficulty: "hard",
    type: "plant",
    climates: ["temperate", "subtropical"],
    summary: "A hard plant profile from the original Floraseek finder data.",
    shortDescription: "Bonsai is the technique of carefully training trees and shrubs to grow in miniature forms. Growers use pruning, wiring, root trimming, and controlled containers to shape the plant while maintaining the appearance of a full-sized mature tree.",
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

export function normalizeSearchQuery(query) {
  return String(query || "").trim().toLowerCase();
}

export function getPlantSearchText(plant) {
  return [
    plant.name,
    plant.summary,
    plant.shortDescription,
    plant.type,
    labelFor("type", plant.type),
    plant.difficulty,
    labelFor("difficulty", plant.difficulty),
    ...plant.climates,
    ...plant.climates.map((climate) => labelFor("climate", climate)),
  ].join(" ").toLowerCase();
}

export function searchPlants(query, sourcePlants = plants) {
  const normalizedQuery = normalizeSearchQuery(query);

  if (!normalizedQuery) {
    return sourcePlants;
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return sourcePlants.filter((plant) => {
    const searchableText = getPlantSearchText(plant);
    return terms.every((term) => searchableText.includes(term));
  });
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
  "Plant images live in public/images/plants. If a plant-specific image is missing, Floraseek falls back to public/images/plants/placeholder.png.";
