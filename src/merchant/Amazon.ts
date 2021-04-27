import Merchant from "./Merchant";
import IGood from "../config/IGood";
import puppeteer from "puppeteer";

export default class Amazon extends Merchant {
  public constructor(good: IGood) {
    super(good);
  }

  public async priceCheck(page: puppeteer.Page): Promise<void> {
    await page.goto(this.URL);

    let priceString: string | null;
    try {
      priceString = await page.$eval(
        "#priceblock_ourprice",
        (el) => el.textContent
      );
    } catch (error) {
      this.handleNotFoundPrice();
      return;
    }

    if (!priceString) return;
    const price = this.parsePrice(priceString);

    this.handFoundPrice(price);

    if (price < this.good.price) {
      this.handleDiscount(price);
    }
    return;
  }
}
