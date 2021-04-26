import toml from "toml";
import readFile from "./file";
import Good from "./Good";

export class Config implements Config {
  public static async getConfig(): Promise<Config> {
    if (!Config.instance) {
      const cfg = await loadConfig();
      Config.instance = new Config(cfg);
    }
    return Config.instance;
  }

  public goods: Good[] = [];

  private constructor(cfg: rawConfig) {
    this.goods = cfg.goods;
  }

  private static instance: Config;
}

export interface Config {
  goods: Good[];
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

interface rawConfig {
  goods: Good[];
}
