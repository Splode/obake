import * as puppeteer from "puppeteer";
import prettyPercent from "../strings";
import Good from "../Good";
import Telegram from "../telegram";

export default abstract class Merchant {
  public constructor(good: Good) {
    this.good = good;
    this.telegram = new Telegram();
  }
  protected good: Good;
  protected telegram: Telegram;
  public abstract URL: string;
  public abstract name: string;
  public abstract price: number;
  public abstract priceCheck(page: puppeteer.Page, good: Good): Promise<void>;

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
//   priceCheck(page: puppeteer.Page, good: Good): Promise<void>;
// }
