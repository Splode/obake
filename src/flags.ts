import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export default function parseFlags(args: string[]): IArguments {
  const argv = yargs(hideBin(args)).options({
    config: {
      type: "string",
      alias: "c",
      default: "config.toml",
      describe: "Path to config file",
    },
  }).argv;
  return argv;
}

export interface IArguments {
  [x: string]: unknown;
  config: string;
}
