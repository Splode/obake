import Merchant from "./Merchant";
import Good from "../Good";
import puppeteer from "puppeteer";

export default class Amazon extends Merchant {
  public constructor(good: Good) {
    super(good);
  }

  public async priceCheck(page: puppeteer.Page, good: Good): Promise<void> {
    await page.goto(good.URL);
    const priceString = await page.$eval(
      "#priceblock_ourprice",
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
}
