import notifier from "node-notifier";
import { IDesktop } from "../config/Config";
import { IMessager } from "./Notifier";

export default class DesktopClient implements IMessager {
  private config: IDesktop;
  public constructor(cfg: IDesktop) {
    this.config = cfg;
  }

  public get disabled(): boolean {
    return Boolean(this.config.disabled);
  }

  public get name(): string {
    return "desktop";
  }

  public async sendMessage(msg: string): Promise<void> {
    notifier.notify(
      {
        title: "Obake",
        message: msg,
        sound: this.config.sound,
      },
      (err) => {
        throw err;
      }
    );
  }
}
