import puppeteer from "puppeteer";

describe("The Newegg merchant checker", () => {
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
    const price = parseFloat(priceString || "");
    expect(typeof price).toBe("number");
  });
});