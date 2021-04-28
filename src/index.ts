import puppeteer from "puppeteer";
import { Config } from "./config/Config";
import MerchantFactory from "./merchant/MerchantFactory";
import parseFlags from "./flags";
import Logger from "./Logger";
import Notifier from "./message/Notifier";

main();

async function main() {
  const args = parseFlags(process.argv);
  const log = new Logger();
  const cfg = await Config.getConfig(args.config);

  if (!cfg) {
    log.error(`failed to load config`);
    process.exit(1);
  }

  log.info("starting obake...");

  const notifier = new Notifier(cfg);

  const browser = await puppeteer.launch();

  for (const good of cfg.goods) {
    if (!good.disabled) {
      const merchant = MerchantFactory.create(good, notifier);
      if (merchant) {
        const page = await browser.newPage();
        await merchant.priceCheck(page);
        await page.close();
      }
    }
  }

  await browser.close();
}
