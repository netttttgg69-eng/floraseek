import assert from "node:assert/strict";
import test from "node:test";
import { growingGuides } from "../src/data/guides/index.js";
import { plants } from "../src/data/plants.js";

test("every catalogue profile has its own complete, referenced growing guide", () => {
  assert.deepEqual(Object.keys(growingGuides).sort(), plants.map(({ id }) => id).sort());

  for (const { id, growingGuide } of plants) {
    assert.equal(growingGuide, growingGuides[id]);
    for (const section of ["planting", "care"]) {
      const steps = growingGuide[section];
      assert.ok(Array.isArray(steps) && steps.length > 0, id + " lacks " + section);
      const titles = new Set();
      for (const { title, instruction, note } of steps) {
        assert.ok(typeof title === "string" && title.trim(), id + " has an untitled step");
        assert.ok(!titles.has(title), id + " repeats a step title in " + section);
        titles.add(title);
        assert.ok(typeof instruction === "string" && instruction.trim(), id + " lacks an instruction");
        if (note !== undefined) assert.ok(typeof note === "string" && note.trim());
      }
    }

    assert.ok(growingGuide.references.length, id + " lacks a reference");
    for (const { title, url } of growingGuide.references) {
      assert.ok(title.trim());
      assert.equal(new URL(url).protocol, "https:", id + " has an invalid source URL");
    }
  }
});
