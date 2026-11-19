import { useLanguage } from "../i18n/context.js";
import { SearchX } from "lucide-react";

export default function EmptyState({
  message = "Try choosing All in one category, or reset the finder to see every Floraseek plant.",
  onReset,
  title = "No plants match those filters",
}) {
  const { t } = useLanguage();
  return (
    <div className="empty-state">
      <SearchX size={42} aria-hidden="true" />
      <h2>{t(title)}</h2>
      <p>{t(message)}</p>
      {onReset && (
        <button className="button secondary" type="button" onClick={onReset}>
          {t("Show all plants")}
        </button>
      )}
    </div>
  );
}
