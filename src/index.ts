import puppeteer from "puppeteer";
import { Config } from "./config";
import Good from "./Good";

main();

async function main() {
  const cfg = await Config.getConfig();

  const browser = await puppeteer.launch();

  for (const good of cfg.goods) {
    await screenGrab(browser, good);
  }

  await browser.close();
}

async function screenGrab(browser: puppeteer.Browser, good: Good) {
  const page = await browser.newPage();
  await page.goto(good.URL);
  await page.screenshot({ path: `${good.name}.png` });
  await page.close();
}
