import EventEmitter from "events";
import banner from "./banner";
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
    log.crit(`failed to load config: ${err.message}`);
    process.exit(1);
  });
  if (!cfg.disableLogFile) {
    await log.withFile().catch((err) => {
      log.error(err.message);
    });
  }
  const notifier = new Notifier(cfg);

  const store = Store.get();
  store.config = cfg;
  store.logger = log;
  store.notifier = notifier;

  const { goods, verbose } = cfg;

  if (verbose) {
    console.log(banner);
    log.info("starting obake...");
  }

  const merchants = MerchantFactory.create(goods);
  const gl = goods.length;
  // needed for disabling node warnings due to async browser launching
  if (gl > EventEmitter.defaultMaxListeners) {
    EventEmitter.defaultMaxListeners = gl;
  }
  if (verbose) {
    log.info(`checking for ${gl} good${gl > 1 ? "s" : ""}...`);
  }
  await Promise.all(merchants.map((merchant) => merchant.checkGoods())).catch(
    (err) => {
      log.error(err.message);
    }
  );

  if (verbose) {
    log.info("finished checking, exiting...");
  }

  process.exit(0);
}
