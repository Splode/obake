import fs from "fs/promises";
import Logger from "./Logger";

async function readFile(filePath: string): Promise<string | undefined> {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (err) {
    const log = new Logger();
    log.error(err);
  }
}

export default readFile;
