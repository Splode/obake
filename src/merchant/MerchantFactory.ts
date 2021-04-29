import Notifier from "../message/Notifier";
import IGood from "../config/IGood";
import getHost from "../url";
import Amazon from "./Amazon";
import AppStore from "./AppStore";
import Merchant from "./Merchant";
import NewEgg from "./NewEgg";
import REI from "./REI";
import Walmart from "./Walmart";
import BestBuy from "./BestBuy";

export default class MerchantFactory {
  public static create(good: IGood, notifier: Notifier): Merchant | null {
    return MerchantFactory.getMerchant(good, notifier);
  }

  private static getMerchant(good: IGood, notifier: Notifier) {
    const host = getHost(good.URL);
    switch (host) {
      case "www.bestbuy.com":
        return new BestBuy(good, notifier);
      case "apps.apple.com":
        return new AppStore(good, notifier);
      case "www.amazon.com":
        return new Amazon(good, notifier);
      case "www.newegg.com":
        return new NewEgg(good, notifier);
      case "www.rei.com":
        return new REI(good, notifier);
      case "www.walmart.com":
        return new Walmart(good, notifier);
      default:
        return null;
    }
  }
}
