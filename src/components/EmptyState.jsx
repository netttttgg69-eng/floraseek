import { SearchX } from "lucide-react";

export default function EmptyState({ onReset }) {
  return (
    <div className="empty-state">
      <SearchX size={42} aria-hidden="true" />
      <h2>No plants match those filters</h2>
      <p>
        Try choosing All in one category, or reset the finder to see every Floraseek plant.
      </p>
      <button className="button secondary" type="button" onClick={onReset}>
        Show all plants
      </button>
    </div>
  );
}
