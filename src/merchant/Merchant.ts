import puppeteer from "puppeteer";
import { parsePrice } from "../strings";
import Good from "./Good";
import Logger from "../Logger";
import Notifier from "src/message/Notifier";

export default abstract class Merchant {
  protected goods: Good[] = [];
  protected log: Logger;
  protected notifier: Notifier;

  public constructor(notifier: Notifier) {
    this.notifier = notifier;
    this.log = new Logger();
  }

  public get isHeadless(): boolean {
    return true;
  }

  public abstract get name(): string;

  public abstract priceCheck(page: puppeteer.Page, good: Good): Promise<void>;

  public async checkGoods(): Promise<void> {
    // TODO: check if there's at least 1 good that isn't disabled
    if (this.goods.length <= 0) return;
    const browser = await puppeteer
      .launch({ headless: this.isHeadless })
      .catch((err) => {
        throw err;
      });

    const check = async (good: Good) => {
      if (!good.disabled) {
        const page = await browser.newPage().catch((err) => {
          this.log.error(err);
        });
        if (page) {
          await this.priceCheck(page, good).catch((err) => {
            this.log.error(err);
          });
          await page.close().catch((err) => {
            this.log.error(err);
          });
        }
      }
    };
    await Promise.all(this.goods.map(check));

    await browser.close().catch((err) => {
      throw err;
    });
  }

  public addGoods(...goods: Good[]): void {
    goods.forEach((g) => this.goods.push(g));
  }

  protected parsePrice(ps: string): number {
    return parsePrice(ps);
  }

  protected handleDiscount(price: number, good: Good): void {
    const msg = good.getDiscountText(price);
    this.log.info(msg);
    this.notifier.send(msg);
  }

  protected handFoundPrice(price: number, good: Good): void {
    this.log.info(good.getFoundPriceText(price));
  }

  protected handleNotFoundPrice(good: Good): void {
    this.log.warn(good.getNotFoundPriceText());
  }

  protected handleRequestError(good: Good): void {
    const err = new Error(`failed to make request: ${good.URL}`);
    this.log.error(err.message);
    throw err;
  }
}

// interface IChecker {
//   priceCheck(page: puppeteer.Page, good: IGood): Promise<void>;
// }
