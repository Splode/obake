import { Config, IDesktop, IEmail, ITelegram } from "../config/Config";
import Logger from "../Logger";
import Store from "../Store";
import DesktopClient from "./Desktop";
import EmailClient from "./Email";
import TelegramClient from "./Telegram";

export interface IMessager {
  disabled: boolean;
  name: string;
  sendMessage(msg: string): Promise<void>;
}

export default class Notifier {
  private config: Config;
  private log: Logger | null;
  private messengers: IMessager[] = [];

  public constructor(cfg: Config) {
    this.config = cfg;
    this.log = Store.get().logger;
    this.initMessagers();
  }

  public add(m: IMessager): void {
    this.messengers.push(m);
  }

  public async send(msg: string): Promise<void> {
    const { verbose } = this.config;

    const s = async (m: IMessager) => {
      if (!m.disabled) {
        if (verbose) {
          this.log?.info(`sending message via ${m.name} client: ${msg}`);
        }
        await m.sendMessage(msg).catch((err: Error) => {
          this.log?.error(
            `failed to send message via ${m.name} client: ${err.message}`
          );
        });
      } else {
        if (verbose) {
          this.log?.info(
            `skipping nofitification due to disabled: notify via ${m.name}`
          );
        }
      }
    };

    await Promise.all(this.messengers.map(s));
  }

  private initMessagers() {
    if (!this.config.notifications) return;

    const notes = this.config.notifications;
    Object.keys(notes).forEach((k) => {
      const cfg = notes[k];
      switch (k) {
        case "desktop":
          this.add(new DesktopClient(cfg as IDesktop));
          break;
        case "email":
          this.add(new EmailClient(cfg as IEmail));
          break;
        case "telegram":
          this.add(new TelegramClient(cfg as ITelegram));
          break;
        default:
          break;
      }
    });
  }
}
