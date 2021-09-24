import puppeteer from "puppeteer";
import Good from "./Good";
import Merchant from "./Merchant";

export default class Zavvi extends Merchant {
  public constructor() {
    super();
  }

  public get prettyName(): string {
    return "Zavvi";
  }

  public async priceCheck(page: puppeteer.Page, good: Good): Promise<void> {
    await page.goto(good.URL).catch((err) => this.requestError(err, good));

    const priceString = await page
      .$eval('[data-product-price="price"]', (el) => el.textContent?.trim())
      .catch(() => {
        this.handleNotFoundPrice(good);
        return;
      });

    const saleString = await page
      .$eval(".tokyoProductPage_papBanner #pap-banner-text-value", (el) =>
        el.textContent?.replace(/[A-z+:-]/g, "")?.trim()
      )
      .catch(() => {
        if (priceString) {
          const price = this.parsePrice(priceString);
          this.handleFoundPrice(price, good);
        }
        return;
      });

    if (!saleString) return;
    const price = this.parsePrice(saleString);

    this.handleFoundPrice(price, good);

    if (price < good.price) {
      await this.handleDiscount(price, good);
    }
    return;
  }
}
