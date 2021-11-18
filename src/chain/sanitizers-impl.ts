import {
  SanitizerHandler,
  SanitizerHandlerReturner
} from "./../handler/sanitizer-handler";
import { SanitizerContextItem } from "../context/sanitizer-context-item";
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

  addItem(sanitizer: SanitizerContextItem): void {
    this.context.addItem(sanitizer);
  }

  addStandartSanitizer(
    func: { (value: string): unknown },
    args: Record<string, unknown>
  ): void {
    const asyncHandler: SanitizerHandler = async (value: unknown) =>
      func(toString(value));
    const sanitizer = new SanitizerContextItem(asyncHandler, args);
    this.addItem(sanitizer);
  }

  customSanitizer(
    handlerReturner: SanitizerHandlerReturner,
    options?: { args?: Record<string, unknown> }
  ): Chain {
    if (options === undefined) options = {};
    this.addItem(
      new SanitizerContextItem(handlerReturner(this.context), options.args)
    );

    return this.chain;
  }

  blacklist(chars: string): Chain {
    this.addStandartSanitizer((value) => validator.blacklist(value, chars), {
      chars
    });

    return this.chain;
  }

  escape(): Chain {
    this.addStandartSanitizer(validator.escape, {});

    return this.chain;
  }

  unescape(): Chain {
    this.addStandartSanitizer(validator.unescape, {});

    return this.chain;
  }

  ltrim(chars?: string): Chain {
    this.addStandartSanitizer((value) => validator.ltrim(value, chars), {
      chars
    });

    return this.chain;
  }

  normalizeEmail(options?: NormalizeEmailOptions): Chain {
    this.addStandartSanitizer(
      (value) => validator.normalizeEmail(value, options),
      { ...options }
    );

    return this.chain;
  }

  rtrim(chars?: string): Chain {
    this.addStandartSanitizer((value) => validator.rtrim(value, chars), {
      chars
    });

    return this.chain;
  }

  stripLow(keepNewLines?: boolean): Chain {
    this.addStandartSanitizer(
      (value) => validator.stripLow(value, keepNewLines),
      { keepNewLines }
    );

    return this.chain;
  }

  toBoolean(strict?: boolean): Chain {
    this.addStandartSanitizer((value) => validator.toBoolean(value, strict), {
      strict
    });

    return this.chain;
  }

  toDate(): Chain {
    this.addStandartSanitizer(validator.toDate, {});

    return this.chain;
  }

  toFloat(): Chain {
    this.addStandartSanitizer(validator.toFloat, {});

    return this.chain;
  }

  toInt(radix?: number): Chain {
    this.addStandartSanitizer((value) => validator.toInt(value, radix), {
      radix
    });

    return this.chain;
  }

  trim(chars?: string): Chain {
    this.addStandartSanitizer((value) => validator.trim(value, chars), {
      chars
    });

    return this.chain;
  }

  whitelist(chars?: string): Chain {
    this.addStandartSanitizer((value) => validator.whitelist(value, chars), {
      chars
    });

    return this.chain;
  }

  toString(): Chain {
    this.addItem(new SanitizerContextItem(async (value) => String(value), {}));

    return this.chain;
  }
}
