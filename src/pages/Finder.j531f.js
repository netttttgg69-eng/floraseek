import wixData from 'wix-data';


const plants = [
    { id: "sunflowerBtn", difficulty: "easy", type: "flower", climate: ["temperate", "subtropical"] },
    { id: "roseBtn", difficulty: "moderate", type: "plant", climate: ["temperate"] },
    { id: "tulipBtn", difficulty: "easy", type: "flower", climate: ["temperate", "continental"] },
    { id: "lavenderBtn", difficulty: "easy", type: "flower", climate: ["temperate"] },
    { id: "cactusBtn", difficulty: "easy", type: "plant", climate: ["subtropical", "desert"] },
    { id: "aloeBtn", difficulty: "easy", type: "plant", climate: ["tropical", "subtropical"] },
    { id: "snakePlantBtn", difficulty: "easy", type: "plant", climate: ["tropical", "subtropical"] },
    { id: "peaceLilyBtn", difficulty: "easy", type: "flower", climate: ["tropical", "subtropical"] },
    { id: "spiderPlantBtn", difficulty: "easy", type: "plant", climate: ["temperate"] },
    { id: "zzPlantBtn", difficulty: "easy", type: "plant", climate: ["tropical", "subtropical"] },
    { id: "chineseEvergreenBtn", difficulty: "easy", type: "plant", climate: ["tropical", "subtropical"] },
    { id: "monsterdelicousBtn", difficulty: "moderate", type: "plant", climate: ["tropical"] },
    { id: "fiddleleafFigBtn", difficulty: "hard", type: "plant", climate: ["tropical", "subtropical"] },
    { id: "orchidBtn", difficulty: "hard", type: "flower", climate: ["tropical", "subtropical"] },
    { id: "pitcherPlantBtn", difficulty: "moderate", type: "plant", climate: ["tropical", "subtropical"] },
    { id: "welvitchiaBtn", difficulty: "extreme", type: "plant", climate: ["desert"] },
    { id: "corpsePlantBtn", difficulty: "easy", type: "flower", climate: ["tropical"] },
    { id: "pothosBtn", difficulty: "easy", type: "plant", climate: ["tropical", "subtropical"] },
    { id: "AnthuriumBtn", difficulty: "moderate",type: "plant", climate: ["tropical", "subtropical"]},
    {id: "KalanchoeBtn", difficulty: "easy",type: "flower", climate: ["desert", "subtropical"]},
    {id: "JadeplantBtn", difficulty: "easy",type: "plant", climate: ["desert", "subtropical"]},
    {id: "CrotonBtn", difficulty: "moderate",type: "plant", climate: ["tropical", "subtropical"]},
    {id: "BonsaiBtn", difficulty: "hard",type: "plant", climate: ["temperate", "subtropical"]},
];

$w.onReady(function () {

    $w("#difficultyDropdown").onChange(filterPlants);
    $w("#typeDropdown").onChange(filterPlants);
    $w("#climateDropdown").onChange(filterPlants);

    $w("#resetButton").onClick(resetFilters);

    filterPlants();
});

function filterPlants() {

    const difficulty = ($w("#difficultyDropdown").value || "").toLowerCase().trim();
    const type = ($w("#typeDropdown").value || "").toLowerCase().trim();
    const climate = ($w("#climateDropdown").value || "").toLowerCase().trim();

    plants.forEach(plant => {

        let show = true;

        if (
            difficulty &&
            plant.difficulty.toLowerCase().trim() !== difficulty
        ) {
            show = false;
        }

        if (
            type &&
            plant.type.toLowerCase().trim() !== type
        ) {
            show = false;
        }

        if (
            climate &&
            !plant.climate.map(c => c.toLowerCase().trim()).includes(climate)
        ) {
            show = false;
        }

        const el = $w(`#${plant.id}`);

        if (show) {
            el.expand();
        } else {
            el.collapse();
        }
    });
}

function resetFilters() {

    $w("#difficultyDropdown").value = "";
    $w("#typeDropdown").value = "";
    $w("#climateDropdown").value = "";

    filterPlants();
}