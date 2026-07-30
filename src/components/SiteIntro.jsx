import { Sprout } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { plants } from "../data/plants.js";

const INTRO_STORAGE_KEY = "floraseekIntroShown";
const INTRO_DURATION_MS = 2700;
const REDUCED_MOTION_DURATION_MS = 500;
const mobileIntroQuery = "(max-width: 680px)";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const fallbackPlantImage = "/images/plants/placeholder.png";
let introFallbackShown = false;
const desktopIntroPlantIds = [
  "sunflower",
  "monstera-deliciosa",
  "cactus",
  "strawberry-plant",
  "venus-flytrap",
];
const mobileIntroPlantIds = ["sunflower", "monstera-deliciosa", "cactus"];
const cardPositions = [
  { x: -300, y: -116, rotate: -11 },
  { x: 292, y: -122, rotate: 10 },
  { x: -230, y: 126, rotate: 8 },
  { x: 242, y: 126, rotate: -8 },
  { x: 0, y: -178, rotate: 0 },
];
const mobileCardPositions = [
  { x: -112, y: -118, rotate: -8 },
  { x: 112, y: -118, rotate: 8 },
  { x: 0, y: 86, rotate: 0 },
];

function hasSessionStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

function readIntroShown() {
  if (!hasSessionStorage()) {
    return introFallbackShown;
  }

  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
  } catch {
    return introFallbackShown;
  }
}

function writeIntroShown() {
  introFallbackShown = true;

  if (!hasSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
  } catch {
    // Session storage can be unavailable in restrictive browser modes.
  }
}

function readMediaQuery(query) {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(query).matches
  );
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => readMediaQuery(query));

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const syncMatches = () => setMatches(mediaQuery.matches);

    syncMatches();
    mediaQuery.addEventListener("change", syncMatches);

    return () => {
      mediaQuery.removeEventListener("change", syncMatches);
    };
  }, [query]);

  return matches;
}

export default function SiteIntro() {
  const [isVisible, setIsVisible] = useState(() => !readIntroShown());
  const isMobileIntro = useMediaQuery(mobileIntroQuery);
  const prefersReducedMotion = useMediaQuery(reducedMotionQuery);
  const introCardPositions = isMobileIntro ? mobileCardPositions : cardPositions;
  const introPlants = useMemo(() => {
    if (prefersReducedMotion) {
      return [];
    }

    const introPlantIds = isMobileIntro ? mobileIntroPlantIds : desktopIntroPlantIds;
    return introPlantIds
      .map((plantId) => plants.find((plant) => plant.id === plantId))
      .filter(Boolean);
  }, [isMobileIntro, prefersReducedMotion]);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function finishIntro() {
      writeIntroShown();
      setIsVisible(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        finishIntro();
      }
    }

    const introTimer = window.setTimeout(
      finishIntro,
      prefersReducedMotion ? REDUCED_MOTION_DURATION_MS : INTRO_DURATION_MS
    );

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(introTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible, prefersReducedMotion]);

  function skipIntro() {
    writeIntroShown();
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`site-intro ${prefersReducedMotion ? "site-intro-reduced" : ""}`}
      aria-label="Floraseek intro"
    >
      <button
        className="site-intro-skip"
        type="button"
        aria-label="Skip intro animation"
        onClick={skipIntro}
      >
        Skip
      </button>

      <div className="site-intro-stage">
        <div className="intro-sprout" aria-hidden="true">
          <span className="intro-seed" />
          <span className="intro-stem" />
          <span className="intro-leaf intro-leaf-left" />
          <span className="intro-leaf intro-leaf-right" />
          <span className="intro-brand-mark">
            <Sprout size={34} aria-hidden="true" />
          </span>
        </div>

        <div className="intro-card-fan" aria-hidden="true">
          {introPlants.map((plant, index) => {
            const position = introCardPositions[index];

            return (
              <article
                className="intro-mini-card"
                key={plant.id}
                style={{
                  "--intro-card-delay": `${0.9 + index * 0.05}s`,
                  "--intro-card-rotate": `${position.rotate}deg`,
                  "--intro-card-x": `${position.x}px`,
                  "--intro-card-y": `${position.y}px`,
                }}
              >
                <img
                  src={plant.image}
                  alt=""
                  loading="lazy"
                  onError={(event) => {
                    if (!event.currentTarget.src.endsWith(fallbackPlantImage)) {
                      event.currentTarget.src = fallbackPlantImage;
                    }
                  }}
                />
                <span>
                  <strong>{plant.name}</strong>
                  <small>{plant.category}</small>
                </span>
              </article>
            );
          })}
        </div>

        <div className="site-intro-message">
          <h2>Find the plant that fits you.</h2>
          <p>Explore plants by climate, difficulty and category.</p>
        </div>
      </div>
    </div>
  );
}
