import { useLanguage } from "../i18n/context.js";
import { ArrowRight, GitCompareArrows, Trash2, X } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge.jsx";
import PlantImage from "../components/PlantImage.jsx";
import useComparison from "../hooks/useComparison.js";
import { formatList, labelFor, plants } from "../data/plants.js";
import { getComparisonRows } from "../utils/comparison.js";

export default function ComparePage() {
  const { t } = useLanguage();
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
    getComparisonRows(selectedPlants, { formatList: (values, category) => formatList(values, category, t), labelFor })
  ), [selectedPlants, t]);

  return (
    <section className="page-section compare-page">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <GitCompareArrows size={16} aria-hidden="true" />
            {t("Plant Comparison")}
          </p>
          <h1>{t("Compare your shortlist.")}</h1>
          <p>
            {t("Review plant characteristics side by side. Highlighted rows show where your plants differ.")}
          </p>
          <div className="page-heading-actions">
            <Link className="button secondary" to="/finder">
              {t("Back to Plant Finder")}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            {selectedPlants.length > 0 && (
              <button className="button secondary" type="button" onClick={clearComparison}>
                {t("Clear all")}
                <Trash2 size={17} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {selectedPlants.length === 0 ? (
          <div className="empty-state">
            <GitCompareArrows size={42} aria-hidden="true" />
            <h2>{t("No plants selected yet")}</h2>
            <p>
              {t("Use Compare on plant cards or profile pages to build a side-by-side shortlist.")}
            </p>
            <Link className="button primary" to="/finder">
              {t("Open Plant Finder")}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <>
            <div className="comparison-summary" aria-live="polite">
              <strong>{t("{selectedPlantsCount} selected", { selectedPlantsCount: selectedPlants.length })}</strong>
              <Link className="text-link" to="/finder">
                {t("Add another plant")}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="comparison-scroller" role="region" tabIndex={0} aria-label={t("Selected plant comparison")}>
              <table className="comparison-table">
                <caption className="sr-only">{t("Selected plants and their characteristics")}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t("Characteristic")}</th>
                    {selectedPlants.map((plant) => (
                      <th scope="col" key={plant.id}>
                        <div className="comparison-plant-header">
                          <PlantImage plant={plant} />
                          <button className="icon-button comparison-remove" type="button"
                            aria-label={t("Remove {name} from comparison", { name: t(plant.name) })}
                            onClick={() => removeFromComparison(plant.id)}>
                            <X size={17} aria-hidden="true" />
                          </button>
                          <Badge category="category" value={plant.category} />
                          <Link to={`/plants/${plant.slug}`}>{t(plant.name)}</Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.key} className={row.isDifferent ? "different" : ""}>
                      <th scope="row">{t(row.label)}</th>
                      {row.values.map((value, index) => <td key={selectedPlants[index].id}>{t(value)}</td>)}
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
