import { ALL_VALUE, filterOptions, labelFor, plants } from "../data/plants.js";

export const quizQuestions = [
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
    id: "difficulty",
    title: "How difficult should your plant be to grow and keep alive?",
    fallbackValue: ALL_VALUE,
    options: [
      { label: "Easy", value: "easy" },
      { label: "Moderate", value: "moderate" },
      { label: "Hard", value: "hard" },
    ],
  },
];

export function getResolvedQuizAnswers(answers) {
  return quizQuestions.reduce((resolvedAnswers, question) => ({
    ...resolvedAnswers,
    [question.id]: answers[question.id] || question.fallbackValue,
  }), {});
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
