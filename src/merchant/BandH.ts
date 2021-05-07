import { Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import Good from "./Good";
import Merchant from "./Merchant";

export default class BandH extends Merchant {
  public constructor() {
    super();
  }

  public get prettyName(): string {
    return "B and H Photo Video";
  }

  public async checkGoods(): Promise<void> {
    if (this.goods.length <= 0) return;
    if (!this.hasActiveGood()) return;

    const verbose = this.store.config?.verbose;

    const browser = await puppeteer
      .use(StealthPlugin())
      .launch()
      .catch((err) => {
        throw err;
      });

    const check = async (good: Good) => {
      if (!good.disabled) {
        const page = await browser.newPage().catch((err) => {
          this.log?.error(err);
        });
        if (page) {
          if (verbose) {
            this.log?.info(`checking for ${good.name} at ${good.URL}...`);
          }

          await this.priceCheck(page, good).catch((err) => {
            this.log?.error(err);
          });
          await page.close().catch((err) => {
            this.log?.error(err);
          });
        }
      } else {
        if (verbose) {
          this.log?.info(`skipping due to disabled configuration: ${good.URL}`);
        }
      }
    };
    await Promise.all(this.goods.map(check));

    await browser.close().catch((err) => {
      throw err;
    });
  }

  public async priceCheck(page: Page, good: Good): Promise<void> {
    await page
      .goto(good.URL, { waitUntil: "networkidle2" })
      .catch(() => this.handleRequestError);

    const priceString = await page
      .$eval("[data-selenium='pricingPrice']", (el) => el.textContent)
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
  }
}
