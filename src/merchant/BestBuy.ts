import puppeteer from "puppeteer";
import Good from "./Good";
import Merchant from "./Merchant";

export default class BestBuy extends Merchant {
  public constructor() {
    super();
  }

  public get isHeadless(): boolean {
    return false;
  }

  public get prettyName(): string {
    return "Best Buy";
  }

  public async priceCheck(page: puppeteer.Page, good: Good): Promise<void> {
    await page
      .goto(good.URL, { waitUntil: "networkidle2" })
      .catch((err) => this.requestError(err, good));

    const url = new URL(good.URL);
    const sku = url.searchParams.get("skuId");
    if (!sku) {
      throw new Error(`unable to find product SKU from URL: ${good.URL}`);
    }

    const priceString = await page
      .$eval(
        `[data-skuid='${sku}'] .priceView-customer-price > span`,
        (el) => el.textContent
      )
      .catch(() => {
        this.handleNotFoundPrice(good);
        return;
      });

    const cartText = await page
      .$eval(".add-to-cart-button", (el) => el.textContent)
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

    this.handleFoundPrice(price, good);

    if (price < good.price) {
      await this.handleDiscount(price, good);
    }
  }

  private isUnvailable(str: string): boolean {
    return str.toLowerCase().includes("sold");
  }
}
