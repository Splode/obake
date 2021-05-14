import Logger from "./Logger";
import Obake from "./Obake";
import Store from "./Store";

(async () => {
  await main();
})();

async function main() {
  const log = new Logger();
  const store = Store.get();
  await store.init().catch((err) => {
    log.crit(err.message);
    process.exit(1);
  });

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
