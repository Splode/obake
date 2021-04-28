import puppeteer from "puppeteer";
import { Config } from "./config/Config";
import MerchantFactory from "./merchant/MerchantFactory";
import parseFlags from "./flags";
import Logger from "./Logger";
import Notifier from "./message/Notifier";

(async () => {
  await main();
})();

async function main() {
  const args = parseFlags(process.argv);
  const log = new Logger();
  const cfg = await Config.getConfig(args.config);

  if (!cfg) {
    log.crit(`failed to load config`);
    process.exit(1);
  }

  log.info("starting obake...");

  const notifier = new Notifier(cfg);

  const browser = await puppeteer.launch().catch((error) => {
    log.crit(`failed to launch puppeteer instance: ${error}`);
    process.exit(1);
  });

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

  await browser.close().catch((err) => {
    log.crit(`failed to dispose browser: ${err}`);
    process.exit(1);
  });
}
