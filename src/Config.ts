import toml from "toml";
import readFile from "./file";
import Good from "./Good";

export class Config implements IConfig {
  public static async getConfig(): Promise<Config> {
    if (!Config.instance) {
      const cfg = await loadConfig();
      Config.instance = new Config(cfg);
    }
    return Config.instance;
  }

  public goods: Good[] = [];
  public telegram: ITelegram;

  private constructor(cfg: IRawConfig) {
    this.goods = cfg.goods;
    this.telegram = cfg.telegram;
  }

  private static instance: Config;
}

export interface IConfig {
  goods: Good[];
  telegram?: ITelegram;
}

async function getConfigFile(filePath: string) {
  return await readFile(filePath);
}

async function loadConfig() {
  const file = await getConfigFile("config.toml");
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
  goods: Good[];
  telegram: ITelegram;
}
