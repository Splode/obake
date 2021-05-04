import puppeteer from "puppeteer";

describe("The Amazon merchant checker", () => {
  jest.setTimeout(3e5);

  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
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