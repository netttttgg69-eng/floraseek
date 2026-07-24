import { plants } from "../data/plants.js";

function getWeekNumber(date) {
  const currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = currentDate.getUTCDay() || 7;
  currentDate.setUTCDate(currentDate.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil((((currentDate - yearStart) / 86400000) + 1) / 7);

  return {
    year: currentDate.getUTCFullYear(),
    week: weekNumber,
  };
}

export function getPlantOfWeek(date = new Date()) {
  const { year, week } = getWeekNumber(date);
  const index = Math.abs((year * 53 + week) % plants.length);

  return {
    plant: plants[index],
    week,
    year,
  };
}
