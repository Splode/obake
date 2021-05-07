import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { parsePrice } from "../../../src/strings";

describe("The Costco merchant checker", () => {
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
      "https://www.costco.com/apple-ipad-pro-12.9%22-a12z-bionic-chip-512gb---space-gray.product.100574567.html",
      {
        waitUntil: "networkidle2",
      }
    );
    const priceString = await page.$eval(
      "#pull-right-price > span",
      (el) => el.textContent
    );
    expect(typeof priceString).toBe("string");
    expect(typeof parsePrice(String(priceString))).toBe("number");
  });
});
