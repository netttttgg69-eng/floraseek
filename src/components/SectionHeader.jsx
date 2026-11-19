import { useLanguage } from "../i18n/context.js";
export default function SectionHeader({ eyebrow, title, children }) {
  const { t } = useLanguage();
  return (
    <div className="section-header">
      {eyebrow && <p className="eyebrow">{t(eyebrow)}</p>}
      <h2>{t(title)}</h2>
      {children && <p>{t(children)}</p>}
    </div>
  );
}
