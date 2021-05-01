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
  const log = await new Logger().withFile();
  const cfg = await Config.getConfig(args.config).catch((err) => {
    log.crit(`failed to load config: ${err}`);
    process.exit(1);
  });
  const notifier = new Notifier(cfg);
  const store = Store.get();
  store.config = cfg;
  store.logger = log;
  store.notifier = notifier;

  log.info("starting obake...");

  const { goods } = cfg;

  // needed for disabling node warnings due to async browser launching
  EventEmitter.defaultMaxListeners = goods.length;

  const merchants = MerchantFactory.create(goods);
  merchants.forEach(async (merchant) => {
    await merchant.checkGoods();
  });
}
