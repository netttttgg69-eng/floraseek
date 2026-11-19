import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

function GuideSection({ title, steps }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <section className="guide-section">
      <h2>
        <button type="button" id={id} aria-expanded={open} aria-controls={id + "-steps"}
          onClick={() => setOpen(!open)}>
          <span>{title}</span>
          <small>{steps.length} {steps.length === 1 ? "step" : "steps"}</small>
          <ChevronDown size={19} aria-hidden="true" />
        </button>
      </h2>
      <div className="guide-panel" id={id + "-steps"} aria-hidden={!open} data-open={open}>
        <div>
          <ol className="guide-steps">
            {steps.map(({ title, instruction, note }) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{instruction}</p>
                {note && <p className="guide-note"><strong>Note</strong> {note}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default function PlantGuides({ guide }) {
  if (!guide) return null;
  return (
    <div className="container plant-guides" id="growing-guide">
      <GuideSection title="How to Plant" steps={guide.planting} />
      <GuideSection title="How to Care for Your Plant" steps={guide.care} />
      <div className="guide-references">
        <span>Sources</span>
        <ul>{guide.references.map(({ title, url }) => (
          <li key={url}><a href={url}>{title}</a></li>
        ))}</ul>
      </div>
    </div>
  );
}
