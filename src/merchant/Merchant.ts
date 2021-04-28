import puppeteer from "puppeteer";
import { parsePrice, prettyPercent } from "../strings";
import IGood from "../config/IGood";
import Logger from "../Logger";
import Notifier from "src/message/Notifier";

export default abstract class Merchant {
  public constructor(good: IGood, notifier: Notifier) {
    this.good = good;
    this.notifier = notifier;
    this.log = new Logger();
  }
  protected good: IGood;
  protected log: Logger;
  protected notifier: Notifier;

  public abstract priceCheck(page: puppeteer.Page): Promise<void>;

  public get URL(): string {
    return this.good.URL;
  }

  public get name(): string {
    return this.good.name;
  }

  public get price(): number {
    return this.good.price;
  }

  protected parsePrice(ps: string): number {
    return parsePrice(ps);
  }

  protected handleDiscount(price: number): void {
    const msg = this.getDiscountText(price);
    this.log.info(msg);
    this.notifier.send(msg);
  }

  protected handFoundPrice(price: number): void {
    this.log.info(this.getFoundPriceText(price));
  }

  protected handleNotFoundPrice(): void {
    this.log.error(this.getNotFoundPriceText());
  }

  private getDiscountText(price: number): string {
    return `found ${prettyPercent(price, this.price)} discount for ${
      this.name
    }: ${this.URL}`;
  }

  private getFoundPriceText(price: number): string {
    return `found price ${price} for ${this.name}`;
  }

  private getNotFoundPriceText(): string {
    return `unable to find price data for ${this.name}: ${this.URL}`;
  }
}

// interface IChecker {
//   priceCheck(page: puppeteer.Page, good: IGood): Promise<void>;
// }
