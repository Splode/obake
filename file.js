const fs = require("fs").promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (err) {
    console.log(err);
  }
}

module.exports = readFile;
