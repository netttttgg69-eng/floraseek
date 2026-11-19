import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createServer } from "vite";

const template = await readFile("dist/index.html", "utf8");
const escape = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false, watch: null }, appType: "custom" });
try {
  const { renderPage, canonicalPaths, legacyPaths, localizedPath, languages } = await server.ssrLoadModule("/src/entry-server.jsx");
  const entries = [];
  for (const { code } of languages) {
    for (const path of [...canonicalPaths, ...legacyPaths, "/404"]) {
      const { body, meta } = await renderPage(path, code);
      const head = [
        meta.canonical && `<link data-floraseek-seo rel="canonical" href="${escape(meta.canonical)}">`,
        ...meta.alternates.map(([lang, href]) => `<link data-floraseek-seo rel="alternate" hreflang="${lang}" href="${escape(href)}">`),
        meta.schema && `<script data-floraseek-seo type="application/ld+json">${JSON.stringify(meta.schema).replaceAll("<", "\\u003c")}</script>`,
        !meta.available && '<meta data-floraseek-seo name="robots" content="noindex, follow">',
      ].filter(Boolean).join("\n    ");
      const html = template.replace('<html lang="en">', `<html lang="${code}">`)
        .replace(/<title>.*?<\/title>/, () => `<title>${escape(meta.title)}</title>`)
        .replace(/(<meta\s+name="description"\s+content=")[^"]*/, (_, prefix) => prefix + escape(meta.description))
        .replace("</head>", () => head + "\n  </head>").replace('<div id="root"></div>', () => '<div id="root">' + body + "</div>");
      const dir = join("dist", localizedPath(code, path));
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, "index.html"), html);
      if (meta.available && canonicalPaths.includes(path)) entries.push("<url><loc>" + escape(meta.canonical) + "</loc></url>");
    }
  }
  await writeFile("dist/sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries.join("\n") + "\n</urlset>\n");
  console.log("Pre-rendered " + entries.length + " indexable URLs.");
} finally {
  await server.close();
}
