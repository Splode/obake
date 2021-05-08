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
      Config.instance = new Config(cfg);
    }
    return Config.instance;
  }

  public disableLogFile: boolean;
  public verbose: boolean;
  public notifications: INotifications<NotifierConfig>;
  public goods: Good[] = [];

  private constructor(cfg: IRawConfig) {
    this.notifications = cfg.notifications;
    cfg.goods.forEach((g) => {
      this.goods.push(new Good(g));
    });
    this.disableLogFile = Boolean(cfg.disableLogFile);
    this.verbose = Boolean(cfg.verbose);
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

export interface IEmail extends IDisableable {
  username: string;
  password: string;
  host: string;
  port: number;
  from?: string;
  to?: string;
}

export interface ITelegram extends IDisableable {
  URL: string;
  chat_id: string;
}

export type NotifierConfig = IDesktop | IEmail | ITelegram;

export interface INotifications<NotifierConfig> {
  [Key: string]: NotifierConfig;
}

interface IRawConfig {
  disableLogFile?: boolean;
  verbose?: boolean;
  notifications: INotifications<NotifierConfig>;
  goods: IGood[];
}
