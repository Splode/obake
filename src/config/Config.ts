import toml from "toml";
import IGood from "./IGood";
import Logger from "../Logger";
import { readFile } from "../file";

const log = new Logger();

export class Config implements IConfig {
  public static async getConfig(filePath?: string): Promise<Config | null> {
    if (!Config.instance) {
      if (!filePath) return null;
      const cfg = await loadConfig(filePath);
      Config.instance = new Config(cfg);
    }
    return Config.instance;
  }

  public notifications: INotifications<NotifierConfig>;
  public goods: IGood[] = [];

  private constructor(cfg: IRawConfig) {
    this.notifications = cfg.notifications;
    this.goods = cfg.goods;
  }

  private static instance: Config;
}

export interface IConfig {
  notifications: INotifications<NotifierConfig>;
  goods: IGood[];
}

async function getConfigFile(filePath: string) {
  return await readFile(filePath);
}

async function loadConfig(filePath: string) {
  const file = await getConfigFile(filePath);
  if (!file) return;
  try {
    return toml.parse(file);
  } catch (err) {
    log.error(err);
  }
}

export interface ITelegram {
  URL: string;
  chat_id: string;
}

export type NotifierConfig = ITelegram;

export interface INotifications<NotifierConfig> {
  [Key: string]: NotifierConfig;
}

interface IRawConfig {
  notifications: INotifications<NotifierConfig>;
  goods: IGood[];
}
