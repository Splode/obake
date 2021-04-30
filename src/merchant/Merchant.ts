import chalk from "chalk";
import puppeteer from "puppeteer";
import Notifier from "src/message/Notifier";
import Logger from "../Logger";
import Store from "../Store";
import { elide, parsePrice } from "../strings";
import Good from "./Good";

export default abstract class Merchant {
  protected goods: Good[] = [];
  protected log: Logger | null;
  protected notifier: Notifier;

  public constructor(notifier: Notifier) {
    this.notifier = notifier;
    this.log = Store.get().logger;
  }

  public abstract get prettyName(): string;

  public abstract priceCheck(page: puppeteer.Page, good: Good): Promise<void>;

  public get isHeadless(): boolean {
    return true;
  }

  public get name(): string {
    return this.prettyName.toLowerCase().replace(" ", "");
  }

  public async checkGoods(): Promise<void> {
    if (this.goods.length <= 0) return;
    if (!this.hasActiveGood()) return;

    const browser = await puppeteer
      .launch({ args: ["--disable-gpu"], headless: this.isHeadless })
      .catch((err) => {
        throw err;
      });

    const check = async (good: Good) => {
      if (!good.disabled) {
        const page = await browser.newPage().catch((err) => {
          this.log?.error(err);
        });
        if (page) {
          await this.priceCheck(page, good).catch((err) => {
            this.log?.error(err);
          });
          await page.close().catch((err) => {
            this.log?.error(err);
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

  protected handleUnavailable(good: Good): void {
    this.log?.info(
      `${elide(good.name)} ${chalk.yellow("unavailable")} for purchase at ${
        this.prettyName
      }: ${good.URL}`
    );
  }

  protected handleDiscount(price: number, good: Good): void {
    const msg = good.getDiscountText(price);
    this.log?.info(chalk.green(msg));
    this.notifier.send(msg);
  }

  protected handFoundPrice(price: number, good: Good): void {
    this.log?.info(good.getFoundPriceText(price));
  }

  protected handleNotFoundPrice(good: Good): void {
    this.log?.warn(good.getNotFoundPriceText());
  }

  protected handleRequestError(good: Good): void {
    const err = new Error(`failed to make request: ${good.URL}`);
    this.log?.error(err.message);
    throw err;
  }

  private hasActiveGood(): boolean {
    return this.goods.some((good) => !good.disabled);
  }
}
