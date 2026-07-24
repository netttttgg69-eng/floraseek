import { estimateClimateCategory, summarizeHistoricalClimate } from "./climateMapping.js";

const CLIMATE_CACHE_KEY = "floraseek-climate-results";
const CLIMATE_YEARS = 15;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readCache() {
  if (!canUseStorage()) {
    return {};
  }

  try {
    return JSON.parse(window.localStorage.getItem(CLIMATE_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeCache(cache) {
  if (canUseStorage()) {
    window.localStorage.setItem(CLIMATE_CACHE_KEY, JSON.stringify(cache));
  }
}

function getLocationCacheKey(location) {
  return `${Number(location.latitude).toFixed(3)},${Number(location.longitude).toFixed(3)}`;
}

export function formatLocationName(location) {
  return [
    location.name,
    location.admin1,
    location.country,
  ].filter(Boolean).join(", ");
}

export async function searchCities(city) {
  const query = city.trim();

  if (!query) {
    throw new Error("Enter a city name first.");
  }

  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", query);
  url.searchParams.set("count", "8");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("City search failed. Please try again.");
  }

  const data = await response.json();
  return (data.results || []).map((location) => ({
    id: location.id,
    admin1: location.admin1 || "",
    country: location.country || "",
    latitude: location.latitude,
    longitude: location.longitude,
    name: location.name,
    timezone: location.timezone || "auto",
  }));
}

export async function estimateClimateForLocation(location) {
  const cache = readCache();
  const cacheKey = getLocationCacheKey(location);

  if (cache[cacheKey]) {
    return {
      ...cache[cacheKey],
      cached: true,
    };
  }

  const endYear = new Date().getFullYear() - 1;
  const startYear = Math.max(1940, endYear - CLIMATE_YEARS + 1);
  const url = new URL("https://archive-api.open-meteo.com/v1/archive");
  url.searchParams.set("latitude", location.latitude);
  url.searchParams.set("longitude", location.longitude);
  url.searchParams.set("start_date", `${startYear}-01-01`);
  url.searchParams.set("end_date", `${endYear}-12-31`);
  url.searchParams.set("daily", "temperature_2m_mean,precipitation_sum");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Historical climate lookup failed. Please try another city.");
  }

  const data = await response.json();
  const stats = summarizeHistoricalClimate(data.daily);
  const climate = estimateClimateCategory(stats);
  const result = {
    climate,
    locationName: formatLocationName(location),
    stats,
  };

  writeCache({
    ...cache,
    [cacheKey]: result,
  });

  return result;
}
