import { useLanguage } from "../i18n/context.js";
import { Heart } from "lucide-react";
import { useMemo } from "react";
import PlantCard from "../components/PlantCard.jsx";
import useSavedPlants from "../hooks/useSavedPlants.js";
import { plants } from "../data/plants.js";

export default function SavedPlantsPage() {
  const { t } = useLanguage();
  const { savedPlantIds } = useSavedPlants();
  const savedPlants = useMemo(() => (
    plants.filter((plant) => savedPlantIds.includes(plant.id))
  ), [savedPlantIds]);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <Heart size={16} aria-hidden="true" />
            {t("Saved Plants")}
          </p>
          <h1>{t("Saved Plants")}</h1>
          <p>
            {t("Keep a short list of plants you want to revisit. Saved plants stay in this browser and do not require an account.")}
          </p>
        </div>

        {savedPlants.length > 0 ? (
          <div className="card-grid">
            {savedPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Heart size={42} aria-hidden="true" />
            <h2>{t("No saved plants yet")}</h2>
            <p>{t("Use the heart controls on plant cards or plant pages to build your saved list.")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
