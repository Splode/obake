import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { parsePrice } from "../../../src/strings";

describe("The Walmart merchant checker", () => {
  jest.setTimeout(3e4);

  let browser: Browser;

  beforeAll(async () => {
    browser = await puppeteer.use(StealthPlugin()).launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("fetches the price for a given good URL", async () => {
    const page = await browser.newPage();
    await page.goto(
      "https://www.walmart.com/ip/KitchenAid-Deluxe-4-5-Quart-Tilt-Head-Stand-Mixer-KSM97SL/351691465",
      {
        waitUntil: "networkidle2",
      }
    );
    const priceString = await page.$eval(
      '[itemprop="price"]',
      (el) => el.textContent
    );
    expect(typeof priceString).toBe("string");
    expect(typeof parsePrice(String(priceString))).toBe("number");
    expect(parsePrice(String(priceString))).not.toBeNaN();
  });
});
