import puppeteer from "puppeteer";

describe("The Best Buy merchant checker", () => {
  jest.setTimeout(3e5);

  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
  });

  afterAll(async () => {
    await browser.close();
  });

  test("fetches the price for a given app URL", async () => {
    const url = new URL(
      "https://www.bestbuy.com/site/amazon-echo-dot-4th-gen-smart-speaker-with-clock-and-alexa-glacier-white/6430059.p?skuId=6430059"
    );
    const sku = url.searchParams.get("skuId");

    const page = await browser.newPage();
    await page.goto(url.href, {
      waitUntil: "networkidle2",
    });

    const priceString = await page.$eval(
      `[data-skuid='${sku}'] .priceView-customer-price > span`,
      (el) => el.textContent
    );

    const cartText = await page.$eval(
      ".add-to-cart-button",
      (el) => el.textContent
    );

    await Promise.all([priceString, cartText]);

    expect(typeof priceString).toBe("string");
    const price = parseFloat(priceString || "");
    expect(typeof price).toBe("number");
  });
});
