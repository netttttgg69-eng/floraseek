import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { plants } from "../data/plants.js";
import PlantImage from "./PlantImage.jsx";

function selectPlants() {
  const pool = plants.filter((plant) =>
    plant.type !== "technique" && plant.image && !plant.image.endsWith("/placeholder.png")
  );
  for (let end = pool.length - 1; end > 0; end--) {
    const index = Math.floor(Math.random() * (end + 1));
    [pool[end], pool[index]] = [pool[index], pool[end]];
  }
  return pool.slice(0, 18);
}

export default function ExplorePlants({ playing, reduced, onToggle }) {
  const [selection] = useState(selectPlants);
  const viewport = useRef(null);
  const group = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const lastManualScroll = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible || hovered || focused || touching) return;
    const rail = viewport.current;
    let frame;
    let lastTime;
    let fraction = 0;
    let groupWidth = group.current.getBoundingClientRect().width;
    const resize = new ResizeObserver(([entry]) => { groupWidth = entry.target.getBoundingClientRect().width; });
    resize.observe(group.current);

    function advance(time) {
      if (lastTime && groupWidth && time - lastManualScroll.current > 1000) {
        // Carry subpixel movement across frames on browsers that round scrollLeft.
        fraction += Math.min(time - lastTime, 64) * 0.022;
        if (fraction >= 1) {
          rail.scrollLeft = (rail.scrollLeft + Math.floor(fraction)) % groupWidth;
          fraction %= 1;
        }
      }
      lastTime = time;
      frame = requestAnimationFrame(advance);
    }

    frame = requestAnimationFrame(advance);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [playing, visible, hovered, focused, touching]);

  function releaseTouch() {
    lastManualScroll.current = performance.now();
    setTouching(false);
  }

  return (
    <section className="explore-section" aria-labelledby="explore-title">
      <div className="container explore-heading">
        <h2 id="explore-title">Explore Plants</h2>
        <div className="explore-controls">
          {!reduced && (
            <button className="motion-control" type="button" onClick={onToggle}
              aria-label={playing ? "Pause homepage animations" : "Play homepage animations"}
              title={playing ? "Pause animations" : "Play animations"}>
              {playing ? <Pause size={15} /> : <Play size={15} />}
            </button>
          )}
          <Link className="text-link" to="/finder">Browse All Plants</Link>
        </div>
      </div>
      <div className="gallery-viewport" ref={viewport}
        onPointerEnter={(event) => setHovered(event.pointerType === "mouse")}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => setFocused(event.currentTarget.contains(event.relatedTarget))}
        onTouchStart={() => setTouching(true)} onTouchEnd={releaseTouch} onTouchCancel={releaseTouch}
        onWheel={() => { lastManualScroll.current = performance.now(); }}>
        <div className="gallery-track">
          {(reduced ? [false] : [false, true]).map((copy) => (
            <div className="gallery-group" key={String(copy)} ref={copy ? undefined : group} aria-hidden={copy || undefined}>
              {selection.map((plant) => (
                <Link key={plant.id} className="gallery-tile" tabIndex={copy ? -1 : undefined} to={`/plants/${plant.slug}`}>
                  <PlantImage plant={plant} />
                  <strong>{plant.name}</strong>
                  <small>{plant.scientificName || plant.category}</small>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
