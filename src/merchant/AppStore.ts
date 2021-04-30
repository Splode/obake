import puppeteer from "puppeteer";
import Notifier from "../message/Notifier";
import Good from "./Good";
import Merchant from "./Merchant";

export default class AppStore extends Merchant {
  public constructor(notifier: Notifier) {
    super(notifier);
  }

  public get prettyName(): string {
    return "AppStore";
  }

  public async priceCheck(page: puppeteer.Page, good: Good): Promise<void> {
    await page
      .goto(good.URL, { waitUntil: "networkidle2" })
      .catch(() => this.handleRequestError);

    const priceString = await page
      .$eval(".app-header__list__item--price", (el) => el.textContent)
      .catch(() => {
        this.handleNotFoundPrice(good);
        return;
      });

    if (!priceString) return;
    const price = this.parsePrice(priceString);

    this.handFoundPrice(price, good);

    if (price < good.price) {
      this.handleDiscount(price, good);
    }
    return;
  }
}
