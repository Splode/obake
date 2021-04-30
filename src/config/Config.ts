import toml from "toml";
import { readFile } from "../file";
import Good, { IGood } from "../merchant/Good";
import IDisableable from "./IDisableable";

export class Config implements IConfig {
  public static async getConfig(filePath: string): Promise<Config> {
    if (!Config.instance) {
      const cfg = await parseConfig(filePath).catch((err) => {
        throw err;
      });
      Config.instance = new Config(cfg);
    }
    return Config.instance;
  }

  public notifications: INotifications<NotifierConfig>;
  public goods: Good[] = [];

  private constructor(cfg: IRawConfig) {
    this.notifications = cfg.notifications;
    cfg.goods.forEach((g) => {
      this.goods.push(new Good(g));
    });
  }

  private static instance: Config;
}

export interface IConfig {
  notifications: INotifications<NotifierConfig>;
  goods: Good[];
}

async function getConfigFile(filePath: string) {
  return await readFile(filePath).catch((err) => {
    throw err;
  });
}

async function parseConfig(filePath: string) {
  const file = await getConfigFile(filePath).catch((err) => {
    throw err;
  });
  if (!file) {
    throw new Error(`received invalid config file`);
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
