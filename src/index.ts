import puppeteer from "puppeteer";
import { Config } from "./config/Config";
import MerchantFactory from "./merchant/MerchantFactory";
import parseFlags from "./flags";

main();

async function main() {
  const args = parseFlags(process.argv);
  console.log(args);
  const cfg = await Config.getConfig(args.config);

  const browser = await puppeteer.launch();

  for (const good of cfg.goods) {
    if (!good.disabled) {
      const merchant = MerchantFactory.create(good);
      if (merchant) {
        const page = await browser.newPage();
        await merchant.priceCheck(page);
        await page.close();
      }
    }
  }

  await browser.close();
  process.exit(0);
}
