import wixLocation from "wix-location";
import { getPlantsByType, getRandomPlant } from "public/floraseek-data";
import { applyFloraseekTheme, getElement } from "public/floraseek-ui";

$w.onReady(function () {
  applyFloraseekTheme($w);
  setupRandomFlowerButton();
});

function setupRandomFlowerButton() {
  const randomButton = getElement($w, "#button15");

  if (!randomButton) {
    return;
  }

  randomButton.onClick(() => {
    const flower = getRandomPlant(getPlantsByType("flower"));
    wixLocation.to(flower.pageUrl);
  });
}
