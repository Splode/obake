import puppeteer from "puppeteer";
import IGood from "../config/IGood";
import Notifier from "../message/Notifier";
import Merchant from "./Merchant";

export default class BestBuy extends Merchant {
  public constructor(good: IGood, notifier: Notifier) {
    super(good, notifier);
  }

  public get isHeadless(): boolean {
    return false;
  }

  public async priceCheck(page: puppeteer.Page): Promise<void> {
    await page
      .goto(this.URL, { waitUntil: "networkidle2" })
      .catch(() => this.handleRequestError);

    const url = new URL(this.URL);
    const sku = url.searchParams.get("skuId")
    if (!sku) {
      // TODO: reject with error
      return
    }

    const priceString = await page
      .$eval(
        `[data-skuid='${sku}'] .priceView-customer-price > span`,
        (el) => el.textContent
      )
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
