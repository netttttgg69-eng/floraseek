import { useLanguage } from "../i18n/context.js";
export default function FilterSelect({ id, label, value, options, onChange }) {
  const { t } = useLanguage();
  return (
    <label className="filter-control" htmlFor={id}>
      <span>{t(label)}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </label>
  );
}
