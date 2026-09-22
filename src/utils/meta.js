const managedCanonicalId = "floraseek-canonical";
const managedStructuredDataId = "floraseek-structured-data";

function getAbsoluteUrl(path) {
  if (!path || typeof window === "undefined") {
    return path;
  }

  return new URL(path, window.location.origin).href;
}

function updateCanonicalLink(canonicalPath) {
  const existingLink = document.getElementById(managedCanonicalId);

  if (!canonicalPath) {
    existingLink?.remove();
    return;
  }

  const canonicalLink = existingLink || document.createElement("link");
  canonicalLink.id = managedCanonicalId;
  canonicalLink.setAttribute("rel", "canonical");
  canonicalLink.setAttribute("href", getAbsoluteUrl(canonicalPath));

  if (!existingLink) {
    document.head.appendChild(canonicalLink);
  }
}

function updateStructuredData(structuredData) {
  const existingScript = document.getElementById(managedStructuredDataId);

  if (!structuredData) {
    existingScript?.remove();
    return;
  }

  const structuredDataScript = existingScript || document.createElement("script");
  structuredDataScript.id = managedStructuredDataId;
  structuredDataScript.type = "application/ld+json";
  structuredDataScript.textContent = JSON.stringify(structuredData);

  if (!existingScript) {
    document.head.appendChild(structuredDataScript);
  }
}

export function setPageMeta(title, description, options = {}) {
  document.title = `${title} | Floraseek`;

  const metaDescription = document.querySelector('meta[name="description"]');

  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }

  updateCanonicalLink(options.canonicalPath);
  updateStructuredData(options.structuredData);
}

export function absoluteSiteUrl(path) {
  return getAbsoluteUrl(path);
}
