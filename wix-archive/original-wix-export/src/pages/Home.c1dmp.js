import wixLocation from "wix-location";
import wixWindow from "wix-window";
import { getRandomPlant } from "public/floraseek-data";
import { applyFloraseekTheme, getElement } from "public/floraseek-ui";

$w.onReady(function () {
  applyFloraseekTheme($w);
  setupRandomPlantButton();
  setupBackButton();
});

function setupRandomPlantButton() {
  const randomButton = getElement($w, "#button1");

  if (!randomButton) {
    return;
  }

  randomButton.onClick(() => {
    const plant = getRandomPlant();
    wixLocation.to(plant.pageUrl);
  });
}

function setupBackButton() {
  const backButton = getElement($w, "#backButton");

  if (!backButton) {
    return;
  }

  backButton.onClick(() => {
    try {
      wixWindow.frontend.back();
    } catch (error) {
      wixLocation.to("/");
    }
  });
}
