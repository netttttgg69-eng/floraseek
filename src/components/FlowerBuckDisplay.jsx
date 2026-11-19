import { useLanguage } from "../i18n/context.js";
import { Check, ChevronDown, Flower2, Lock, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useFlowerBucks from "../hooks/useFlowerBucks.js";
import { FLOWERBUCK_THEMES, formatFlowerBucks } from "../utils/flowerBucks.js";

export default function FlowerBuckDisplay() {
  const { t, locale } = useLanguage();
  const {
    balance,
    selectedTheme,
    unlockedThemes,
    selectTheme,
    unlockTheme,
  } = useFlowerBucks({ trackActivity: true });
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function handleThemeClick(theme) {
    if (unlockedThemes.includes(theme.id)) {
      selectTheme(theme.id);
      return;
    }

    unlockTheme(theme.id);
  }

  return (
    <div className="flowerbuck-widget" ref={widgetRef}>
      <button
        className="flowerbuck-balance-button"
        type="button"
        aria-label={t("{balance} FlowerBucks. Open theme garden.", { balance: formatFlowerBucks(balance, locale) })}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Flower2 size={17} aria-hidden="true" />
        <span>{formatFlowerBucks(balance, locale)}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="flowerbuck-panel" role="dialog" aria-label={t("FlowerBuck theme garden")}>
          <div className="flowerbuck-panel-heading">
            <Sparkles size={16} aria-hidden="true" />
            <div>
              <strong>{t("Theme Garden")}</strong>
              <span>{t("FlowerBuck colour themes")}</span>
            </div>
          </div>

          <div className="flowerbuck-theme-list">
            {FLOWERBUCK_THEMES.map((theme) => {
              const isUnlocked = unlockedThemes.includes(theme.id);
              const isSelected = selectedTheme === theme.id;
              const canUnlock = balance >= theme.cost;

              return (
                <button
                  className={`flowerbuck-theme-card ${isSelected ? "selected" : ""}`.trim()}
                  type="button"
                  key={theme.id}
                  disabled={!isUnlocked && !canUnlock}
                  onClick={() => handleThemeClick(theme)}
                >
                  <span className="theme-card-copy">
                    <strong>{t(theme.name)}</strong>
                    <small>{t(theme.description)}</small>
                  </span>
                  <span className="theme-swatches" aria-hidden="true">
                    {theme.swatches.map((swatch) => (
                      <span key={swatch} style={{ "--theme-swatch": swatch }} />
                    ))}
                  </span>
                  <span className="theme-card-action">
                    {isSelected ? (
                      <>
                        <Check size={14} aria-hidden="true" />
                        {t("Selected")}
                      </>
                    ) : isUnlocked ? (
                      t("Use")
                    ) : canUnlock ? (
                      t("Unlock {amount}", { amount: formatFlowerBucks(theme.cost, locale) })
                    ) : (
                      <>
                        <Lock size={13} aria-hidden="true" />
                        {formatFlowerBucks(theme.cost, locale)}
                      </>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="flowerbuck-panel-note">
            {t("FlowerBucks are local cosmetic rewards only and have no real-world monetary value.")}
          </p>
        </div>
      )}
    </div>
  );
}
