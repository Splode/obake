import TelegramClient from "./Telegram";
import { Config, IDesktop, ITelegram } from "../config/Config";
import DesktopClient from "./Desktop";

export interface IMessager {
  disabled: boolean;
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
      if (!m.disabled) {
        m.sendMessage(msg);
      }
    });
  }

  private initMessagers() {
    const notes = this.config.notifications;
    Object.keys(notes).forEach((k) => {
      const cfg = notes[k];
      switch (k) {
        case "desktop":
          this.add(new DesktopClient(cfg as IDesktop));
          return;
        case "telegram":
          this.add(new TelegramClient(cfg as ITelegram));
          break;
        default:
          break;
      }
    });
  }
}
