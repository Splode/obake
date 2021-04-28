import axios from "axios";
import { ITelegram } from "../config/Config";
import { IMessager } from "./Notifier";

class Message {
  public chat_id: string;
  public text: string;
  public constructor(chatID: string, text: string) {
    this.chat_id = chatID;
    this.text = text;
  }
}

export default class TelegramClient implements IMessager {
  private config: ITelegram;

  public constructor(cfg: ITelegram) {
    this.config = cfg;
  }

  public get disabled(): boolean {
    return Boolean(this.config.disabled);
  }

  public get name(): string {
    return "telegram";
  }

  public async sendMessage(msg: string): Promise<void> {
    if (!this.config.URL || !this.config.chat_id) return;
    await axios
      .post(this.config.URL, new Message(this.config.chat_id, msg))
      .catch((err) => {
        throw err;
      });
  }
}
