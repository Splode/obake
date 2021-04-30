import TelegramClient from "./Telegram";
import { Config, IDesktop, ITelegram } from "../config/Config";
import DesktopClient from "./Desktop";
import Logger from "../Logger";

export interface IMessager {
  disabled: boolean;
  name: string;
  sendMessage(msg: string): Promise<void>;
}

export default class Notifier {
  private config: Config;
  private log: Logger;
  private messengers: IMessager[] = [];

  public constructor(cfg: Config) {
    this.config = cfg;
    this.log = new Logger();
    this.initMessagers();
  }

  public add(m: IMessager): void {
    this.messengers.push(m);
  }

  public send(msg: string): void {
    this.messengers.forEach(async (m) => {
      if (!m.disabled) {
        this.log.info(`sending message via ${m.name} client: ${msg}`);
        await m.sendMessage(msg).catch((err: Error) => {
          this.log.error(
            `failed to send message via ${m.name} client: ${err.message}`
          );
        });
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