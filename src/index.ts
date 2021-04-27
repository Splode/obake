import puppeteer from "puppeteer";
import { Config } from "./config/Config";
import MerchantFactory from "./merchant/MerchantFactory";
import parseFlags from "./flags";
import Logger from "./Logger";

main();

async function main() {
  const args = parseFlags(process.argv);
  const log = new Logger();
  console.log(args);
  const cfg = await Config.getConfig(args.config);

  if (!cfg) {
    log.error(`failed to load config`);
    process.exit(1);
  }

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
