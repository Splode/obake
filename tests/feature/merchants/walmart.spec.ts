import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

describe("The Walmart merchant checker", () => {
  jest.setTimeout(3e5);

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
      ".price .visuallyhidden",
      (el) => el.textContent
    );
    expect(typeof priceString).toBe("string");
    const price = parseFloat(priceString || "");
    expect(typeof price).toBe("number");
  });
});
