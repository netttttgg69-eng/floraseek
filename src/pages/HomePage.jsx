import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClimateFinder from "../components/ClimateFinder.jsx";
import ExplorePlants from "../components/ExplorePlants.jsx";
import PlantOfWeek from "../components/PlantOfWeek.jsx";
import { setPageMeta } from "../utils/meta.js";

const words = ["Houseplant", "Flower", "Succulent", "Tree", "Herb", "Fern", "Cactus", "Shrub", "Plant"];
const reducedMotion = "(prefers-reduced-motion: reduce)";

function Headline({ playing }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStep((value) => value + 1), 2500);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <h1 className="hero-title">
      Find your perfect
      <span className="sr-only"> plant</span>
      <span className="hero-words" aria-hidden="true" key={step}>
        {step > 0 && <em className="word-out">{words[(step - 1) % words.length]}</em>}
        <em className={step ? "word-in" : ""}>{words[step % words.length]}</em>
      </span>
    </h1>
  );
}

export default function HomePage() {
  const [reduced, setReduced] = useState(() => window.matchMedia(reducedMotion).matches);
  const [paused, setPaused] = useState(false);
  const playing = !paused && !reduced;

  useEffect(() => {
    setPageMeta(
      "Plant Finder",
      "Explore Floraseek, a polished plant and flower finder for difficulty, climate, and plant type."
    );
    const query = window.matchMedia(reducedMotion);
    const syncMotion = () => setReduced(query.matches);
    query.addEventListener("change", syncMotion);
    return () => query.removeEventListener("change", syncMotion);
  }, []);

  return (
    <div className="home-page" data-motion={playing ? "playing" : "paused"}>
      <section className="home-hero container">
        <div className="hero-copy">
          <Headline playing={playing} />
          <p>Explore, compare and learn about plants for your home, garden and lifestyle.</p>
          <div className="hero-actions">
            <Link className="button primary" to="/find-my-plant">Find My Plant</Link>
            <Link className="button secondary" to="/finder">Browse Plants</Link>
          </div>
        </div>
        <div className="hero-emblem" aria-hidden="true">
          <div className="leaf-solid">
            {/* Each slice uses the original leaf silhouette to give the rotating edge depth. */}
            {Array.from({ length: 11 }, (_, index) => (
              <span key={index} style={{ "--depth": `${index - 5}px` }} />
            ))}
          </div>
        </div>
      </section>
      <ExplorePlants playing={playing} reduced={reduced} onToggle={() => setPaused((value) => !value)} />
      <section className="section container">
        <h2 className="section-title">Plant of the Week</h2>
        <PlantOfWeek />
      </section>
      <section className="section container climate-section">
        <ClimateFinder />
      </section>
    </div>
  );
}
