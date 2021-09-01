import { SanitizerHandler } from "./../handler/sanitizer-handler";
import { Sanitizer } from "./../context/sanitizer";
import { Context } from "../context/context";
import { Sanitizers } from "./sanitizers";
import { NormalizeEmailOptions } from "../options";
import { toString } from "../utils";
import validator from "validator";

export class SanitizersImpl<Chain> implements Sanitizers<Chain> {
  constructor(
    private readonly context: Context,
    private readonly chain: Chain
  ) {}

  addItem(sanitizer: Sanitizer): void {
    this.context.addItem(sanitizer);
  }

  addStandartSanitizer(
    func: { (value: string): unknown },
    args: unknown,
    message: string
  ): void {
    const asyncHandler: SanitizerHandler = async (value: unknown) =>
      func(toString(value));
    const sanitizer = new Sanitizer(asyncHandler, args, message);
    this.addItem(sanitizer);
  }

  blacklist(chars: string): Chain {
    this.addStandartSanitizer(
      (value) => validator.blacklist(value, chars),
      { chars },
      validator.blacklist.name
    );

    return this.chain;
  }

  escape(): Chain {
    this.addStandartSanitizer(validator.escape, {}, validator.escape.name);

    return this.chain;
  }

  unescape(): Chain {
    this.addStandartSanitizer(validator.unescape, {}, validator.unescape.name);

    return this.chain;
  }

  ltrim(chars?: string): Chain {
    this.addStandartSanitizer(
      (value) => validator.ltrim(value, chars),
      { chars },
      validator.ltrim.name
    );

    return this.chain;
  }

  normalizeEmail(options?: NormalizeEmailOptions): Chain {
    this.addStandartSanitizer(
      (value) => validator.normalizeEmail(value, options),
      { ...options },
      validator.normalizeEmail.name
    );

    return this.chain;
  }

  rtrim(chars?: string): Chain {
    this.addStandartSanitizer(
      (value) => validator.rtrim(value, chars),
      { chars },
      validator.rtrim.name
    );

    return this.chain;
  }

  stripLow(keepNewLines?: boolean): Chain {
    this.addStandartSanitizer(
      (value) => validator.stripLow(value, keepNewLines),
      { keepNewLines },
      validator.stripLow.name
    );

    return this.chain;
  }

  toBoolean(strict?: boolean): Chain {
    this.addStandartSanitizer(
      (value) => validator.toBoolean(value, strict),
      { strict },
      validator.toBoolean.name
    );

    return this.chain;
  }

  toDate(): Chain {
    this.addStandartSanitizer(validator.toDate, {}, validator.toDate.name);

    return this.chain;
  }

  toFloat(): Chain {
    this.addStandartSanitizer(validator.toFloat, {}, validator.toFloat.name);

    return this.chain;
  }

  toInt(radix?: number): Chain {
    this.addStandartSanitizer(
      (value) => validator.toInt(value, radix),
      { radix },
      validator.toInt.name
    );

    return this.chain;
  }

  trim(chars?: string): Chain {
    this.addStandartSanitizer(
      (value) => validator.trim(value, chars),
      { chars },
      validator.trim.name
    );

    return this.chain;
  }

  whitelist(chars?: string): Chain {
    this.addStandartSanitizer(
      (value) => validator.whitelist(value, chars),
      { chars },
      validator.whitelist.name
    );

    return this.chain;
  }

  toString(): Chain {
    this.addItem(
      new Sanitizer(async (value) => String(value), {}, this.toString.name)
    );

    return this.chain;
  }
}
