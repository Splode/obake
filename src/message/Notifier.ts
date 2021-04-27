import TelegramClient from "./Telegram";
import { Config } from "../config/Config";

export interface IMessager {
  sendMessage(msg: string): void;
}

export default class Notifier {
  private config: Config;
  private messengers: IMessager[] = [];

  public constructor(cfg: Config) {
    this.config = cfg;
    this.initMessagers();
  }

  public add(m: IMessager): void {
    this.messengers.push(m);
  }

  public send(msg: string): void {
    this.messengers.forEach((m) => {
      m.sendMessage(msg);
    });
  }

  private initMessagers() {
    const notes = this.config.notifications;
    Object.keys(notes).forEach((k) => {
      const cfg = notes[k];
      switch (k) {
        case "telegram":
          this.add(new TelegramClient(cfg));
          break;
        default:
          break;
      }
    });
  }
}
