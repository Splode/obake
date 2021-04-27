import AppStore from "./AppStore";
import getHost from "../url";
import Good from "../Good";
import Merchant from "./Merchant";

export default class MerchantFactory {
  public static create(good: Good): Merchant | null {
    return MerchantFactory.getMerchant(good);
  }

  private static getMerchant(good: Good) {
    const host = getHost(good.URL);
    switch (host) {
      case "apps.apple.com":
        return new AppStore(good);
      default:
        return null;
    }
  }
}
