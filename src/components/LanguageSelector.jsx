import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { languages, localizedPath } from "../i18n/languages.js";
import { useLanguage } from "../i18n/context.js";

export default function LanguageSelector() {
  const { locale, switchLanguage, t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  const button = useRef(null);
  useEffect(() => {
    if (!open) return;
    panel.current.querySelector('[aria-current="true"]')?.focus();
    const outside = event => { if (!panel.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  function handleKey(event) {
    if (event.key === "Escape") {
      setOpen(false);
      button.current.focus();
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (!open) return setOpen(true);
    const links = Array.from(panel.current.querySelectorAll("a"));
    const index = links.indexOf(document.activeElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? links.length - 1 :
      (index + (event.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
    links[next].focus();
  }

  return <div className="language-selector" ref={panel} onKeyDown={handleKey}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button type="button" ref={button} onClick={() => setOpen(!open)} aria-expanded={open}
      aria-controls="site-languages" aria-label={t("Language") + " · " + languages.find(item => item.code === locale).name}>
      <Globe size={17} aria-hidden="true" /><span>{locale}</span>
    </button>
    <ul id="site-languages" hidden={!open}>
      {languages.map(({ code, name }) => <li key={code}><a lang={code} hrefLang={code}
        aria-current={code === locale ? "true" : undefined}
        href={localizedPath(code, location.pathname) + location.search + location.hash}
        onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          switchLanguage(code);
          setOpen(false);
          button.current.focus();
        }}>{name}</a></li>)}
    </ul>
  </div>;
}
