import { labelFor } from "../data/plants.js";

export default function Badge({ category, value }) {
  return (
    <span className={`badge badge-${category}`}>
      {labelFor(category, value)}
    </span>
  );
}
