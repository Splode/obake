import puppeteer from "puppeteer";
import Notifier from "../message/Notifier";
import IGood from "../config/IGood";
import Merchant from "./Merchant";

export default class AppStore extends Merchant {
  public constructor(good: IGood, notifier: Notifier) {
    super(good, notifier);
  }

  public async priceCheck(page: puppeteer.Page): Promise<void> {
    await page.goto(this.URL).catch(() => this.handleRequestError);

    const priceString = await page
      .$eval(".app-header__list__item--price", (el) => el.textContent)
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
