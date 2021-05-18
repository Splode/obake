import EventEmitter from "events";
import banner from "./banner";
import Logger from "./Logger";
import Merchant from "./merchant/Merchant";
import MerchantFactory from "./merchant/MerchantFactory";
import Store from "./Store";

export default class Obake {
  private merchants: Merchant[] = [];
  private store: Store | null = null;
  private interval: NodeJS.Timeout | null = null;

  public constructor(store: Store) {
    this.store = store;
  }

  public async init(): Promise<void> {
    if (!this.store?.config) {
      throw new Error(`failed to find config from store`);
    }
    this.merchants = MerchantFactory.create(this.store.config.goods);
    const gl = this.merchants.length;
    // needed for disabling node warnings due to async browser launching
    if (gl > EventEmitter.defaultMaxListeners) {
      EventEmitter.defaultMaxListeners = gl;
    }
  }

  public async run(): Promise<void> {
    if (this.store?.config?.verbose) {
      console.log(banner);
      this.logger?.info("starting Obake...");
    }

    await this.check();

    if (this.store?.config?.interval) {
      const int = this.store.config.interval * 60 * 1e3;
      return await new Promise(() => {
        this.interval = setInterval(async () => {
          if (!this.store?.state?.isRunning) {
            await this.check();
          }
        }, int);
      });
    }
  }

  public async teardown(): Promise<void> {
    if (this.store?.config?.verbose) {
      this.logger?.info("cleaning up and shutting down Obake...");
    }

    if (this.interval) {
      clearInterval(this.interval);
    }

    await Promise.all(this.merchants.map((merchant) => merchant.close())).catch(
      (err) => {
        throw err;
      }
    );
  }

  private async check(): Promise<void> {
    const verbose = this.store?.config?.verbose;
    const gl = this.store?.config?.goods.length || 0;

    if (gl < 1) {
      return;
    }

    this.store?.state?.setIsRunning(true);

    if (verbose) {
      this.logger?.info(`checking for ${gl} good${gl > 1 ? "s" : ""}...`);
    }

    await Promise.all(
      this.merchants.map((merchant) => merchant.checkGoods())
    ).catch((err) => {
      this.logger?.error(err.message);
    });

    if (verbose) {
      this.logger?.info("Obake finished checking");
    }

    this.store?.state?.setIsRunning(false);
  }

  private get logger(): Logger | null {
    return this.store?.logger || null;
  }
}
