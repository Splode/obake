import fs from "fs/promises";
import process from "process";
import os from "os";
import Logger from "./Logger";

export async function readFile(filePath: string): Promise<string | undefined> {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (err) {
    const log = new Logger();
    log.error(err);
  }
}

export function getUserData(): string | undefined {
  if (os.platform() === "win32") {
    return process.env.APPDATA;
  }
  return process.env.HOME;
}

// function ensureDirExists(filepath: string): void {
//  return
// }
