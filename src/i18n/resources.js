import { getPlantBySlug } from "../data/plants.js";

const modules = import.meta.glob("./catalogs/*/*.json", { import: "default" });
const cache = new Map();
const identity = makeTranslator({});
const profileLists = new Set(["/", "/finder", "/saved-plants", "/compare", "/flowers", "/plants", "/find-my-plant"]);

export async function loadLanguage(locale, pathname) {
  if (locale === "en") return identity;
  const path = pathname.replace(/\/+$/, "") || "/";
  const sections = ["interface", "names"];
  const plant = getPlantBySlug(path.replace(/^\/plants\//, ""));
  if (plant || profileLists.has(path)) sections.push("profiles");
  if (plant) sections.push("guide-" + plant.id);
  if (/^\/blog(?:\/|$)/.test(path)) sections.push("journal");
  const key = [locale, ...sections].join("/");
  if (!cache.has(key)) {
    const pending = Promise.all(sections.map(section => modules[`./catalogs/${locale}/${section}.json`]?.()));
    cache.set(key, pending.then(parts => makeTranslator(Object.assign({}, ...parts))).catch(error => {
      cache.delete(key);
      throw error;
    }));
  }
  return cache.get(key);
}

function makeTranslator(messages) {
  return function translate(value, variables) {
    if (typeof value !== "string") return value;
    const key = value.trim();
    const template = Object.hasOwn(messages, key) ? messages[key] : key;
    const result = variables ? template.replace(/\{(\w+)\}/g, (token, name) => variables[name] ?? token) : template;
    return value.replace(/\S[\s\S]*\S|\S/, () => result);
  };
}
