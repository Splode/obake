import IDisableable from "./IDisableable";

export default interface IGood extends IDisableable {
  URL: string;
  name: string;
  price: number;
}
