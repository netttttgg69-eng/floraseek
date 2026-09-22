import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { formatBlogDate, getReadingTimeMinutes } from "../data/blogPosts.js";
import BlogCoverImage from "./BlogCoverImage.jsx";

export default function BlogCard({ post, variant = "default" }) {
  const articlePath = `/blog/${post.slug}`;
  const isFeatured = variant === "featured";

  return (
    <article className={`blog-card blog-card-${variant}`}>
      <Link className="blog-card-media" to={articlePath} aria-label={`Read ${post.title}`}>
        <BlogCoverImage
          alt={post.coverImageAlt}
          category={post.category}
          label={isFeatured ? "Featured Article" : "Floraseek Journal"}
          loading={isFeatured ? "eager" : "lazy"}
          src={post.coverImage}
          title={post.title}
        />
      </Link>

      <div className="blog-card-body">
        <div className="blog-meta-row">
          <span>{post.category}</span>
          <time dateTime={post.date}>
            <CalendarDays size={15} aria-hidden="true" />
            {formatBlogDate(post.date)}
          </time>
        </div>

        <h3>
          <Link to={articlePath}>{post.title}</Link>
        </h3>
        <p>{post.description}</p>

        <div className="blog-card-footer">
          <span>{getReadingTimeMinutes(post)} min read</span>
          <Link className="text-link" to={articlePath}>
            Read article
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
