import wixLocation from 'wix-location';

$w.onReady(function () {
  $w('#button15').onClick(() => {
    const plantPages = [
      "/rose",
      "/sunflower",
      "/lavender",
      "/peacelily",
      "/tulip",
      "/corpseflower",
      "/orchid"
    ];

    const randomPage = plantPages[Math.floor(Math.random() * plantPages.length)];

    wixLocation.to(randomPage);
  });
});