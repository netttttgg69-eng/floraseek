import { MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { labelFor } from "../data/plants.js";
import { estimateClimateForLocation, formatLocationName, searchCities } from "../utils/openMeteo.js";

export default function ClimateFinder({ onApplyClimate }) {
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
      const matches = await searchCities(city);

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
        <p className="eyebrow">
          <MapPin size={16} aria-hidden="true" />
          Find your climate
        </p>
        <h2>Find your climate</h2>
        <p>
          Search for a city to estimate a broad Floraseek climate category using historical
          temperature and precipitation patterns.
        </p>
      </div>

      <form className="climate-search" onSubmit={handleSearch}>
        <label>
          <span>City search</span>
          <input
            type="search"
            value={city}
            placeholder="Enter a city"
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <button className="button primary" type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
          <Search size={17} aria-hidden="true" />
        </button>
      </form>

      {locations.length > 1 && !result && (
        <div className="location-picker">
          <label>
            <span>Select a location</span>
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
            Use this location
          </button>
        </div>
      )}

      {error && <p className="climate-error">{error}</p>}

      {result && (
        <div className="climate-result" aria-live="polite">
          <span>{result.locationName}</span>
          <strong>Suggested climate: {labelFor("climate", result.climate)}</strong>
          <p>
            This is an estimate based on broad historical climate conditions. You can still change
            the climate filter manually afterward.
          </p>
          <button className="button secondary" type="button" onClick={applyClimate}>
            Apply climate to Plant Finder
          </button>
        </div>
      )}

      <p className="climate-attribution">
        Geocoding and historical climate data provided by Open-Meteo.
      </p>
    </div>
  );
}
