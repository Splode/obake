import fs from "fs/promises";
import os from "os";
import process from "process";

export async function readFile(filePath: string): Promise<string | undefined> {
  const data = await fs.readFile(filePath).catch((err) => {
    throw err;
  });
  return data.toString();
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
