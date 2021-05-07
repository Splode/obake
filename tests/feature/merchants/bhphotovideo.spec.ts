import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { parsePrice } from "../../../src/strings";

describe("The B&H merchant checker", () => {
  jest.setTimeout(3e4);

  let browser: Browser;

  beforeAll(async () => {
    browser = await puppeteer.use(StealthPlugin()).launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("fetches the price for a given app URL", async () => {
    const page = await browser.newPage();
    await page.goto(
      "https://www.bhphotovideo.com/c/product/1321309-REG/sigma_24_70mm_f_2_8_dg_os.html",
      {
        waitUntil: "networkidle2",
      }
    );
    const priceString = await page.$eval(
      "[data-selenium='pricingPrice']",
      (el) => el.textContent
    );
    expect(typeof priceString).toBe("string");
    expect(typeof parsePrice(String(priceString))).toBe("number");
  });
});
