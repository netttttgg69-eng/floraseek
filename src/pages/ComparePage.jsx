import { ArrowRight, GitCompareArrows, Trash2, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge.jsx";
import PlantImage from "../components/PlantImage.jsx";
import useComparison from "../hooks/useComparison.js";
import { formatList, labelFor, plants } from "../data/plants.js";
import { getComparisonRows } from "../utils/comparison.js";
import { setPageMeta } from "../utils/meta.js";

export default function ComparePage() {
  const {
    clearComparison,
    comparisonPlantIds,
    removeFromComparison,
  } = useComparison();

  const selectedPlants = useMemo(() => (
    comparisonPlantIds
      .map((plantId) => plants.find((plant) => plant.id === plantId))
      .filter(Boolean)
  ), [comparisonPlantIds]);

  const comparisonRows = useMemo(() => (
    getComparisonRows(selectedPlants, { formatList, labelFor })
  ), [selectedPlants]);

  useEffect(() => {
    setPageMeta(
      "Plant Comparison",
      "Compare Floraseek plants by description, difficulty, climate, type, and category."
    );
  }, []);

  return (
    <section className="page-section compare-page">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <GitCompareArrows size={16} aria-hidden="true" />
            Plant Comparison
          </p>
          <h1>Compare your shortlist.</h1>
          <p>
            Review plant characteristics side by side. Highlighted rows show where your plants differ.
          </p>
          <div className="page-heading-actions">
            <Link className="button secondary" to="/finder">
              Back to Plant Finder
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            {selectedPlants.length > 0 && (
              <button className="button secondary" type="button" onClick={clearComparison}>
                Clear all
                <Trash2 size={17} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {selectedPlants.length === 0 ? (
          <div className="empty-state">
            <GitCompareArrows size={42} aria-hidden="true" />
            <h2>No plants selected yet</h2>
            <p>
              Use Compare on plant cards or profile pages to build a side-by-side shortlist.
            </p>
            <Link className="button primary" to="/finder">
              Open Plant Finder
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <>
            <div className="comparison-summary" aria-live="polite">
              <strong>
                {selectedPlants.length} selected
              </strong>
              <Link className="text-link" to="/finder">
                Add another plant
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="comparison-scroller" role="region" tabIndex={0} aria-label="Selected plant comparison">
              <table className="comparison-table">
                <caption className="sr-only">Selected plants and their characteristics</caption>
                <thead>
                  <tr>
                    <th scope="col">Characteristic</th>
                    {selectedPlants.map((plant) => (
                      <th scope="col" key={plant.id}>
                        <div className="comparison-plant-header">
                          <PlantImage plant={plant} />
                          <button className="icon-button comparison-remove" type="button"
                            aria-label={`Remove ${plant.name} from comparison`}
                            onClick={() => removeFromComparison(plant.id)}>
                            <X size={17} aria-hidden="true" />
                          </button>
                          <Badge category="category" value={plant.category} />
                          <Link to={`/plants/${plant.slug}`}>{plant.name}</Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.key} className={row.isDifferent ? "different" : ""}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, index) => <td key={selectedPlants[index].id}>{value}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
