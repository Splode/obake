import chalk from "chalk";
import puppeteer, { Page } from "puppeteer";
import Notifier from "src/message/Notifier";
import Logger from "../Logger";
import Store from "../Store";
import { elide, parsePrice } from "../strings";
import Good from "./Good";

export default abstract class Merchant {
  protected goods: Good[] = [];
  protected log: Logger | null;
  protected notifier: Notifier | null;
  protected store: Store;

  public constructor() {
    this.store = Store.get();
    this.notifier = this.store.notifier;
    this.log = this.store.logger;
  }

  public abstract get prettyName(): string;

  public abstract priceCheck(page: Page, good: Good): Promise<void>;

  public get isHeadless(): boolean {
    return true;
  }

  public get name(): string {
    return this.prettyName.toLowerCase().replace(" ", "");
  }

  public async checkGoods(): Promise<void> {
    if (this.goods.length <= 0) return;
    if (!this.hasActiveGood()) return;

    const verbose = this.store.config?.verbose;

    const browser = await puppeteer
      .launch({ headless: this.isHeadless })
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
    this.notifier?.send(msg);
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

  protected hasActiveGood(): boolean {
    return this.goods.some((good) => !good.disabled);
  }
}
