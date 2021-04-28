import Merchant from "./Merchant";
import IGood from "../config/IGood";
import puppeteer from "puppeteer";
import Notifier from "../message/Notifier";

export default class Amazon extends Merchant {
  public constructor(good: IGood, notifier: Notifier) {
    super(good, notifier);
  }

  public async priceCheck(page: puppeteer.Page): Promise<void> {
    await page.goto(this.URL).catch(() => this.handleRequestError);

    const priceString = await page
      .$eval("#priceblock_ourprice", (el) => el.textContent)
      .catch(() => {
        this.handleNotFoundPrice();
        return;
      });

    if (!priceString) return;
    const price = this.parsePrice(priceString);

    this.handFoundPrice(price);

    if (price < this.good.price) {
      this.handleDiscount(price);
    }
    return;
  }
}
