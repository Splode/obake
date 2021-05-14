import { Config } from "./config/Config";
import parseFlags from "./flags";
import Logger from "./Logger";
import Notifier from "./message/Notifier";
import State from "./State";

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
  private _state: State | null = null;

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

  public get state(): State | null {
    return this._state;
  }

  public set state(state: State | null) {
    this._state = state;
  }

  public async init(): Promise<void> {
    const args = parseFlags(process.argv);
    this._logger = new Logger();
    this._config = await Config.get(args).catch((err) => {
      throw new Error(`failed to load config: ${err.message}`);
    });
    if (!this._config.disableLogFile) {
      await this._logger.withFile().catch((err) => {
        throw err;
      });
    }
    this._notifier = new Notifier(this._config);
    this.state = new State();
  }
}
