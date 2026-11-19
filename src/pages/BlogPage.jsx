import { useLanguage } from "../i18n/context.js";
import { BookOpen, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import BlogCard from "../components/BlogCard.jsx";
import {
  blogCategories,
  getBlogSearchText,
  getFeaturedBlogPost,
  getPublishedBlogPosts,
} from "../data/blogPosts.js";

const allCategory = "All";

export default function BlogPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(allCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const posts = useMemo(() => getPublishedBlogPosts(), []);
  const featuredPost = getFeaturedBlogPost(posts);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = activeCategory === allCategory || post.category === activeCategory;
      const matchesSearch = !query || getBlogSearchText(post, t).includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, searchQuery, t]);

  function resetFilters() {
    setActiveCategory(allCategory);
    setSearchQuery("");
  }

  return (
    <section className="page-section blog-page">
      <div className="container">
        <div className="page-heading blog-heading">
          <p className="eyebrow">
            <BookOpen size={16} aria-hidden="true" />
            {t("Blog")}
          </p>
          <h1>{t("The Floraseek Journal")}</h1>
          <p>
            {t("Explore plant care guides, gardening tips, and everything you need to know about growing plants.")}
          </p>
        </div>

        {featuredPost && (
          <section className="blog-featured" aria-labelledby="featured-article-title">
            <div className="section-header">
              <h2 id="featured-article-title">{t("Featured article")}</h2>
            </div>
            <BlogCard post={featuredPost} variant="featured" />
          </section>
        )}

        <section className="blog-browser" aria-labelledby="all-articles-title">
          <div className="blog-browser-heading">
            <div>
              <h2 id="all-articles-title">{t("All articles")}</h2>
            </div>
            <p aria-live="polite">
              {filteredPosts.length} {filteredPosts.length === 1 ? t("article") : t("articles")}
            </p>
          </div>

          <form className="blog-controls" onSubmit={(event) => event.preventDefault()}>
            <label className="blog-search-control">
              <span>{t("Search articles")}</span>
              <span className="search-field">
                <Search size={18} aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  placeholder={t("Search by title or topic")}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </span>
            </label>

            <div className="blog-category-filters" aria-label={t("Filter articles by category")}>
              {[allCategory, ...blogCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {t(category)}
                </button>
              ))}
            </div>
          </form>

          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="blog-empty-state">
              <h3>{t("No journal articles match that search.")}</h3>
              <p>{t("Try a different topic or reset the filters to view every article.")}</p>
              <button className="button secondary" type="button" onClick={resetFilters}>
                <X size={17} aria-hidden="true" />
                {t("Reset filters")}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
