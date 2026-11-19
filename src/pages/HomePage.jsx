import { useLanguage } from "../i18n/context.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClimateFinder from "../components/ClimateFinder.jsx";
import ExplorePlants from "../components/ExplorePlants.jsx";
import PlantOfWeek from "../components/PlantOfWeek.jsx";

const words = ["Houseplant", "Flower", "Succulent", "Tree", "Herb", "Fern", "Cactus", "Shrub", "Plant"];
const reducedMotion = "(prefers-reduced-motion: reduce)";

function Headline({ playing }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStep((value) => value + 1), 2500);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <h1 className="hero-title" aria-label={t("Find your perfect plant")}>
      {t("Find your perfect")}
      <span className="hero-words" aria-hidden="true" key={step}>
        {step > 0 && <em className="word-out">{t(words[(step - 1) % words.length])}</em>}
        <em className={step ? "word-in" : ""}>{t(words[step % words.length])}</em>
      </span>
    </h1>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia(reducedMotion).matches);
  const [paused, setPaused] = useState(false);
  const playing = !paused && !reduced;

  useEffect(() => {

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
          <p>{t("Explore, compare and learn about plants for your home, garden and lifestyle.")}</p>
          <div className="hero-actions">
            <Link className="button primary" to="/find-my-plant">{t("Find My Plant")}</Link>
            <Link className="button secondary" to="/finder">{t("Browse Plants")}</Link>
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
        <h2 className="section-title">{t("Plant of the Week")}</h2>
        <PlantOfWeek />
      </section>
      <section className="section container climate-section">
        <ClimateFinder />
      </section>
    </div>
  );
}
