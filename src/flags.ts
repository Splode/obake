import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/**
 * parseFlags attempts to parse the given arguments into a configured set of arguments.
 *
 * @param args The arguments to parse
 * @returns The parsed arguments object
 */
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

/**
 * IArguments represents the supported arguments and flags.
 */
export interface IArguments {
  [x: string]: unknown;
  config: string;
}
