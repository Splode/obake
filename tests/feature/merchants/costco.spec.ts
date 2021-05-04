import puppeteer from "puppeteer";

describe("The Costco merchant checker", () => {
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
    const price = parseFloat(priceString || "");
    expect(typeof price).toBe("number");
  });
});
