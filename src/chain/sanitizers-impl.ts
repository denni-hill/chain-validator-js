import { SanitizerHandler } from "./../handler/sanitizer-handler";
import { Sanitizer } from "./../context/sanitizer";
import { Context } from "../context/context";
import { Sanitizers } from "./sanitizers";

export class SanitizersImpl<Chain> implements Sanitizers<Chain> {
  constructor(
    private readonly context: Context,
    private readonly chain: Chain
  ) {}

  addItem(sanitizer: Sanitizer): void {
    this.context.addItem(sanitizer);
  }

  addStandartSanitizer(
    message: string,
    handler: SanitizerHandler,
    ...args: any[]
  ): void {
    const sanitizer = new Sanitizer(handler, args);
    if (message !== undefined) sanitizer.message = message;
    this.addItem(sanitizer);
  }

  toString(): Chain {
    this.addStandartSanitizer("could not string", async (value: any) =>
      String(value)
    );
    return this.chain;
  }
}
