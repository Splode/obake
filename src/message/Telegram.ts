import axios from "axios";
import { ITelegram } from "../config/Config";
import Logger from "../Logger";
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
  private URL: string;
  private chat_id: string;
  private log: Logger;

  public constructor(cfg: ITelegram) {
    this.log = new Logger();
    this.URL = cfg.URL;
    this.chat_id = cfg.chat_id;
  }

  public async sendMessage(msg: string): Promise<void> {
    if (!this.URL || !this.chat_id) return;

    this.log.info(`sending message via telegram client: ${msg}`);

    try {
      await axios.post(this.URL, new Message(this.chat_id, msg));
    } catch (error) {
      this.log.error(error);
    }
  }
}
