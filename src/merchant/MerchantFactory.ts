import Good from "../config/Good";
import getHost from "../url";
import Amazon from "./Amazon";
import AppStore from "./AppStore";
import Merchant from "./Merchant";
import REI from "./REI";

export default class MerchantFactory {
  public static create(good: Good): Merchant | null {
    return MerchantFactory.getMerchant(good);
  }

  private static getMerchant(good: Good) {
    const host = getHost(good.URL);
    switch (host) {
      case "www.amazon.com":
        return new Amazon(good);
      case "apps.apple.com":
        return new AppStore(good);
      case "www.rei.com":
        return new REI(good);
      default:
        return null;
    }
  }
}
