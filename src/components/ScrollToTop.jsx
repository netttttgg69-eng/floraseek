import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "instant" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [hash, pathname]);

  return null;
}
