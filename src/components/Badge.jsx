import { useLanguage } from "../i18n/context.js";
import { labelFor } from "../data/plants.js";

export default function Badge({ category, value }) {
  const { t } = useLanguage();
  return (
    <span className={`badge badge-${category}`}>
      {t(labelFor(category, value))}
    </span>
  );
}
