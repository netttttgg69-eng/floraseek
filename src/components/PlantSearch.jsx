import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPlants } from "../data/plants.js";

export default function PlantSearch({
  className = "",
  label = "Search plants",
  onChange,
  placeholder = "Search plants",
  value,
  variant = "nav",
}) {
  const navigate = useNavigate();
  const [internalValue, setInternalValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const query = value ?? internalValue;
  const trimmedQuery = query.trim();

  const results = useMemo(() => (
    trimmedQuery ? searchPlants(trimmedQuery).slice(0, 6) : []
  ), [trimmedQuery]);

  function updateQuery(nextValue) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
    setIsOpen(true);
  }

  function openPlant(plant) {
    updateQuery("");
    setIsOpen(false);
    navigate(`/plants/${plant.slug}`);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (results[0]) {
      openPlant(results[0]);
    }
  }

  return (
    <form
      className={`plant-search plant-search-${variant} ${className}`.trim()}
      role="search"
      onSubmit={handleSubmit}
    >
      <label>
        <span>{label}</span>
        <div className="search-field">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            value={query}
            placeholder={placeholder}
            onBlur={() => {
              window.setTimeout(() => setIsOpen(false), 120);
            }}
            onChange={(event) => updateQuery(event.target.value)}
            onFocus={() => setIsOpen(true)}
          />
        </div>
      </label>

      {isOpen && trimmedQuery && (
        <div className="search-results" aria-live="polite">
          {results.length > 0 ? (
            results.map((plant) => (
              <button key={plant.id} type="button" onClick={() => openPlant(plant)}>
                <strong>{plant.name}</strong>
                <span>{plant.summary}</span>
              </button>
            ))
          ) : (
            <p>No plants found for "{trimmedQuery}".</p>
          )}
        </div>
      )}
    </form>
  );
}
