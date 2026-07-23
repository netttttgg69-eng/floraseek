import wixLocation from 'wix-location';

$w.onReady(function () {
  $w('#button1').onClick(() => {
    const plantPages = [
      "/rose",
      "/sunflower",
      "/lavender",
      "/cactus",
      "/snakeplant",
      "/peacelily",
      "/aloevera",
      "/tulip",
      "/welwitschia",
      "/spiderplant",
      "/pitcherplant",
      "/corpseflower",
      "/zzplant",
      "/pothos",
      "/chineseevergreen",
      "/orchid"
    ];

    const randomPage = plantPages[Math.floor(Math.random() * plantPages.length)];

    wixLocation.to(randomPage);
  });
});

import wixWindow from 'wix-window';

$w.onReady(function () {
    $w('#backButton').onClick(() => {
        wixWindow.frontend.back();
    });
});