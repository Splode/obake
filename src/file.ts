import fs from "fs/promises";
import os from "os";
import process from "process";

/**
 * readFile attempts to read and return data from a file at the given filepath.
 *
 * @param filePath The path to the file
 * @returns The file's data
 */
export async function readFile(filePath: string): Promise<string | undefined> {
  const data = await fs.readFile(filePath).catch((err) => {
    throw err;
  });
  return data.toString();
}

/**
 * getUserData returns the path to the user's data directory, which differs depending on OS.
 *
 * @returns The path to the user's data directory
 */
export function getUserData(): string | undefined {
  if (os.platform() === "win32") {
    return process.env.APPDATA;
  }
  return process.env.HOME;
}

/**
 * ensureDirExists checks to see if a directory at the given filepath exists. If it doesn't exist, it will be created.
 *
 * @param filepath The path to check
 */
export async function ensureDirExists(filepath: string): Promise<void> {
  await fs.access(filepath).catch(async () => {
    await fs.mkdir(filepath).catch((err) => {
      throw err;
    });
  });
}
