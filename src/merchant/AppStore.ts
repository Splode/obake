import puppeteer from "puppeteer";
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

    console.log(this.handFoundPrice(price));

    if (price < this.good.price) {
      console.log(this.handleDiscount(price));
    }
    return;
  }

  private parsePrice(ps: string): number {
    const priceString = ps.substring(1);
    return parseFloat(priceString);
  }
}
