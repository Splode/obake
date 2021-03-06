import Store from "../Store";
import JensonUSA from "./JensonUSA";
import getHost from "../url";
import Amazon from "./Amazon";
import AppStore from "./AppStore";
import BandH from "./BandH";
import BestBuy from "./BestBuy";
import Costco from "./Costco";
import Good from "./Good";
import Merchant from "./Merchant";
import NewEgg from "./NewEgg";
import REI from "./REI";
import Walmart from "./Walmart";
import Zavvi from "./Zavvi";

export default class MerchantFactory {
  public static create(goods: Good[]): Merchant[] {
    const mLs: Merchant[] = [];

    goods.forEach((good) => {
      let m: Merchant | null = null;
      let host: string;
      try {
        host = getHost(good.URL);
      } catch (error) {
        Store.get().logger?.error(
          `failed to get hostname from URL: ${good.URL}`
        );
        return;
      }

      switch (host) {
        case "apps.apple.com":
          m = MerchantFactory.findByName("appstore", mLs);
          if (!m) {
            m = new AppStore();
            mLs.push(m);
          }
          break;
        case "www.amazon.com":
          m = MerchantFactory.findByName("amazon", mLs);
          if (!m) {
            m = new Amazon();
            mLs.push(m);
          }
          break;
        case "www.bhphotovideo.com":
          m = MerchantFactory.findByName("b&h", mLs);
          if (!m) {
            m = new BandH();
            mLs.push(m);
          }
          break;
        case "www.bestbuy.com":
          m = MerchantFactory.findByName("bestbuy", mLs);
          if (!m) {
            m = new BestBuy();
            mLs.push(m);
          }
          break;
        case "www.costco.com":
          m = MerchantFactory.findByName("costco", mLs);
          if (!m) {
            m = new Costco();
            mLs.push(m);
          }
          break;
        case "www.jensonusa.com":
          m = MerchantFactory.findByName("jensonusa", mLs);
          if (!m) {
            m = new JensonUSA();
            mLs.push(m);
          }
          break;
        case "www.newegg.com":
          m = MerchantFactory.findByName("newegg", mLs);
          if (!m) {
            m = new NewEgg();
            mLs.push(m);
          }
          break;
        case "www.rei.com":
          m = MerchantFactory.findByName("rei", mLs);
          if (!m) {
            m = new REI();
            mLs.push(m);
          }
          break;
        case "www.walmart.com":
          m = MerchantFactory.findByName("walmart", mLs);
          if (!m) {
            m = new Walmart();
            mLs.push(m);
          }
          break;
        case "us.zavvi.com":
          m = MerchantFactory.findByName("zavvi", mLs);
          if (!m) {
            m = new Zavvi();
            mLs.push(m);
          }
          break;
        default:
          break;
      }

      m?.addGoods(good);
      good.merchant = m || null;
    });

    return mLs;
  }

  private static findByName(name: string, list: Merchant[]): Merchant | null {
    return list.find((m) => m.name === name) || null;
  }
}
