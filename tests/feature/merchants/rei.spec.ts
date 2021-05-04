import puppeteer from "puppeteer";

describe("The REI merchant checker", () => {
  jest.setTimeout(3e5);

  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("fetches the price for a given good URL", async () => {
    const page = await browser.newPage();
    await page.goto(
      "https://www.rei.com/product/754773/eno-doublenest-hammock",
      {
        waitUntil: "networkidle2",
      }
    );
    const priceString = await page.$eval(
      ".product-current-price > span",
      (el) => el.textContent
    );
    expect(typeof priceString).toBe("string");
    const price = parseFloat(priceString || "");
    expect(typeof price).toBe("number");
  });
});
