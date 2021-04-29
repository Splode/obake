import puppeteer from "puppeteer";
import { Config } from "./config/Config";
import MerchantFactory from "./merchant/MerchantFactory";
import parseFlags from "./flags";
import Logger from "./Logger";
import Notifier from "./message/Notifier";
import EventEmitter from "events";

(async () => {
  await main();
})();

async function main() {
  const args = parseFlags(process.argv);
  const log = new Logger();
  const cfg = await Config.getConfig(args.config).catch((err) => {
    log.crit(`failed to load config: ${err}`);
    process.exit(1);
  });

  log.info("starting obake...");

  const notifier = new Notifier(cfg);

  // needed for disabling node warnings due to async browser launching
  EventEmitter.defaultMaxListeners = cfg.goods.length;

  cfg.goods.forEach(async (good) => {
    if (!good.disabled) {
      const merchant = MerchantFactory.create(good, notifier);
      if (merchant) {
        const browser = await puppeteer
          .launch({ headless: merchant.isHeadless })
          .catch((error) => {
            log.crit(`failed to launch puppeteer instance: ${error}`);
            process.exit(1);
          });
        const page = await browser.newPage();
        await merchant.priceCheck(page);
        await page.close();
        await browser.close().catch((err) => {
          log.crit(`failed to dispose browser: ${err}`);
          process.exit(1);
        });
      }
    }
  });
}
