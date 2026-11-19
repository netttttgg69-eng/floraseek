import { useLanguage } from "../i18n/context.js";
import { Flower2, Sprout } from "lucide-react";
import PlantCard from "../components/PlantCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { plants } from "../data/plants.js";

export default function CategoryPage({ type }) {
  const { t } = useLanguage();
  const isFlower = type === "flower";
  const categoryPlants = plants.filter((plant) => plant.type === type);
  const title = isFlower ? "Flowers" : "Plants";
  const Icon = isFlower ? Flower2 : Sprout;

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <Icon size={16} aria-hidden="true" />
            {t("Category")}
          </p>
          <h1>{t(title)}</h1>
          <p>{t("{count} {category} from the Floraseek catalogue, presented with consistent cards and profile links.", { count: categoryPlants.length, category: t(title) })}</p>
        </div>

        <SectionHeader title={t("{title} profiles", { title: t(title) })}>
          {t("Open any card to view its summary, difficulty, climate, type, and related plants.")}
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
