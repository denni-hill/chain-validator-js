import { Context } from "../context/context";
import { Sanitizers } from "./sanitizers";

export class SanitizersImpl<Chain> implements Sanitizers<Chain> {
  constructor(
    private readonly context: Context,
    private readonly chain: Chain
  ) {}

  toString(): Chain {
    return this.chain;
  }
}
