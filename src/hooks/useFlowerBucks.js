import { useEffect, useMemo, useState } from "react";
import {
  claimAvailableDailyFlowerBuckReward,
  FLOWERBUCKS_EVENT,
  FLOWERBUCKS_STORAGE_KEY,
  readFlowerBuckState,
  recordActiveFlowerBuckTime,
  selectFlowerBuckTheme,
  unlockFlowerBuckTheme,
} from "../utils/flowerBucks.js";

const ACTIVE_EVENTS = [
  "click",
  "keydown",
  "mousemove",
  "pointerdown",
  "scroll",
  "touchstart",
];

export default function useFlowerBucks({ trackActivity = false } = {}) {
  const [flowerBuckState, setFlowerBuckState] = useState(() => readFlowerBuckState());

  useEffect(() => {
    function syncFlowerBucks(event) {
      setFlowerBuckState(event.detail || readFlowerBuckState());
    }

    function syncFromStorage(event) {
      if (!event.key || event.key === FLOWERBUCKS_STORAGE_KEY) {
        setFlowerBuckState(readFlowerBuckState());
      }
    }

    window.addEventListener(FLOWERBUCKS_EVENT, syncFlowerBucks);
    window.addEventListener("storage", syncFromStorage);

    return () => {
      window.removeEventListener(FLOWERBUCKS_EVENT, syncFlowerBucks);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  useEffect(() => {
    claimAvailableDailyFlowerBuckReward();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.flowerTheme = flowerBuckState.selectedTheme;
  }, [flowerBuckState.selectedTheme]);

  useEffect(() => {
    if (!trackActivity) {
      return undefined;
    }

    let lastInteractionAt = Date.now();
    let lastTickAt = Date.now();

    function markActive() {
      lastInteractionAt = Date.now();
    }

    function tickActiveTime() {
      const now = Date.now();
      const elapsed = now - lastTickAt;
      const state = readFlowerBuckState();
      const isPageActive = document.visibilityState === "visible"
        && document.hasFocus()
        && now - lastInteractionAt <= state.settings.inactivityTimeoutMs;

      lastTickAt = now;

      if (isPageActive) {
        recordActiveFlowerBuckTime(elapsed);
      }
    }

    ACTIVE_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, markActive, { passive: true });
    });
    window.addEventListener("focus", markActive);
    document.addEventListener("visibilitychange", markActive);
    const intervalId = window.setInterval(tickActiveTime, 5_000);

    return () => {
      ACTIVE_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, markActive);
      });
      window.removeEventListener("focus", markActive);
      document.removeEventListener("visibilitychange", markActive);
      window.clearInterval(intervalId);
    };
  }, [trackActivity]);

  return useMemo(() => ({
    ...flowerBuckState,
    selectTheme: selectFlowerBuckTheme,
    unlockTheme: unlockFlowerBuckTheme,
  }), [flowerBuckState]);
}
