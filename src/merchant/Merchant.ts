import puppeteer from "puppeteer";
import { parsePrice, prettyPercent } from "../strings";
import IGood from "../config/IGood";
import TelegramClient from "../Telegram";
import Logger from "../Logger";

export default abstract class Merchant {
  public constructor(good: IGood) {
    this.good = good;
    this.telegram = new TelegramClient();
    this.log = new Logger();
  }
  protected good: IGood;
  protected telegram: TelegramClient;
  protected log: Logger;

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
    this.log.info(this.getDiscountText(price));
  }

  protected handFoundPrice(price: number): void {
    this.log.info(this.getFoundPriceText(price));
  }

  protected handleNotFoundPrice(): void {
    this.log.error(this.getNotFoundPriceText());
  }

  private getDiscountText(price: number): string {
    const msg = `found ${prettyPercent(price, this.price)} discount for ${
      this.name
    }: ${this.URL}`;
    this.telegram.sendMessage(msg);
    return msg;
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
