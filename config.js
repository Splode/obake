const toml = require("toml");
const readFile = require("./file.js");

async function getConfigFile(filePath) {
  return await readFile(filePath);
}

async function getConfig() {
  const file = await getConfigFile("config.toml");
  try {
    return toml.parse(file);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getConfig };
