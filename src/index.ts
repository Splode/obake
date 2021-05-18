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

  process.once("SIGINT", async () => {
    await obake
      .teardown()
      .catch((err) => {
        log.error(err.message);
      })
      .finally(() => {
        process.exit(0);
      });
  });

  await obake.run().catch((err) => {
    log.error(err.message);
  });

  process.exit(0);
}
