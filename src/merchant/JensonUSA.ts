import puppeteer from "puppeteer";
import Good from "./Good";
import Merchant from "./Merchant";

export default class JensonUSA extends Merchant {
  public constructor() {
    super();
  }

  public get prettyName(): string {
    return "JensonUSA";
  }

  public async priceCheck(page: puppeteer.Page, good: Good): Promise<void> {
    await page
      .goto(good.URL, { waitUntil: "networkidle2" })
      .catch((err) => this.requestError(err, good));

    const priceString = await page
      .$eval("#price", (el) => el.getAttribute("data-price"))
      .catch(() => {
        this.handleNotFoundPrice(good);
        return;
      });

    const cartText = await page
      .$eval("#btnAddToCart", (el) => el.textContent)
      .catch(() => {
        return;
      });

    await Promise.all([priceString, cartText]);

    if (this.isUnvailable(String(cartText))) {
      this.handleUnavailable(good);
      return;
    }

    if (!priceString) return;
    const price = this.parsePrice(priceString);

    this.handFoundPrice(price, good);

    if (price < good.price) {
      await this.handleDiscount(price, good);
    }
    return;
  }

  private isUnvailable(str: string): boolean {
    return !str.toLowerCase().includes("add");
  }
}
