import puppeteer from "puppeteer";
import { parsePrice, prettyPercent } from "../strings";
import IGood from "../config/IGood";
import Telegram from "../Telegram";

export default abstract class Merchant {
  public constructor(good: IGood) {
    this.good = good;
    this.telegram = new Telegram();
  }
  protected good: IGood;
  protected telegram: Telegram;

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

  public handleDiscount(price: number): string {
    const msg = `found ${prettyPercent(price, this.price)} discount for ${
      this.name
    }: ${this.URL}`;
    this.telegram.sendMessage(msg);
    return msg;
  }

  public handFoundPrice(price: number): string {
    return `found price ${price} for ${this.name}`;
  }

  public handleNotFoundPrice(): string {
    return `unable to find price data for ${this.name}: ${this.URL}`;
  }
}

// interface IChecker {
//   priceCheck(page: puppeteer.Page, good: IGood): Promise<void>;
// }
