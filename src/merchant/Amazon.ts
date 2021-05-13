import puppeteer from "puppeteer";
import Good from "./Good";
import Merchant from "./Merchant";

export default class Amazon extends Merchant {
  public constructor() {
    super();
  }

  public get isHeadless(): boolean {
    return false;
  }

  public get prettyName(): string {
    return "Amazon";
  }

  public async priceCheck(page: puppeteer.Page, good: Good): Promise<void> {
    await page
      .goto(good.URL, { waitUntil: "networkidle2" })
      .catch((err) => this.requestError(err, good));

    const priceString = await page
      .$eval("#priceblock_ourprice", (el) => el.textContent)
      .catch(() => {
        this.handleNotFoundPrice(good);
        return;
      });

    if (!priceString) return;
    const price = this.parsePrice(priceString);

    this.handFoundPrice(price, good);

    if (price < good.price) {
      await this.handleDiscount(price, good);
    }
  }
}
