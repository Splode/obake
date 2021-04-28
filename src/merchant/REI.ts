import IGood from "../config/IGood";
import Merchant from "./Merchant";
import puppeteer from "puppeteer";
import Notifier from "../message/Notifier";

export default class REI extends Merchant {
  public constructor(good: IGood, notifier: Notifier) {
    super(good, notifier);
  }

  public async priceCheck(page: puppeteer.Page): Promise<void> {
    await page.goto(this.URL).catch((error) => {
      this.log.error(`failed to make request: ${error}`);
      return;
    });

    const priceString = await page
      .$eval(".product-current-price > span", (el) => el.textContent)
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
