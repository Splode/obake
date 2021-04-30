import EventEmitter from "events";
import { Config } from "./config/Config";
import parseFlags from "./flags";
import Logger from "./Logger";
import MerchantFactory from "./merchant/MerchantFactory";
import Notifier from "./message/Notifier";

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

  const merchants = MerchantFactory.create(cfg.goods, notifier);
  merchants.forEach(async (merchant) => {
    await merchant.checkGoods();
  });
}
