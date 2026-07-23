# Asset Notes

The Wix Git Integration export did not include the original Wix Studio canvas images or icon assets. The only image-like files available locally were dependency/template assets inside `node_modules`, which are not Floraseek content.

The React version therefore uses consistent CSS-based visual placeholders with accessible labels. Real plant images can be added later under `public/assets/plants/` and connected in `src/data/plants.js` by adding an `image` path to each plant object.
