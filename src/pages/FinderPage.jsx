import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import FilterSelect from "../components/FilterSelect.jsx";
import PlantCard from "../components/PlantCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { ALL_VALUE, filterOptions, filterPlants, plants } from "../data/plants.js";
import { setPageMeta } from "../utils/meta.js";

const initialFilters = {
  difficulty: ALL_VALUE,
  climate: ALL_VALUE,
  type: ALL_VALUE,
};

export default function FinderPage() {
  const [filters, setFilters] = useState(initialFilters);

  const results = useMemo(() => filterPlants(filters), [filters]);

  useEffect(() => {
    setPageMeta(
      "Plant Finder",
      "Filter Floraseek plants by difficulty, climate, and type."
    );
  }, []);

  function updateFilter(key, value) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <SlidersHorizontal size={16} aria-hidden="true" />
            Plant Finder
          </p>
          <h1>Filter every Floraseek plant.</h1>
          <p>
            Combine difficulty, climate, and type to narrow the project catalogue without refreshing
            the page.
          </p>
        </div>

        <form className="finder-panel" onSubmit={(event) => event.preventDefault()}>
          <FilterSelect
            id="difficulty"
            label="Difficulty"
            value={filters.difficulty}
            options={filterOptions.difficulty}
            onChange={(value) => updateFilter("difficulty", value)}
          />
          <FilterSelect
            id="climate"
            label="Climate"
            value={filters.climate}
            options={filterOptions.climate}
            onChange={(value) => updateFilter("climate", value)}
          />
          <FilterSelect
            id="type"
            label="Plant type"
            value={filters.type}
            options={filterOptions.type}
            onChange={(value) => updateFilter("type", value)}
          />
          <button className="button secondary reset-button" type="button" onClick={resetFilters}>
            Reset
          </button>
        </form>

        <div className="results-header" aria-live="polite">
          <SectionHeader title={results.length === 1 ? "1 matching plant" : `${results.length} matching plants`}>
            Showing {results.length} of {plants.length} total Floraseek profiles.
          </SectionHeader>
        </div>

        {results.length > 0 ? (
          <div className="card-grid">
            {results.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <EmptyState onReset={resetFilters} />
        )}
      </div>
    </section>
  );
}
