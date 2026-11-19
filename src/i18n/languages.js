export const languages = [
  { code: "en", name: "English", prefix: "" },
  { code: "fr", name: "Français", prefix: "/fr" },
];

export function splitLanguage(pathname) {
  const language = languages.find(({ prefix }) => prefix && (pathname === prefix || pathname.startsWith(prefix + "/")));
  return { locale: language?.code || "en", path: pathname.slice(language?.prefix.length || 0) || "/" };
}

export function localizedPath(locale, path) {
  return (languages.find(({ code }) => code === locale)?.prefix || "") + path;
}

export function browserLanguage(tags = []) {
  for (const tag of tags) {
    try {
      const locale = new Intl.Locale(tag).maximize();
      const candidate = locale.language === "zh" ? "zh-" + locale.script : locale.language;
      if (languages.some(({ code }) => code === candidate)) return candidate;
    } catch { /* Skip malformed language tags. */ }
  }
  return "en";
}

export const preferenceKey = "floraseek.language";
export function initialLanguage(pathname, preference, tags) {
  const { locale } = splitLanguage(pathname);
  if (locale !== "en") return locale;
  return languages.find(({ code }) => code === preference)?.code || browserLanguage(tags);
}
