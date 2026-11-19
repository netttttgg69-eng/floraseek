import { useLanguage } from "../i18n/context.js";
import { ArrowLeft, CalendarDays, Clock, Leaf } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import BlogArticleContent from "../components/BlogArticleContent.jsx";
import BlogCard from "../components/BlogCard.jsx";
import BlogCoverImage from "../components/BlogCoverImage.jsx";
import {
  formatBlogDate,
  getBlogPostBySlug,
  getReadingTimeMinutes,
  getRelatedBlogPosts,
} from "../data/blogPosts.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function BlogArticlePage() {
  const { t, locale } = useLanguage();
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const readingTime = post ? getReadingTimeMinutes(post) : 0;
  const relatedPosts = useMemo(() => (post ? getRelatedBlogPosts(post) : []), [post]);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <>
      <article className="blog-article">
        <header className="blog-article-hero">
          <div className="container blog-article-hero-grid">
            <div className="blog-article-hero-copy">
              <Link className="back-link" to="/blog">
                <ArrowLeft size={17} aria-hidden="true" />
                {t("Back to Blog")}
              </Link>
              <p className="eyebrow">
                <Leaf size={16} aria-hidden="true" />
                {t(post.category)}
              </p>
              <h1>{t(post.title)}</h1>
              <p>{t(post.description)}</p>
              <div className="blog-article-meta">
                <time dateTime={post.date}>
                  <CalendarDays size={16} aria-hidden="true" />
                  {formatBlogDate(post.date, locale)}
                </time>
                <span>
                  <Clock size={16} aria-hidden="true" />
                  {t("{minutes} min read", { minutes: readingTime })}
                </span>
              </div>
            </div>

            <BlogCoverImage
              alt={t(post.coverImageAlt)}
              category={post.category}
              className="blog-article-cover"
              label={t("Floraseek Journal")}
              loading="eager"
              src={post.coverImage}
              title={t(post.title)}
            />
          </div>
        </header>

        <section className="section">
          <div className="container blog-article-layout">
            <BlogArticleContent post={post} />
          </div>
        </section>
      </article>

      {relatedPosts.length > 0 && (
        <section className="section muted blog-related-section" aria-labelledby="related-articles-title">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">{t("Related articles")}</p>
              <h2 id="related-articles-title">{t("Keep reading")}</h2>
            </div>
            <div className="blog-grid blog-grid-related">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section blog-return-section">
        <div className="container">
          <Link className="button secondary" to="/blog">
            <ArrowLeft size={18} aria-hidden="true" />
            {t("Return to Blog")}
          </Link>
        </div>
      </section>
    </>
  );
}
