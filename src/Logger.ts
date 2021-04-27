import chalk from "chalk";
import winston, { createLogger, format, transports } from "winston";

export default class Logger {
  public constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console({
          format: format.combine(formatConsole()),
        }),
        new transports.Console({
          format: format.combine(format.timestamp(), formatFile()),
        }),
      ],
    });
  }

  private logger: winston.Logger;

  public error(msg: string): void {
    this.logger.error(msg);
  }

  public info(msg: string): void {
    this.logger.info(msg);
  }
}

function formatLevel(level: string, color = false): string {
  const l = level.toUpperCase();
  if (!color) return l;
  switch (level) {
    case "info":
      return chalk.blue(l);
    case "error":
      return chalk.red(l);
    default:
      return l;
  }
}

function formatConsole(): winston.Logform.Format {
  return format.printf(({ level, message }) => {
    const msg = `${formatLevel(level, true)}: ${message}`;
    return msg;
  });
}

function formatFile(): winston.Logform.Format {
  return format.printf(({ level, message, timestamp }) => {
    const msg = `${formatLevel(level)}: ${timestamp} ${message}`;
    return msg;
  });
}
