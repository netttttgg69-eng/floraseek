import { useLanguage } from "../i18n/context.js";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { labelFor } from "../data/plants.js";
import { estimateClimateForLocation, formatLocationName, searchCities } from "../utils/openMeteo.js";

export default function ClimateFinder({ onApplyClimate }) {
  const { t, locale } = useLanguage();
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedLocation = useMemo(() => (
    locations.find((location) => String(location.id) === selectedLocationId) || locations[0]
  ), [locations, selectedLocationId]);

  async function estimateForLocation(location) {
    setIsLoading(true);
    setError("");

    try {
      setResult(await estimateClimateForLocation(location));
    } catch (climateError) {
      setResult(null);
      setError(climateError.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(null);
    setLocations([]);

    try {
      const matches = await searchCities(city, locale);

      if (!matches.length) {
        throw new Error("No matching cities were found. Try a nearby larger city.");
      }

      setLocations(matches);
      setSelectedLocationId(String(matches[0].id));

      if (matches.length === 1) {
        await estimateForLocation(matches[0]);
      }
    } catch (searchError) {
      setError(searchError.message);
    } finally {
      setIsLoading(false);
    }
  }

  function applyClimate() {
    if (!result?.climate) {
      return;
    }

    if (onApplyClimate) {
      onApplyClimate(result.climate);
    } else {
      navigate(`/finder?climate=${result.climate}`);
    }
  }

  return (
    <div className="climate-tool" id="climate-finder">
      <div>
        <h2>{t("Find your climate")}</h2>
        <p>
          {t("Search for a city to estimate a broad Floraseek climate category using historical temperature and precipitation patterns.")}
        </p>
      </div>

      <form className="climate-search" onSubmit={handleSearch}>
        <label>
          <span>{t("City search")}</span>
          <input
            type="search"
            value={city}
            placeholder={t("Enter a city")}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <button className="button primary" type="submit" disabled={isLoading}>
          {isLoading ? t("Searching...") : t("Search")}
          <Search size={17} aria-hidden="true" />
        </button>
      </form>

      {locations.length > 1 && !result && (
        <div className="location-picker">
          <label>
            <span>{t("Select a location")}</span>
            <select
              value={selectedLocationId}
              onChange={(event) => setSelectedLocationId(event.target.value)}
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {formatLocationName(location)}
                </option>
              ))}
            </select>
          </label>
          <button
            className="button secondary"
            type="button"
            disabled={isLoading || !selectedLocation}
            onClick={() => estimateForLocation(selectedLocation)}
          >
            {t("Use this location")}
          </button>
        </div>
      )}

      {error && <p className="climate-error">{t(error)}</p>}

      {result && (
        <div className="climate-result" aria-live="polite">
          <span>{result.locationName}</span>
          <strong>{t("Suggested climate: {climate}", { climate: t(labelFor("climate", result.climate)) })}</strong>
          <p>
            {t("This is an estimate based on broad historical climate conditions. You can still change the climate filter manually afterward.")}
          </p>
          <button className="button secondary" type="button" onClick={applyClimate}>
            {t("Apply climate to Plant Finder")}
          </button>
        </div>
      )}

      <p className="climate-attribution">
        {t("Geocoding and historical climate data provided by Open-Meteo.")}
      </p>
    </div>
  );
}
