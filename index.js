"use strict";

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto(
  //   "https://www.rei.com/product/127390/rei-co-op-kindercone-25-sleeping-bag-kids"
  // );
  await page.goto(
    "https://www.amazon.com/Chapin-International-20003-Purpose-Translucent/dp/B0038EE754"
  );
  const price = await page.$eval(
    "#priceblock_ourprice",
    (el) => el.textContent
  );
  console.log(price);
  await page.screenshot({ path: "example.png" });
  await browser.close();
})();
