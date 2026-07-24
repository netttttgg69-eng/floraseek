# Asset Notes

The Wix Git Integration export did not include the original Wix Studio canvas images or icon assets. The only image-like files available locally were dependency/template assets inside `node_modules`, which are not Floraseek content.

Plant images live in `public/images/plants/` using the exact filenames listed in `src/data/plants.js`, and `public/images/plants/placeholder.png` is used as the fallback if a plant-specific image is missing.
