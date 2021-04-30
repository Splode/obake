import IDisableable from "../config/IDisableable";
import { prettyPercent } from "../strings";
import Merchant from "./Merchant";

export interface IGood extends IDisableable {
  URL: string;
  name: string;
  price: number;
}

export default class Good implements IGood {
  public URL: string;
  public name: string;
  public price: number;
  public disabled: boolean;
  public merchant: Merchant | null = null;

  public constructor(good: IGood) {
    this.URL = good.URL;
    this.name = good.name;
    this.price = good.price;
    this.disabled = good.disabled || false;
  }

  public getDiscountText(price: number): string {
    return `found ${prettyPercent(price, this.price)} discount for ${
      this.name
    }: ${this.URL}`;
  }

  public getFoundPriceText(price: number): string {
    return `found price ${price} for ${this.name} at ${this.merchant?.prettyName}`;
  }

  public getNotFoundPriceText(): string {
    return `unable to find price data for ${this.name}: ${this.URL}`;
  }
}
