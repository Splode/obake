import puppeteer from "puppeteer";
import IGood from "../config/IGood";
import Merchant from "./Merchant";

export default class AppStore extends Merchant {
  public constructor(good: IGood) {
    super(good);
  }

  public async priceCheck(page: puppeteer.Page): Promise<void> {
    await page.goto(this.URL);

    let priceString: string | null;
    try {
      priceString = await page.$eval(
        ".app-header__list__item--price",
        (el) => el.textContent
      );
    } catch (error) {
      console.log(this.handleNotFoundPrice());
      return;
    }

    if (!priceString) return;
    const price = this.parsePrice(priceString);

    console.log(this.handFoundPrice(price));

    if (price < this.good.price) {
      console.log(this.handleDiscount(price));
    }
    return;
  }
}
