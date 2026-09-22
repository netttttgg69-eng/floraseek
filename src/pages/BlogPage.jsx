import { BookOpen, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import BlogCard from "../components/BlogCard.jsx";
import {
  blogCategories,
  getBlogSearchText,
  getFeaturedBlogPost,
  getPublishedBlogPosts,
} from "../data/blogPosts.js";
import { absoluteSiteUrl, setPageMeta } from "../utils/meta.js";

const allCategory = "All";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState(allCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const posts = useMemo(() => getPublishedBlogPosts(), []);
  const featuredPost = getFeaturedBlogPost(posts);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = activeCategory === allCategory || post.category === activeCategory;
      const matchesSearch = !query || getBlogSearchText(post).includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, searchQuery]);

  useEffect(() => {
    setPageMeta(
      "The Floraseek Journal",
      "Explore plant care guides, gardening tips, and everything you need to know about growing plants.",
      {
        canonicalPath: "/blog",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "The Floraseek Journal",
          description:
            "Explore plant care guides, gardening tips, and everything you need to know about growing plants.",
          url: absoluteSiteUrl("/blog"),
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            url: absoluteSiteUrl(`/blog/${post.slug}`),
          })),
        },
      }
    );
  }, [posts]);

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
            Blog
          </p>
          <h1>The Floraseek Journal</h1>
          <p>
            Explore plant care guides, gardening tips, and everything you need to know about
            growing plants.
          </p>
        </div>

        {featuredPost && (
          <section className="blog-featured" aria-labelledby="featured-article-title">
            <div className="section-header">
              <p className="eyebrow">Featured article</p>
              <h2 id="featured-article-title">Start here</h2>
            </div>
            <BlogCard post={featuredPost} variant="featured" />
          </section>
        )}

        <section className="blog-browser" aria-labelledby="all-articles-title">
          <div className="blog-browser-heading">
            <div>
              <p className="eyebrow">Browse the journal</p>
              <h2 id="all-articles-title">All articles</h2>
            </div>
            <p aria-live="polite">
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
            </p>
          </div>

          <form className="blog-controls" onSubmit={(event) => event.preventDefault()}>
            <label className="blog-search-control">
              <span>Search articles</span>
              <span className="search-field">
                <Search size={18} aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  placeholder="Search by title or topic"
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </span>
            </label>

            <div className="blog-category-filters" aria-label="Filter articles by category">
              {[allCategory, ...blogCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
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
              <h3>No journal articles match that search.</h3>
              <p>Try a different topic or reset the filters to view every article.</p>
              <button className="button secondary" type="button" onClick={resetFilters}>
                <X size={17} aria-hidden="true" />
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
