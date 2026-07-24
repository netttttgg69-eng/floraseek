import { Shuffle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { plants } from "../data/plants.js";

export default function RandomPlantButton({ className = "button secondary" }) {
  const navigate = useNavigate();

  function openRandomPlant() {
    const plant = plants[Math.floor(Math.random() * plants.length)];

    if (plant?.slug) {
      navigate(`/plants/${plant.slug}`);
    }
  }

  return (
    <button className={className} type="button" onClick={openRandomPlant}>
      Discover a random plant
      <Shuffle size={18} aria-hidden="true" />
    </button>
  );
}
