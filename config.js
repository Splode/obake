const fs = require("fs").promises;
const toml = require("toml");

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (err) {
    console.log(err);
  }
}

async function getConfig(filePath) {
  return await readFile(filePath);
}

(async () => {
  const file = await getConfig("config.toml");
  try {
    const data = toml.parse(file)
    console.dir(data.app.length)
  } catch (err) {
    console.error(err)
  }
})();
