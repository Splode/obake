import { Config } from "./config/Config";
import parseFlags from "./flags";
import Logger from "./Logger";
import Notifier from "./message/Notifier";
import Obake from "./Obake";
import State from "./State";
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

  const store = Store.get();
  store.config = cfg;
  store.logger = log;
  store.notifier = new Notifier(cfg);
  store.state = new State();
  const obake = new Obake(store);
  await obake.init().catch((err) => {
    log.crit(err.message);
    process.exit(1);
  });

  await obake.run().catch((err) => {
    log.error(err.message);
  });

  process.exit(0);
}
