import { ALL_VALUE, filterOptions, labelFor, plants } from "../data/plants.js";

export const quizQuestions = [
  {
    id: "experience",
    title: "What is your gardening experience?",
    fallbackValue: ALL_VALUE,
    options: [
      { label: "Beginner", value: "beginner" },
      { label: "Some experience", value: "some" },
      { label: "Experienced", value: "experienced" },
      { label: "No preference", value: ALL_VALUE },
    ],
  },
  {
    id: "climate",
    title: "Which climate best matches your location?",
    fallbackValue: "not-sure",
    options: [
      { label: "Temperate", value: "temperate" },
      { label: "Tropical", value: "tropical" },
      { label: "Subtropical", value: "subtropical" },
      { label: "Desert", value: "desert" },
      { label: "Continental", value: "continental" },
      { label: "Not sure", value: "not-sure" },
    ],
  },
  {
    id: "category",
    title: "What broad category interests you most?",
    fallbackValue: ALL_VALUE,
    options: filterOptions.category
      .filter((option) => option.value !== ALL_VALUE)
      .concat({ label: "No preference", value: ALL_VALUE }),
  },
  {
    id: "type",
    title: "What type are you looking for?",
    fallbackValue: ALL_VALUE,
    options: [
      { label: "Flower", value: "flower" },
      { label: "Plant", value: "plant" },
      { label: "Technique", value: "technique" },
      { label: "No preference", value: ALL_VALUE },
    ],
  },
  {
    id: "difficulty",
    title: "How challenging should the plant be?",
    fallbackValue: ALL_VALUE,
    options: [
      { label: "Easy", value: "easy" },
      { label: "Moderate", value: "moderate" },
      { label: "Hard", value: "hard" },
      { label: "Extreme", value: "extreme" },
      { label: "No preference", value: ALL_VALUE },
    ],
  },
];

export function getResolvedQuizAnswers(answers) {
  return quizQuestions.reduce((resolvedAnswers, question) => ({
    ...resolvedAnswers,
    [question.id]: answers[question.id] || question.fallbackValue,
  }), {});
}

function scoreExperience(plant, experience) {
  if (experience === "beginner") {
    return plant.difficulty === "easy" ? 1.5 : 0;
  }

  if (experience === "some") {
    if (["easy", "moderate"].includes(plant.difficulty)) {
      return 1.3;
    }

    return plant.difficulty === "hard" ? 0.4 : 0;
  }

  if (experience === "experienced") {
    if (["hard", "extreme"].includes(plant.difficulty)) {
      return 1.3;
    }

    return plant.difficulty === "moderate" ? 0.7 : 0;
  }

  return 0;
}

export function scorePlantForQuiz(plant, answers) {
  const resolvedAnswers = getResolvedQuizAnswers(answers);
  let score = 0;

  if (
    resolvedAnswers.climate !== "not-sure" &&
    plant.climates.includes(resolvedAnswers.climate)
  ) {
    score += 6;
  }

  if (
    resolvedAnswers.category !== ALL_VALUE &&
    plant.category === resolvedAnswers.category
  ) {
    score += 4;
  }

  if (
    resolvedAnswers.difficulty !== ALL_VALUE &&
    plant.difficulty === resolvedAnswers.difficulty
  ) {
    score += 2.5;
  }

  if (resolvedAnswers.type !== ALL_VALUE && plant.type === resolvedAnswers.type) {
    score += 2;
  }

  score += scoreExperience(plant, resolvedAnswers.experience);

  return score;
}

export function getQuizMatchReasons(plant, answers) {
  const resolvedAnswers = getResolvedQuizAnswers(answers);
  const reasons = [];

  if (
    resolvedAnswers.climate !== "not-sure" &&
    plant.climates.includes(resolvedAnswers.climate)
  ) {
    reasons.push(`Matches your ${labelFor("climate", resolvedAnswers.climate).toLowerCase()} climate`);
  }

  if (
    resolvedAnswers.category !== ALL_VALUE &&
    plant.category === resolvedAnswers.category
  ) {
    reasons.push(`Matches your interest in ${plant.category.toLowerCase()}`);
  }

  if (
    resolvedAnswers.difficulty !== ALL_VALUE &&
    plant.difficulty === resolvedAnswers.difficulty
  ) {
    reasons.push(`Fits your ${labelFor("difficulty", plant.difficulty).toLowerCase()} challenge preference`);
  }

  if (resolvedAnswers.type !== ALL_VALUE && plant.type === resolvedAnswers.type) {
    reasons.push(`Matches your ${labelFor("type", plant.type).toLowerCase()} type preference`);
  }

  if (resolvedAnswers.experience === "beginner" && plant.difficulty === "easy") {
    reasons.push("Suitable for beginners");
  } else if (
    resolvedAnswers.experience === "some" &&
    ["easy", "moderate"].includes(plant.difficulty)
  ) {
    reasons.push("Fits some gardening experience");
  } else if (
    resolvedAnswers.experience === "experienced" &&
    ["hard", "extreme"].includes(plant.difficulty)
  ) {
    reasons.push("Offers a more experienced challenge");
  }

  return reasons.length ? reasons.slice(0, 3) : ["A strong match from the Floraseek catalogue"];
}

export function getQuizRecommendations(answers, limit = 3) {
  return plants
    .map((plant, index) => ({
      plant,
      index,
      reasons: getQuizMatchReasons(plant, answers),
      score: scorePlantForQuiz(plant, answers),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit);
}
