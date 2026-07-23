import wixLocation from "wix-location";
import {
  ALL_VALUE,
  PLANTS,
  filterPlants,
  getPlantsForDisplay,
} from "public/floraseek-data";
import {
  applyFloraseekTheme,
  configureFilterDropdowns,
  getElement,
  getEmptyStateElement,
  getResultCountElement,
  getResultsRepeater,
  hideElement,
  setText,
  showElement,
} from "public/floraseek-ui";

let repeaterConfigured = false;

$w.onReady(function () {
  applyFloraseekTheme($w, { plantButtonIds: PLANTS.map((plant) => plant.buttonId) });
  configureFilterDropdowns($w);
  setupFilterControls();
  setupStaticPlantButtons();
  setupResultsRepeater();
  renderResults();
});

function setupFilterControls() {
  ["#difficultyDropdown", "#climateDropdown", "#typeDropdown"].forEach((selector) => {
    const dropdown = getElement($w, selector);

    if (dropdown) {
      dropdown.onChange(renderResults);
    }
  });

  const resetButton = getElement($w, "#resetButton");

  if (resetButton) {
    resetButton.onClick(resetFilters);
  }
}

function setupStaticPlantButtons() {
  PLANTS.forEach((plant) => {
    const button = getElement($w, `#${plant.buttonId}`);

    if (!button) {
      return;
    }

    try {
      button.label = plant.name;
    } catch (error) {
      // Some plant cards may use text elements instead of button labels.
    }

    if (plant.pageUrl) {
      button.onClick(() => wixLocation.to(plant.pageUrl));
    }
  });
}

function setupResultsRepeater() {
  const repeater = getResultsRepeater($w);

  if (!repeater || repeaterConfigured) {
    return;
  }

  repeater.onItemReady(($item, itemData) => {
    setText($item, "#plantName", itemData.name);
    setText($item, "#plantDescription", itemData.description);
    setText($item, "#plantDifficulty", itemData.difficultyLabel);
    setText($item, "#plantClimate", itemData.climateLabel);
    setText($item, "#plantType", itemData.typeLabel);

    const image = getElement($item, "#plantImage");
    if (image) {
      try {
        image.alt = itemData.imageAlt;
      } catch (error) {
        // Alt text only applies to image elements.
      }
    }

    const button = getElement($item, "#plantPageButton") || getElement($item, "#viewPlantButton");
    if (button && itemData.pageUrl) {
      try {
        button.label = "View plant";
      } catch (error) {
        // Keep the Studio label when labels are not editable from code.
      }

      button.onClick(() => wixLocation.to(itemData.pageUrl));
    }
  });

  repeaterConfigured = true;
}

function getFilters() {
  return {
    difficulty: getDropdownValue("#difficultyDropdown"),
    climate: getDropdownValue("#climateDropdown"),
    type: getDropdownValue("#typeDropdown"),
  };
}

function getDropdownValue(selector) {
  const dropdown = getElement($w, selector);
  return dropdown && dropdown.value ? dropdown.value : ALL_VALUE;
}

function renderResults() {
  const results = filterPlants(getFilters());

  renderRepeaterResults(results);
  renderStaticPlantCards(results);
  renderResultCount(results.length);
  renderEmptyState(results.length);
}

function renderRepeaterResults(results) {
  const repeater = getResultsRepeater($w);

  if (!repeater) {
    return false;
  }

  repeater.data = getPlantsForDisplay(results);
  return true;
}

function renderStaticPlantCards(results) {
  const hasRepeater = Boolean(getResultsRepeater($w));
  const matchingPlantIds = new Set(results.map((plant) => plant._id));

  PLANTS.forEach((plant) => {
    const card = getPlantCardElement(plant);

    if (!card) {
      return;
    }

    if (hasRepeater) {
      hideElement(card);
      return;
    }

    if (matchingPlantIds.has(plant._id)) {
      showElement(card);
    } else {
      hideElement(card);
    }
  });
}

function getPlantCardElement(plant) {
  return (
    getElement($w, `#${plant.cardId}`) ||
    getElement($w, `#${plant.buttonId}`)
  );
}

function renderResultCount(count) {
  const resultCount = getResultCountElement($w);

  if (!resultCount) {
    return;
  }

  try {
    resultCount.text = count === 1 ? "1 matching plant" : `${count} matching plants`;
  } catch (error) {
    // If the count is represented by a box, keep its Studio content.
  }
}

function renderEmptyState(count) {
  const emptyState = getEmptyStateElement($w);

  if (!emptyState) {
    return;
  }

  if (count === 0) {
    try {
      emptyState.text = "No plants match those filters. Try choosing All in one category or resetting the filters.";
    } catch (error) {
      // If this is a box, keep its Studio text and only control visibility.
    }

    showElement(emptyState);
  } else {
    hideElement(emptyState);
  }
}

function resetFilters() {
  ["#difficultyDropdown", "#climateDropdown", "#typeDropdown"].forEach((selector) => {
    const dropdown = getElement($w, selector);

    if (dropdown) {
      dropdown.value = ALL_VALUE;
    }
  });

  renderResults();
}
