import Notifier from "../message/Notifier";
import getHost from "../url";
import Good from "./Good";
import Amazon from "./Amazon";
import AppStore from "./AppStore";
import BestBuy from "./BestBuy";
import Merchant from "./Merchant";
import NewEgg from "./NewEgg";
import REI from "./REI";
import Walmart from "./Walmart";

export default class MerchantFactory {
  public static create(goods: Good[], notifier: Notifier): Merchant[] {
    const mLs: Merchant[] = [];

    goods.forEach((good) => {
      let m: Merchant | null = null;
      switch (getHost(good.URL)) {
        case "www.bestbuy.com":
          m = MerchantFactory.findByName("bestbuy", mLs);
          if (!m) {
            m = new BestBuy(notifier);
            mLs.push(m);
          }
          break;
        case "apps.apple.com":
          m = MerchantFactory.findByName("appstore", mLs);
          if (!m) {
            m = new AppStore(notifier);
            mLs.push(m);
          }
          break;
        case "www.amazon.com":
          m = MerchantFactory.findByName("amazon", mLs);
          if (!m) {
            m = new Amazon(notifier);
            mLs.push(m);
          }
          break;
        case "www.newegg.com":
          m = MerchantFactory.findByName("newegg", mLs);
          if (!m) {
            m = new NewEgg(notifier);
            mLs.push(m);
          }
          break;
        case "www.rei.com":
          m = MerchantFactory.findByName("rei", mLs);
          if (!m) {
            m = new REI(notifier);
            mLs.push(m);
          }
          break;
        case "www.walmart.com":
          m = MerchantFactory.findByName("walmart", mLs);
          if (!m) {
            m = new Walmart(notifier);
            mLs.push(m);
          }
          break;
        default:
          break;
      }

      m?.addGoods(good);
    });

    return mLs;
  }

  private static findByName(name: string, list: Merchant[]): Merchant | null {
    return list.find((m) => m.name === name) || null;
  }
}
