import { applyPageMetadata, pageMetadata } from "./utils/meta.js";
import React, { startTransition, useSyncExternalStore } from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "@remix-run/router";
import App from "./App.jsx";
import { LanguageContext } from "./i18n/context.js";
import { initialLanguage, localizedPath, preferenceKey, splitLanguage } from "./i18n/languages.js";
import { loadLanguage } from "./i18n/resources.js";
import "./styles/index.css";

const history = createBrowserHistory({ v5Compat: true });
let preference;
try { preference = localStorage.getItem(preferenceKey); } catch { /* Private storage. */ }
const initial = history.location;
const preferred = initialLanguage(initial.pathname, preference, navigator.languages);
if (preferred !== splitLanguage(initial.pathname).locale) {
  history.replace(localizedPath(preferred, initial.pathname) + initial.search + initial.hash, initial.state);
}

function switchLanguage(next) {
  const { pathname, search, hash, state } = history.location;
  const { locale, path } = splitLanguage(pathname);
  try { localStorage.setItem(preferenceKey, next); } catch { /* Still switch for this visit. */ }
  if (next !== locale) history.push(localizedPath(next, path) + search + hash, state);
}

let snapshot;
const subscribers = new Set();
let revision = 0;
async function update() {
  const request = ++revision;
  const { action, location } = history;
  const { locale, path } = splitLanguage(location.pathname);
  const t = await loadLanguage(locale, path);
  if (request !== revision) return;
  document.documentElement.lang = locale;
  applyPageMetadata(pageMetadata(path, locale, t));
  snapshot = { action, location, language: { locale, t, switchLanguage } };
  startTransition(() => subscribers.forEach(fn => fn()));
}
function subscribe(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}
export default function Website() {
  const { action, location, language } = useSyncExternalStore(subscribe, () => snapshot);
  return (
    <LanguageContext.Provider value={language}>
      <Router basename={localizedPath(language.locale, "") || "/"} location={location} navigator={history} navigationType={action}>
        <App />
      </Router>
    </LanguageContext.Provider>
  );
}
history.listen(update);
update().then(() => ReactDOM.createRoot(document.getElementById("root")).render(<Website />));
