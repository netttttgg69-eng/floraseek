import { Heart } from "lucide-react";
import { useEffect, useMemo } from "react";
import PlantCard from "../components/PlantCard.jsx";
import useSavedPlants from "../hooks/useSavedPlants.js";
import { plants } from "../data/plants.js";
import { setPageMeta } from "../utils/meta.js";

export default function SavedPlantsPage() {
  const { savedPlantIds } = useSavedPlants();
  const savedPlants = useMemo(() => (
    plants.filter((plant) => savedPlantIds.includes(plant.id))
  ), [savedPlantIds]);

  useEffect(() => {
    setPageMeta(
      "Saved Plants",
      "View the Floraseek plant profiles you have saved in this browser."
    );
  }, []);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <Heart size={16} aria-hidden="true" />
            Saved Plants
          </p>
          <h1>Saved Plants</h1>
          <p>
            Keep a short list of plants you want to revisit. Saved plants stay in this browser and
            do not require an account.
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
            <h2>No saved plants yet</h2>
            <p>Use the heart controls on plant cards or plant pages to build your saved list.</p>
          </div>
        )}
      </div>
    </section>
  );
}
