import { SanitizerHandler } from "./../handler/sanitizer-handler";
import { Sanitizer } from "./../context/sanitizer";
import { Context } from "../context/context";
import { Sanitizers } from "./sanitizers";
import { NormalizeEmailOptions } from "../options";

export class SanitizersImpl<Chain> implements Sanitizers<Chain> {
  constructor(
    private readonly context: Context,
    private readonly chain: Chain
  ) {}
  blacklist(chars: string): Chain {
    throw new Error("Method not implemented.");
  }
  escape(): Chain {
    throw new Error("Method not implemented.");
  }
  unescape(): Chain {
    throw new Error("Method not implemented.");
  }
  ltrim(): Chain {
    throw new Error("Method not implemented.");
  }
  normalizeEmail(options?: NormalizeEmailOptions): Chain {
    throw new Error("Method not implemented.");
  }
  rtrim(): Chain {
    throw new Error("Method not implemented.");
  }
  stripLow(keepNewLines?: boolean): Chain {
    throw new Error("Method not implemented.");
  }
  toBoolean(strict?: boolean): Chain {
    throw new Error("Method not implemented.");
  }
  toDate(): Chain {
    throw new Error("Method not implemented.");
  }
  toFloat(): Chain {
    throw new Error("Method not implemented.");
  }
  toInt(radix?: number): Chain {
    throw new Error("Method not implemented.");
  }
  trim(chars?: string): Chain {
    throw new Error("Method not implemented.");
  }
  whitelist(chars?: string): Chain {
    throw new Error("Method not implemented.");
  }

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
