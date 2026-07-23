export function setPageMeta(title, description) {
  document.title = `${title} | Floraseek`;

  const metaDescription = document.querySelector('meta[name="description"]');

  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }
}
