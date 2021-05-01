import chalk from "chalk";
import { join } from "path";
import winston, { createLogger, format, transports } from "winston";
import { toSlashDate, toTime } from "./date";
import { ensureDirExists, getUserData } from "./file";

export default class Logger {
  public constructor() {
    this.logger = createLogger({
      levels: winston.config.syslog.levels,
      transports: [
        new transports.Console({
          format: format.combine(formatConsole()),
        }),
      ],
    });
  }

  private logger: winston.Logger;

  public crit(msg: string): void {
    this.logger.crit(msg);
  }

  public error(msg: string): void {
    this.logger.error(msg);
  }

  public warn(msg: string): void {
    this.logger.warning(msg);
  }

  public info(msg: string): void {
    this.logger.info(msg);
  }

  public async withFile(): Promise<Logger> {
    const userDir = getUserData();
    const dataDir = join(userDir || "", "obake");
    await ensureDirExists(dataDir).catch((err) => {
      throw err;
    });

    this.logger.add(
      new transports.File({
        filename: join(dataDir, "obake.log"),
        format: format.combine(
          format.timestamp(),
          format.uncolorize(),
          formatFile()
        ),
        maxsize: 16e6, // 16 MB 
      })
    );
    return this;
  }
}

function formatLevel(level: string, color = false): string {
  const l = level.toUpperCase();
  if (!color) return l;
  switch (level) {
    case "crit":
      return chalk.black.bgRed(l);
    case "error":
      return chalk.redBright(l);
    case "info":
      return chalk.blue(l);
    case "warning":
      return chalk.yellow(l);
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
    const msg = `${formatLevel(level)}: ${formatTimestamp(
      timestamp
    )} ${message}`;
    return msg;
  });
}

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  return `${toSlashDate(d)} ${toTime(d)}`;
}
