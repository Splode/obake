import puppeteer from "puppeteer";
import { Config } from "./config/Config";
import MerchantFactory from "./merchant/MerchantFactory";

main();

async function main() {
  const cfg = await Config.getConfig();

  const browser = await puppeteer.launch();

  for (const good of cfg.goods) {
    const merchant = MerchantFactory.create(good);
    if (merchant) {
      const page = await browser.newPage();
      await merchant.priceCheck(page);
      await page.close();
    }
  }

  await browser.close();
}
