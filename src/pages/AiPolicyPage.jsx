import { Bot, CheckCircle2, Database, Shield } from "lucide-react";
import { useEffect } from "react";
import { setPageMeta } from "../utils/meta.js";

const policySections = [
  {
    icon: Bot,
    title: "How AI assisted",
    body: "AI assisted with planning, coding, design refinement, and organising existing content into a clearer React website structure.",
  },
  {
    icon: CheckCircle2,
    title: "Human review and decision-making",
    body: "Human choices guide what appears on Floraseek, including the final design direction, requested features, and any future content updates.",
  },
  {
    icon: Database,
    title: "Plant information accuracy",
    body: "Floraseek keeps plant information simple and should be treated as an educational discovery guide, not a replacement for expert horticultural advice.",
  },
  {
    icon: Shield,
    title: "Privacy and user data",
    body: "Saved plants and cached climate lookups are stored in the browser. Floraseek does not currently implement sign-in, user accounts, or server-side profiles.",
  },
];

export default function AiPolicyPage() {
  useEffect(() => {
    setPageMeta(
      "Our AI Policy",
      "Read Floraseek's AI policy, privacy notes, and accuracy limitations."
    );
  }, []);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Responsible use</p>
          <h1>Our AI Policy</h1>
          <p>
            This page explains how AI assistance fits into Floraseek and where human judgement,
            privacy, and plant-information limits matter.
          </p>
        </div>

        <div className="policy-list">
          {policySections.map(({ body, icon: Icon, title }) => (
            <article className="detail-card" key={title}>
              <Icon size={24} aria-hidden="true" />
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
          <article className="detail-card">
            <h2>Limitations of AI-generated assistance</h2>
            <p>
              AI-generated assistance can miss context or make mistakes. Floraseek does not claim
              every plant fact has been professionally reviewed.
            </p>
          </article>
          <article className="detail-card">
            <h2>No automated safety decisions</h2>
            <p>
              Floraseek does not currently use an AI chatbot and does not make automated
              personalised safety decisions.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
