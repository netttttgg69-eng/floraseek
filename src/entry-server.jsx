import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import App from "./App.jsx";
import { LanguageContext } from "./i18n/context.js";
import { languages, localizedPath } from "./i18n/languages.js";
import { loadLanguage } from "./i18n/resources.js";
import { canonicalPaths, pageMetadata } from "./utils/meta.js";

import { plants } from "./data/plants.js";
export const legacyPaths = [...new Set(plants.flatMap(plant => plant.legacyPaths))].filter(path => !canonicalPaths.includes(path));

export { languages, localizedPath, canonicalPaths };

export async function renderPage(path, locale) {
  const t = await loadLanguage(locale, path);
  const location = localizedPath(locale, path);
  const body = renderToString(
    <LanguageContext.Provider value={{ locale, t }}>
      <StaticRouter location={location} basename={localizedPath(locale, "") || "/"}>
        <App />
      </StaticRouter>
    </LanguageContext.Provider>
  );
  return { body, meta: pageMetadata(path, locale, t) };
}
