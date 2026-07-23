import { Flower2, Sprout } from "lucide-react";
import { useEffect } from "react";
import PlantCard from "../components/PlantCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { plants } from "../data/plants.js";
import { setPageMeta } from "../utils/meta.js";

export default function CategoryPage({ type }) {
  const isFlower = type === "flower";
  const categoryPlants = plants.filter((plant) => plant.type === type);
  const title = isFlower ? "Flowers" : "Plants";
  const Icon = isFlower ? Flower2 : Sprout;

  useEffect(() => {
    setPageMeta(
      title,
      `Browse Floraseek ${title.toLowerCase()} from the original project catalogue.`
    );
  }, [title]);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <Icon size={16} aria-hidden="true" />
            Category
          </p>
          <h1>{title}</h1>
          <p>
            {categoryPlants.length} {title.toLowerCase()} from the Floraseek catalogue, presented
            with consistent cards and profile links.
          </p>
        </div>

        <SectionHeader title={`${title} profiles`}>
          Open any card to view its summary, difficulty, climate, type, and related plants.
        </SectionHeader>

        <div className="card-grid">
          {categoryPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </div>
    </section>
  );
}
