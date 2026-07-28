import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ClimateFinder from "../components/ClimateFinder.jsx";
import EmptyState from "../components/EmptyState.jsx";
import FilterSelect from "../components/FilterSelect.jsx";
import PlantCard from "../components/PlantCard.jsx";
import PlantSearch from "../components/PlantSearch.jsx";
import RandomPlantButton from "../components/RandomPlantButton.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { ALL_VALUE, filterOptions, filterPlants, plants, searchPlants } from "../data/plants.js";
import { setPageMeta } from "../utils/meta.js";

const initialFilters = {
  difficulty: ALL_VALUE,
  climate: ALL_VALUE,
  type: ALL_VALUE,
  category: ALL_VALUE,
};

export default function FinderPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlants = useMemo(() => filterPlants(filters), [filters]);
  const results = useMemo(() => searchPlants(searchQuery, filteredPlants), [filteredPlants, searchQuery]);

  useEffect(() => {
    setPageMeta(
      "Plant Finder",
      "Filter Floraseek plants by difficulty, climate, and type."
    );
  }, []);

  useEffect(() => {
    const urlFilters = Object.keys(initialFilters).reduce((nextFilters, key) => {
      const value = searchParams.get(key);
      const isValidValue = filterOptions[key].some((option) => option.value === value);

      return {
        ...nextFilters,
        [key]: isValidValue && value !== ALL_VALUE ? value : ALL_VALUE,
      };
    }, initialFilters);

    setFilters((current) => {
      const filtersChanged = Object.keys(initialFilters).some((key) => current[key] !== urlFilters[key]);
      return filtersChanged ? urlFilters : current;
    });
  }, [searchParams]);

  function updateFilter(key, value) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));

    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (value && value !== ALL_VALUE) {
        nextParams.set(key, value);
      } else {
        nextParams.delete(key);
      }

      return nextParams;
    });
  }

  function resetFilters() {
    setFilters(initialFilters);
    setSearchQuery("");
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      Object.keys(initialFilters).forEach((key) => {
        nextParams.delete(key);
      });

      return nextParams;
    });
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
            Combine difficulty, climate, category, and type to narrow the project catalogue without
            refreshing the page.
          </p>
          <div className="page-heading-actions">
            <RandomPlantButton />
          </div>
        </div>

        <form className="finder-panel" onSubmit={(event) => event.preventDefault()}>
          <PlantSearch
            label="Search"
            placeholder="Search by name, category, climate, type"
            value={searchQuery}
            variant="finder"
            onChange={setSearchQuery}
          />
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
            id="category"
            label="Category"
            value={filters.category}
            options={filterOptions.category}
            onChange={(value) => updateFilter("category", value)}
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

        <ClimateFinder onApplyClimate={(climate) => updateFilter("climate", climate)} />

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
          <EmptyState
            title="No plants match that search"
            message="Try a different search term, choose All in one category, or reset the finder to see every Floraseek plant."
            onReset={resetFilters}
          />
        )}
      </div>
    </section>
  );
}
