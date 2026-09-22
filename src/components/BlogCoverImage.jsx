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
  const coverClassName = ["blog-cover", className].filter(Boolean).join(" ");

  if (src) {
    return (
      <img
        className={`${coverClassName} blog-cover-image`}
        src={src}
        alt={alt || ""}
        loading={loading}
      />
    );
  }

  return (
    <div
      className={`${coverClassName} blog-cover-placeholder`}
      role="img"
      aria-label={alt || `${title} cover image placeholder`}
    >
      <span className="blog-cover-icon" aria-hidden="true">
        <Leaf size={28} />
      </span>
      {category && <span className="blog-cover-category">{category}</span>}
      <strong>{label || title}</strong>
    </div>
  );
}
