import axios from "axios";
import { Config } from "./config/Config";
import Logger from "./Logger";

class Message {
  public chat_id: string;
  public text: string;
  public constructor(chatID: string, text: string) {
    this.chat_id = chatID;
    this.text = text;
  }
}

export default class TelegramClient {
  private config: Config | null = null;
  private log: Logger;

  public constructor() {
    this.log = new Logger();
  }

  public async sendMessage(msg: string): Promise<void> {
    if (!this.config) {
      await this.init();
    }

    if (!this.config || !this.config.telegram) return;

    this.log.info(`sending message via telegram client: ${msg}`);

    try {
      await axios.post(
        this.config.telegram.URL,
        new Message(this.config.telegram.chatID, msg)
      );
    } catch (error) {
      this.log.error(error);
    }
  }

  private async init(): Promise<void> {
    this.config = await Config.getConfig();
  }
}
