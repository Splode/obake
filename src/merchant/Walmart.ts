import puppeteer from "puppeteer";
import Good from "./Good";
import Merchant from "./Merchant";

export default class Walmart extends Merchant {
  public constructor() {
    super();
  }

  public get isHeadless(): boolean {
    return false;
  }

  public get prettyName(): string {
    return "Walmart";
  }

  public async priceCheck(page: puppeteer.Page, good: Good): Promise<void> {
    await page
      .goto(good.URL, { waitUntil: "networkidle2" })
      .catch((err) => this.requestError(err, good));

    const priceString = await page
      .$eval(".price .visuallyhidden", (el) => el.textContent)
      .catch(() => {
        this.handleNotFoundPrice(good);
        return;
      });

    const cartText = await page
      .$eval(".prod-ProductCTA--primary", (el) => el.textContent)
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
  }

  private isUnvailable(str: string): boolean {
    return !str.toLowerCase().includes("add");
  }
}
