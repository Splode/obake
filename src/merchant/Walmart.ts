import puppeteer from "puppeteer";
import Good from "./Good";
import Notifier from "../message/Notifier";
import Merchant from "./Merchant";

export default class Walmart extends Merchant {
  public constructor(notifier: Notifier) {
    super(notifier);
  }

  public get isHeadless(): boolean {
    return false;
  }

  public get name(): string {
    return "walmart";
  }

  public async priceCheck(page: puppeteer.Page, good: Good): Promise<void> {
    await page
      .goto(good.URL, { waitUntil: "networkidle2" })
      .catch(() => this.handleRequestError);

    const priceString = await page
      .$eval(".price .visuallyhidden", (el) => el.textContent)
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
  }
}
