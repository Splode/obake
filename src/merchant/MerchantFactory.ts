import Notifier from "../message/Notifier";
import IGood from "../config/IGood";
import getHost from "../url";
import Amazon from "./Amazon";
import AppStore from "./AppStore";
import Merchant from "./Merchant";
import REI from "./REI";

export default class MerchantFactory {
  public static create(good: IGood, notifier: Notifier): Merchant | null {
    return MerchantFactory.getMerchant(good, notifier);
  }

  private static getMerchant(good: IGood, notifier: Notifier) {
    const host = getHost(good.URL);
    switch (host) {
      case "www.amazon.com":
        return new Amazon(good, notifier);
      case "apps.apple.com":
        return new AppStore(good, notifier);
      case "www.rei.com":
        return new REI(good, notifier);
      default:
        return null;
    }
  }
}
