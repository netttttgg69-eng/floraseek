import { FILTER_OPTIONS, PLANTS, getPlantDisplayData } from "public/floraseek-data";

export const THEME = {
  colors: {
    leaf: "#2f6b4f",
    leafDark: "#194a35",
    sage: "#dfe9dc",
    mint: "#f3f8f1",
    cream: "#fffdf7",
    bark: "#40372f",
    clay: "#b56f45",
    border: "#d8e4d3",
  },
  radii: {
    card: "8px",
    control: "6px",
  },
  shadow: "0 10px 28px rgba(25, 74, 53, 0.12)",
};

const PAGE_BACKGROUND_SELECTORS = [
  "#pageBackground",
  "#mainBackground",
  "#mainSection",
  "#page",
];

const HEADER_SELECTORS = [
  "#header",
  "#siteHeader",
  "#navigationHeader",
  "#navBar",
];

const FOOTER_SELECTORS = [
  "#footer",
  "#siteFooter",
  "#footerSection",
];

const PRIMARY_BUTTON_SELECTORS = [
  "#button1",
  "#button15",
  "#plantPageButton",
  "#viewPlantButton",
];

const FILTER_PANEL_SELECTORS = [
  "#filterPanel",
  "#filterBox",
  "#filtersBox",
  "#finderFilterBox",
];

const RESULTS_REPEATER_SELECTORS = [
  "#plantResultsRepeater",
  "#resultsRepeater",
  "#plantRepeater",
];

const RESULT_COUNT_SELECTORS = [
  "#resultCountText",
  "#resultsCountText",
  "#matchingResultsText",
];

const EMPTY_STATE_SELECTORS = [
  "#emptyState",
  "#emptyStateBox",
  "#noResultsBox",
  "#noResultsText",
];

export function getElement($scope, selector) {
  try {
    return $scope(selector);
  } catch (error) {
    return null;
  }
}

export function getFirstElement($scope, selectors) {
  for (let index = 0; index < selectors.length; index += 1) {
    const element = getElement($scope, selectors[index]);
    if (element) {
      return element;
    }
  }

  return null;
}

export function applyStyle(element, style) {
  if (!element || !element.style) {
    return;
  }

  Object.keys(style).forEach((property) => {
    try {
      element.style[property] = style[property];
    } catch (error) {
      // Wix elements expose different style properties depending on type.
    }
  });
}

export function setText($scope, selector, value) {
  const element = getElement($scope, selector);

  if (!element) {
    return false;
  }

  try {
    element.text = value;
    return true;
  } catch (error) {
    return false;
  }
}

export function setHtml($scope, selector, value) {
  const element = getElement($scope, selector);

  if (!element) {
    return false;
  }

  try {
    element.html = value;
    return true;
  } catch (error) {
    return setText($scope, selector, value.replace(/<[^>]+>/g, ""));
  }
}

export function showElement(element) {
  if (!element) {
    return;
  }

  try {
    element.expand();
  } catch (error) {
    try {
      element.show();
    } catch (innerError) {
      // Some Wix elements do not support both expand and show.
    }
  }
}

export function hideElement(element) {
  if (!element) {
    return;
  }

  try {
    element.collapse();
  } catch (error) {
    try {
      element.hide();
    } catch (innerError) {
      // Some Wix elements do not support both collapse and hide.
    }
  }
}

export function setDropdownOptions($w, selector, options) {
  const dropdown = getElement($w, selector);

  if (!dropdown) {
    return;
  }

  try {
    dropdown.options = options;
    dropdown.value = options[0].value;
  } catch (error) {
    // Keep the Wix Studio dropdown settings if code-side options are locked.
  }
}

export function applyHoverStyle(element, baseStyle, hoverStyle) {
  applyStyle(element, baseStyle);

  try {
    element.onMouseIn(() => applyStyle(element, hoverStyle));
    element.onMouseOut(() => applyStyle(element, baseStyle));
  } catch (error) {
    // Hover handlers are optional polish; the site should still run without them.
  }
}

export function applyFloraseekTheme($w, options = {}) {
  PAGE_BACKGROUND_SELECTORS.forEach((selector) => {
    applyStyle(getElement($w, selector), {
      backgroundColor: THEME.colors.mint,
      color: THEME.colors.bark,
    });
  });

  HEADER_SELECTORS.forEach((selector) => {
    applyStyle(getElement($w, selector), {
      backgroundColor: THEME.colors.cream,
      borderColor: THEME.colors.border,
    });
  });

  FOOTER_SELECTORS.forEach((selector) => {
    applyStyle(getElement($w, selector), {
      backgroundColor: THEME.colors.leafDark,
      color: THEME.colors.cream,
    });
  });

  FILTER_PANEL_SELECTORS.forEach((selector) => {
    applyStyle(getElement($w, selector), {
      backgroundColor: THEME.colors.cream,
      borderColor: THEME.colors.border,
      borderRadius: THEME.radii.card,
      boxShadow: THEME.shadow,
    });
  });

  [
    ...PRIMARY_BUTTON_SELECTORS,
    "#resetButton",
    ...(options.plantButtonIds || []).map((id) => `#${id}`),
  ].forEach((selector) => {
    applyHoverStyle(
      getElement($w, selector),
      {
        backgroundColor: selector === "#resetButton" ? THEME.colors.sage : THEME.colors.leaf,
        borderColor: THEME.colors.leaf,
        color: selector === "#resetButton" ? THEME.colors.leafDark : THEME.colors.cream,
      },
      {
        backgroundColor: selector === "#resetButton" ? THEME.colors.cream : THEME.colors.leafDark,
        borderColor: THEME.colors.leafDark,
        color: selector === "#resetButton" ? THEME.colors.leafDark : THEME.colors.cream,
      }
    );
  });

  ["#difficultyDropdown", "#climateDropdown", "#typeDropdown"].forEach((selector) => {
    applyStyle(getElement($w, selector), {
      backgroundColor: THEME.colors.cream,
      borderColor: THEME.colors.border,
      color: THEME.colors.bark,
    });
  });
}

export function setupStandardPage($w) {
  applyFloraseekTheme($w);
}

export function setupPlantDetailPage($w, plantId) {
  const plant = PLANTS.find((item) => item._id === plantId);

  applyFloraseekTheme($w);

  if (!plant) {
    return;
  }

  const displayPlant = getPlantDisplayData(plant);

  setText($w, "#plantName", displayPlant.name);
  setText($w, "#plantTitle", displayPlant.name);
  setText($w, "#plantDescription", displayPlant.description);
  setText($w, "#plantDifficulty", displayPlant.difficultyLabel);
  setText($w, "#plantClimate", displayPlant.climateLabel);
  setText($w, "#plantType", displayPlant.typeLabel);
  setText($w, "#difficultyBadge", displayPlant.difficultyLabel);
  setText($w, "#climateBadge", displayPlant.climateLabel);
  setText($w, "#typeBadge", displayPlant.typeLabel);

  const image = getElement($w, "#plantImage");
  if (image) {
    try {
      image.alt = displayPlant.imageAlt;
    } catch (error) {
      // Alt text is only available on image elements.
    }
  }
}

export function getResultsRepeater($w) {
  return getFirstElement($w, RESULTS_REPEATER_SELECTORS);
}

export function getResultCountElement($w) {
  return getFirstElement($w, RESULT_COUNT_SELECTORS);
}

export function getEmptyStateElement($w) {
  return getFirstElement($w, EMPTY_STATE_SELECTORS);
}

export function configureFilterDropdowns($w) {
  setDropdownOptions($w, "#difficultyDropdown", FILTER_OPTIONS.difficulty);
  setDropdownOptions($w, "#climateDropdown", FILTER_OPTIONS.climate);
  setDropdownOptions($w, "#typeDropdown", FILTER_OPTIONS.type);
}
