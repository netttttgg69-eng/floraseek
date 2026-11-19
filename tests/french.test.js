import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { plants, searchPlants, filterOptions } from "../src/data/plants.js";
import { blogPosts, blogCategories } from "../src/data/blogPosts.js";
import { quizQuestions } from "../src/utils/plantQuiz.js";
import { languages, initialLanguage, localizedPath, splitLanguage } from "../src/i18n/languages.js";

const read = section => JSON.parse(readFileSync(new URL("../src/i18n/catalogs/fr/" + section + ".json", import.meta.url)));
const names = read("names"), profiles = read("profiles"), ui = read("interface"), journal = read("journal");

function has(catalog, key) {
  if (typeof key === "string" && /\p{L}/u.test(key))
    assert.ok(catalog[key.trim()]?.trim(), "Missing French translation: " + key);
}

test("published languages and URL priority are independent of the saved preference", () => {
  assert.deepEqual(languages.map(lang => lang.code), ["en", "fr"]);
  assert.equal(initialLanguage("/fr/finder", "en", ["es"]), "fr");
  assert.equal(initialLanguage("/finder", "en", ["fr-FR"]), "en");
  assert.equal(initialLanguage("/", "es", ["fr-CA"]), "fr");
  assert.equal(initialLanguage("/", null, ["es", "zh-TW"]), "en");
  for (const path of ["/", "/plants/sunflower", "/blog"]) {
    for (const { code } of languages) assert.deepEqual(splitLanguage(localizedPath(code, path)), { locale: code, path });
  }
});

test("every French profile, instruction, step note and reference label is available", () => {
  for (const plant of plants) {
    has(names, plant.name);
    has(profiles, plant.summary);
    has(profiles, plant.shortDescription);
    const guide = read("guide-" + plant.id);
    for (const step of [...plant.growingGuide.planting, ...plant.growingGuide.care]) {
      for (const key of [step.title, step.instruction, step.note]) has(guide, key);
    }
    for (const ref of plant.growingGuide.references) {
      if (!ref.title.startsWith("NC State Extension · ")) has(ui, ref.title);
    }
  }
});

test("French covers article bodies, link text, quiz options, filters and metadata", () => {
  const catalog = { ...journal, ...names, ...ui };
  for (const post of blogPosts) {
    for (const key of [post.title, post.description, post.coverImageAlt, post.category, ...post.topics]) has(catalog, key);
    for (const block of post.content) {
      for (const key of [block.title, block.text, block.alt, block.caption, block.label, ...(block.items || [])]) has(catalog, key);
      for (const child of block.children || []) has(catalog, typeof child === "string" ? child : child.text);
    }
  }
  for (const key of blogCategories) has(ui, key);
  for (const q of quizQuestions) {
    has(ui, q.title);
    q.options.forEach(option => has(ui, option.label));
  }
  for (const options of Object.values(filterOptions)) options.forEach(option => has(ui, option.label));
  const pages = JSON.parse(readFileSync(new URL("../src/i18n/pages.json", import.meta.url)));
  for (const [title, description] of Object.values(pages)) { has(ui, title); has(ui, description); }
  for (const [key, value] of Object.entries(ui)) {
    const slots = text => [...text.matchAll(/\{\w+\}/g)].map(match => match[0]).sort();
    assert.deepEqual(slots(value), slots(key), key);
  }
});

test("French search supports unaccented names, English names and botanical synonyms", () => {
  const translate = key => names[key] ?? profiles[key] ?? ui[key] ?? key;
  for (const [query, id] of [["nenuphar", "water-lily"], ["Nénuphar", "water-lily"], ["water lily", "water-lily"],
    ["Nymphaea", "water-lily"], ["Sansevieria trifasciata", "snake-plant"], ["Amorphophallus titanum", "corpse-flower"]]) {
    assert.ok(searchPlants(query, plants, translate).some(plant => plant.id === id), query);
  }
});
