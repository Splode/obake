import puppeteer from "puppeteer";

describe("The Apple App Store merchant checker", () => {
  jest.setTimeout(3e5);

  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("fetches the price for a given app URL", async () => {
    const page = await browser.newPage();
    await page.goto("https://apps.apple.com/us/app/ia-writer/id775737172", {
      waitUntil: "networkidle2",
    });
    const priceString = await page.$eval(
      ".app-header__list__item--price",
      (el) => el.textContent
    );
    expect(typeof priceString).toBe("string");
    const price = parseFloat(priceString || "");
    expect(typeof price).toBe("number");
  });
});
