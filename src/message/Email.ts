import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { IEmail } from "../config/Config";
import { IMessager } from "./Notifier";

export default class EmailClient implements IMessager {
  private config: IEmail;
  private transport: Mail;

  public constructor(cfg: IEmail) {
    this.config = cfg;
    this.transport = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: false,
      requireTLS: true,
      auth: {
        user: cfg.username,
        pass: cfg.password,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });
  }

  public get disabled(): boolean {
    return Boolean(this.config.disabled);
  }

  public get name(): string {
    return "email";
  }

  public async sendMessage(msg: string): Promise<void> {
    await this.transport
      .sendMail({
        from: `Obake <${this.config.from || this.config.username}>`,
        to: this.config.to || this.config.username,
        subject: "Obake Found Something",
        text: msg,
      })
      .catch((err) => {
        throw err;
      });
  }
}
