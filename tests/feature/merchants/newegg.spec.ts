import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { parsePrice } from "../../../src/strings";

describe("The Newegg merchant checker", () => {
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
      "https://www.newegg.com/western-digital-black-sn750-nvme-1tb/p/N82E16820250110?Item=N82E16820250110",
      {
        waitUntil: "networkidle2",
      }
    );
    const priceString = await page.$eval(
      ".price-current",
      (el) => el.textContent
    );
    expect(typeof priceString).toBe("string");
    expect(typeof parsePrice(String(priceString))).toBe("number");
  });
});
