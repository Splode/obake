import puppeteer from "puppeteer";
import prettyPercent from "../strings";
import Good from "../Good";
import Merchant from "./Merchant";

export default class AppStore extends Merchant {
  public constructor(good: Good) {
    super(good);
  }

  public get URL(): string {
    return this.good.URL;
  }

  public get name(): string {
    return this.good.name;
  }

  public get price(): number {
    return this.good.price;
  }

  public async priceCheck(page: puppeteer.Page, good: Good): Promise<void> {
    await page.goto(good.URL);
    const priceString = await page.$eval(
      ".app-header__list__item--price",
      (el) => el.textContent
    );

    if (!priceString) return;
    const price = this.parsePrice(priceString);

    console.log(`found price ${price} for ${this.name}`);

    if (price < this.good.price) {
      console.log(
        `found ${prettyPercent(price, this.price)} discount for ${this.name}: ${
          this.URL
        }`
      );
    }
    return;
  }

  private parsePrice(ps: string): number {
    const priceString = ps.substring(1);
    return parseFloat(priceString);
  }
}
