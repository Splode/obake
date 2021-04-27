import * as puppeteer from "puppeteer";
import Good from "../Good";

export default abstract class Merchant {
  public constructor(good: Good) {
    this.good = good;
  }
  protected good: Good;
  public abstract URL: string;
  public abstract name: string;
  public abstract price: number;
  public abstract priceCheck(page: puppeteer.Page, good: Good): Promise<void>;
}

// interface IChecker {
//   priceCheck(page: puppeteer.Page, good: Good): Promise<void>;
// }
