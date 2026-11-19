import { useLanguage } from "../i18n/context.js";
import { Leaf } from "lucide-react";

export default function BlogCoverImage({
  alt,
  category,
  className = "",
  label,
  loading = "lazy",
  src,
  title,
}) {
  const { t } = useLanguage();
  const coverClassName = ["blog-cover", className].filter(Boolean).join(" ");

  if (src) {
    return (
      <img
        className={`${coverClassName} blog-cover-image`}
        src={src}
        alt={t(alt || "")}
        loading={loading}
      />
    );
  }

  return (
    <div
      className={`${coverClassName} blog-cover-placeholder`}
      role="img"
      aria-label={alt ? t(alt) : t("{title} cover image placeholder", { title: t(title) })}
    >
      <span className="blog-cover-icon" aria-hidden="true">
        <Leaf size={28} />
      </span>
      {category && <span className="blog-cover-category">{t(category)}</span>}
      <strong>{t(label || title)}</strong>
    </div>
  );
}
