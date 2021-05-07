import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

describe("The Amazon merchant checker", () => {
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
      "https://www.amazon.com/Apple-iPad-12-9-inch-Wi-Fi-256GB/dp/B0862HNWGK",
      {
        waitUntil: "networkidle2",
      }
    );
    const priceString = await page.$eval(
      "#priceblock_ourprice",
      (el) => el.textContent
    );
    expect(typeof priceString).toBe("string");
    const price = parseFloat(priceString || "");
    expect(typeof price).toBe("number");
  });
});
