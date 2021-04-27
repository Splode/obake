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

  public goods: IGood[] = [];
  public telegram: ITelegram;

  private constructor(cfg: IRawConfig) {
    this.goods = cfg.goods;
    this.telegram = cfg.telegram;
  }

  private static instance: Config;
}

export interface IConfig {
  goods: IGood[];
  telegram?: ITelegram;
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

interface ITelegram {
  URL: string;
  chatID: string;
}

interface IRawConfig {
  goods: IGood[];
  telegram: ITelegram;
}
