import fs from "fs/promises";

async function readFile(filePath: string): Promise<string | undefined> {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (err) {
    console.log(err);
  }
}

export default readFile;
