import { useLanguage } from "../i18n/context.js";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { formatBlogDate, getReadingTimeMinutes } from "../data/blogPosts.js";
import BlogCoverImage from "./BlogCoverImage.jsx";

export default function BlogCard({ post, variant = "default" }) {
  const { t, locale } = useLanguage();
  const articlePath = `/blog/${post.slug}`;
  const isFeatured = variant === "featured";

  return (
    <article className={`blog-card blog-card-${variant}`}>
      <Link className="blog-card-media" to={articlePath} aria-label={t("Read {title}", { title: t(post.title) })}>
        <BlogCoverImage
          alt={t(post.coverImageAlt)}
          category={post.category}
          label={isFeatured ? t("Featured Article") : t("Floraseek Journal")}
          loading={isFeatured ? "eager" : "lazy"}
          src={post.coverImage}
          title={t(post.title)}
        />
      </Link>

      <div className="blog-card-body">
        <div className="blog-meta-row">
          <span>{t(post.category)}</span>
          <time dateTime={post.date}>
            <CalendarDays size={15} aria-hidden="true" />
            {formatBlogDate(post.date, locale)}
          </time>
        </div>

        <h3>
          <Link to={articlePath}>{t(post.title)}</Link>
        </h3>
        <p>{t(post.description)}</p>

        <div className="blog-card-footer">
          <span>{t("{minutes} min read", { minutes: getReadingTimeMinutes(post) })}</span>
          <Link className="text-link" to={articlePath}>
            {t("Read article")}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
