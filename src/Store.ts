import { Config } from "./config/Config";
import Logger from "./Logger";
import Notifier from "./message/Notifier";

export default class Store {
  private static instance: Store;

  public static get(): Store {
    if (!Store.instance) {
      this.instance = new Store();
    }
    return this.instance;
  }

  private _config: Config | null = null;
  private _logger: Logger | null = null;
  private _notifier: Notifier | null = null;

  private constructor() {
    return;
  }

  public get config(): Config | null {
    return this._config;
  }

  public set config(config: Config | null) {
    this._config = config;
  }

  public get logger(): Logger | null {
    return this._logger;
  }

  public set logger(logger: Logger | null) {
    this._logger = logger;
  }

  public get notifier(): Notifier | null {
    return this._notifier;
  }

  public set notifier(notifier: Notifier | null) {
    this._notifier = notifier;
  }
}
