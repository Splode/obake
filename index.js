"use strict";

const puppeteer = require("puppeteer");
const config = require("./config.js");

main();

async function main() {
  const cfg = await config.getConfig();

  const browser = await puppeteer.launch();

  for (const app of cfg.app) {
    await screenGrab(browser, app);
  }

  await browser.close();
}

async function screenGrab(browser, app) {
  const page = await browser.newPage();
  await page.goto(app.URL);
  await page.screenshot({ path: `${app.name}.png` });
  await page.close();
}
