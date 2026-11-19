import { getPlantBySlug, plants } from "../data/plants.js";
import { getBlogPostBySlug, getPublishedBlogPosts, getReadingTimeMinutes } from "../data/blogPosts.js";
import { languages, localizedPath } from "../i18n/languages.js";
import pages from "../i18n/pages.json";

const origin = "https://floraseek.org";
const absolute = path => new URL(path, origin).href;
export const canonicalPaths = [
  ...Object.keys(pages).filter(path => path !== "404"),
  ...plants.map(plant => "/plants/" + plant.slug),
  ...getPublishedBlogPosts().map(post => "/blog/" + post.slug),
];

export function pageMetadata(pathname, locale, t) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const plant = !pages[path] && getPlantBySlug(path.replace(/^\/plants\//, ""));
  const post = path.startsWith("/blog/") && getBlogPostBySlug(path.slice(6));
  const canonicalPath = plant ? "/plants/" + plant.slug : path;
  const available = Boolean(pages[path] || plant || post) && path !== "404";
  const [title, description] = plant ? [plant.name, plant.shortDescription || plant.summary] :
    post ? [post.title, post.description] : pages[path] || pages["404"];
  const pageUrl = route => absolute(localizedPath(locale, route));
  const article = entry => ({
    "@type": "BlogPosting", headline: t(entry.title), description: t(entry.description),
    datePublished: entry.date, url: pageUrl("/blog/" + entry.slug), inLanguage: locale,
  });
  let schema;
  if (post) {
    const organization = { "@type": "Organization", name: "Floraseek" };
    schema = { "@context": "https://schema.org", ...article(post), dateModified: post.updatedAt || post.date,
      articleSection: t(post.category), keywords: post.topics?.map(topic => t(topic)),
      timeRequired: "PT" + getReadingTimeMinutes(post) + "M", mainEntityOfPage: pageUrl(path),
      image: post.coverImage ? absolute(post.coverImage) : undefined, author: organization, publisher: organization };
  } else if (path === "/blog") {
    schema = { "@context": "https://schema.org", "@type": "Blog", inLanguage: locale, name: t(title),
      description: t(description), url: pageUrl(path), blogPost: getPublishedBlogPosts().map(article) };
  }
  return {
    title: t(title) + " | Floraseek", description: t(description), schema, available,
    canonical: available ? pageUrl(canonicalPath) : null,
    alternates: available ? [...languages.map(({ code }) => [code, absolute(localizedPath(code, canonicalPath))]),
      ["x-default", absolute(canonicalPath)]] : [],
  };
}

export function applyPageMetadata(meta) {
  document.title = meta.title;
  document.querySelector('meta[name="description"]').content = meta.description;
  document.head.querySelectorAll("[data-floraseek-seo]").forEach(node => node.remove());
  function append(tag, attrs, content) {
    const node = document.createElement(tag);
    node.dataset.floraseekSeo = "";
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    if (content) node.textContent = content;
    document.head.appendChild(node);
  }
  if (meta.canonical) append("link", { rel: "canonical", href: meta.canonical });
  for (const [hreflang, href] of meta.alternates) append("link", { rel: "alternate", hreflang, href });
  if (meta.schema) append("script", { type: "application/ld+json" }, JSON.stringify(meta.schema));
  if (!meta.available) append("meta", { name: "robots", content: "noindex, follow" });
}
