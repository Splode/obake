import puppeteer from "puppeteer";
import Good from "./Good";
import Merchant from "./Merchant";

export default class REI extends Merchant {
  public constructor() {
    super();
  }

  public get prettyName(): string {
    return "REI";
  }

  public async priceCheck(page: puppeteer.Page, good: Good): Promise<void> {
    await page.goto(good.URL).catch(() => this.handleRequestError);

    const priceString = await page
      .$eval(".product-current-price > span", (el) => el.textContent)
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
