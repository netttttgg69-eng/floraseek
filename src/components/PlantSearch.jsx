import { useLanguage } from "../i18n/context.js";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPlants } from "../data/plants.js";

export default function PlantSearch({
  className = "",
  label = "Search plants",
  onChange,
  onEscape,
  onSelect,
  placeholder = "Search plants",
  value,
  variant = "nav",
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [internalValue, setInternalValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const query = value ?? internalValue;
  const trimmedQuery = query.trim();

  const results = useMemo(() => (
    trimmedQuery ? searchPlants(trimmedQuery, undefined, t).slice(0, 6) : []
  ), [trimmedQuery, t]);

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
    onSelect?.(plant);
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
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <label>
        <span>{t(label)}</span>
        <div className="search-field">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            value={query}
            placeholder={t(placeholder)}
            onChange={(event) => updateQuery(event.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setIsOpen(false);
                onEscape?.();
              }
            }}
          />
        </div>
      </label>

      {isOpen && trimmedQuery && (
        <div className="search-results" aria-live="polite">
          {results.length > 0 ? (
            results.map((plant) => (
              <button
                key={plant.id}
                type="button"
                aria-label={t("Open {name}", { name: t(plant.name) })}
                onMouseDown={(event) => {
                  event.preventDefault();
                  openPlant(plant);
                }}
                onClick={() => openPlant(plant)}
              >
                <span className="search-result-name">{t(plant.name)}</span>
              </button>
            ))
          ) : (
            <p>{t("No plants found for \"{trimmedQuery}\".", { trimmedQuery })}</p>
          )}
        </div>
      )}
    </form>
  );
}
