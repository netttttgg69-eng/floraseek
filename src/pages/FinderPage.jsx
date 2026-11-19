import { useLanguage } from "../i18n/context.js";
import { Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ClimateFinder from "../components/ClimateFinder.jsx";
import EmptyState from "../components/EmptyState.jsx";
import FilterSelect from "../components/FilterSelect.jsx";
import PlantCard from "../components/PlantCard.jsx";
import PlantSearch from "../components/PlantSearch.jsx";
import RandomPlantButton from "../components/RandomPlantButton.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { ALL_VALUE, filterOptions, filterPlants, plants, searchPlants } from "../data/plants.js";

const initialFilters = {
  difficulty: ALL_VALUE,
  climate: ALL_VALUE,
  category: ALL_VALUE,
};

export default function FinderPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlants = useMemo(() => filterPlants(filters), [filters]);
  const results = useMemo(() => searchPlants(searchQuery, filteredPlants, t), [filteredPlants, searchQuery, t]);

  useEffect(() => {
    if (searchParams.has("type")) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("type");
      setSearchParams(nextParams, { replace: true });
      return;
    }

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
  }, [searchParams, setSearchParams]);

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
          <h1>{t("Plant Finder")}</h1>
          <p>
            {t("Browse the catalogue by growing difficulty, climate and plant category.")}
          </p>
          <div className="page-heading-actions">
            <Link className="button primary" to="/find-my-plant">
              {t("Take the Plant Quiz")}
              <Sparkles size={18} aria-hidden="true" />
            </Link>
            <RandomPlantButton />
          </div>
        </div>

        <div className="finder-panel" role="group" aria-label={t("Plant filters")}>
          <PlantSearch
            label={t("Search")}
            placeholder={t("Search by name, category, climate")}
            value={searchQuery}
            variant="finder"
            onChange={setSearchQuery}
          />
          <FilterSelect
            id="difficulty"
            label={t("Difficulty")}
            value={filters.difficulty}
            options={filterOptions.difficulty}
            onChange={(value) => updateFilter("difficulty", value)}
          />
          <FilterSelect
            id="climate"
            label={t("Climate")}
            value={filters.climate}
            options={filterOptions.climate}
            onChange={(value) => updateFilter("climate", value)}
          />
          <FilterSelect
            id="category"
            label={t("Category")}
            value={filters.category}
            options={filterOptions.category}
            onChange={(value) => updateFilter("category", value)}
          />
          <button className="button secondary reset-button" type="button" onClick={resetFilters}>
            {t("Reset")}
          </button>
        </div>

        <details className="finder-climate" open={typeof window !== "undefined" && window.location.hash === "#climate-finder" || undefined}>
          <summary>{t("Find your climate by city")}</summary>
          <ClimateFinder onApplyClimate={(climate) => updateFilter("climate", climate)} />
        </details>

        <div className="results-header" aria-live="polite">
          <SectionHeader title={results.length === 1 ? t("1 matching plant") : t("{length} matching plants", { length: results.length })}>{t("Showing {resultsCount} of {plantsCount} total Floraseek profiles.", { resultsCount: results.length, plantsCount: plants.length })}</SectionHeader>
        </div>

        {results.length > 0 ? (
          <div className="card-grid finder-card-grid">
            {results.map((plant) => (
              <PlantCard key={plant.id} plant={plant} variant="finder" />
            ))}
          </div>
        ) : (
          <EmptyState
            title={t("No plants match that search")}
            message={t("Try a different search term, choose All in one category, or reset the finder to see every Floraseek plant.")}
            onReset={resetFilters}
          />
        )}
      </div>
    </section>
  );
}
