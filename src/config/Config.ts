import toml from "toml";
import { readFile } from "../file";
import { IArguments } from "../flags";
import Good, { IGood } from "../merchant/Good";
import IDisableable from "./IDisableable";

export class Config implements IConfig {
  public static async get(args: IArguments): Promise<Config> {
    if (!Config.instance) {
      const cfg = await parseConfig(args.config).catch((err) => {
        throw err;
      });
      Config.instance = new Config(cfg, args);
    }
    return Config.instance;
  }

  public notifications: INotifications<NotifierConfig>;
  public goods: Good[] = [];
  public verbose: boolean;

  private constructor(cfg: IRawConfig, args: IArguments) {
    this.notifications = cfg.notifications;
    cfg.goods.forEach((g) => {
      this.goods.push(new Good(g));
    });
    this.verbose = args.verbose;
  }

  private static instance: Config;
}

export interface IConfig {
  notifications: INotifications<NotifierConfig>;
  goods: Good[];
  verbose: boolean;
}

async function getConfigFile(filePath: string): Promise<string | undefined> {
  return await readFile(filePath).catch((err) => {
    throw err;
  });
}

async function parseConfig(filePath: string): Promise<IRawConfig> {
  const file = await getConfigFile(filePath).catch((err) => {
    throw err;
  });
  if (!file) {
    throw new Error(`received invalid config file: ${filePath}`);
  }
  return toml.parse(file);
}

export interface IDesktop extends IDisableable {
  sound?: boolean;
}

export interface ITelegram extends IDisableable {
  URL: string;
  chat_id: string;
}

export type NotifierConfig = IDesktop | ITelegram;

export interface INotifications<NotifierConfig> {
  [Key: string]: NotifierConfig;
}

interface IRawConfig {
  notifications: INotifications<NotifierConfig>;
  goods: IGood[];
}
