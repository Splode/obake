import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { parsePrice } from "../../../src/strings";

describe("The Zavvi merchant checker", () => {
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
      "https://us.zavvi.com/toys-lego/lego-technic-lamborghini-sian-fkp-37-car-model-42115/12700567.html",
      {
        waitUntil: "networkidle2",
      }
    );
    const priceString = await page.$eval(
      '[data-product-price="price"]',
      (el) => {
        return el.textContent?.trim();
      }
    );
    expect(typeof priceString).toBe("string");
    expect(typeof parsePrice(String(priceString))).toBe("number");
    expect(parsePrice(String(priceString))).not.toBeNaN();
  });
});
