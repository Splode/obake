import EventEmitter from "events";
import { Config } from "./config/Config";
import parseFlags from "./flags";
import Logger from "./Logger";
import MerchantFactory from "./merchant/MerchantFactory";
import Notifier from "./message/Notifier";
import Store from "./Store";

(async () => {
  await main();
})();

async function main() {
  const args = parseFlags(process.argv);
  const log = new Logger();
  const cfg = await Config.get(args).catch((err) => {
    log.crit(`failed to load config: ${err}`);
    process.exit(1);
  });
  if (!cfg.disableLogFile) {
    await log.withFile().catch((err) => {
      log.error(err);
    });
  }
  const notifier = new Notifier(cfg);

  const store = Store.get();
  store.config = cfg;
  store.logger = log;
  store.notifier = notifier;

  const { goods, verbose } = cfg;

  if (verbose) {
    log.info("starting obake...");
  }

  // needed for disabling node warnings due to async browser launching
  if (goods.length > EventEmitter.defaultMaxListeners) {
    EventEmitter.defaultMaxListeners = goods.length;
  }

  const merchants = MerchantFactory.create(goods);
  await Promise.all(merchants.map((merchant) => merchant.checkGoods())).catch(
    (err) => {
      log.error(err);
    }
  );

  if (verbose) {
    log.info("obake finished checking, exiting...");
  }

  process.exit(0);
}
