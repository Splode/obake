import toml from "toml";
import readFile from "../file";
import IGood from "./IGood";

export class Config implements IConfig {
  public static async getConfig(filePath: string): Promise<Config> {
    if (!Config.instance) {
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
    console.error(err);
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
