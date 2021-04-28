import puppeteer from "puppeteer";
import IGood from "../config/IGood";
import Notifier from "../message/Notifier";
import Merchant from "./Merchant";

export default class NewEgg extends Merchant {
  public constructor(good: IGood, notifier: Notifier) {
    super(good, notifier);
  }

  public async priceCheck(page: puppeteer.Page): Promise<void> {
    await page
      .goto(this.URL, { waitUntil: "networkidle2" })
      .catch(() => this.handleRequestError);

    const priceString = await page
      .$eval(".price-current", (el) => el.textContent)
      .catch(() => {
        this.handleNotFoundPrice();
        return;
      });

    if (!priceString) return;
    const price = this.parsePrice(priceString);

    this.handFoundPrice(price);

    if (price < this.price) {
      this.handleDiscount(price);
    }
  }
}
