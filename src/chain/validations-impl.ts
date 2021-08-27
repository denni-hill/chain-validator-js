import { IsEmailOptions, IsNumericOptions } from "./../options";
import validator from "validator";
import { Context } from "../context/context";
import { Validator } from "../context/validator";
import { ValidationHandler } from "../handler/validation-handler";
import { Validations } from "./validations";

export class ValidationsImpl<Chain> implements Validations<Chain> {
  protected negateNext = false;

  protected addItem(validator: Validator): void {
    validator.negate = this.negateNext;
    this.context.addItem(validator);
    this.negateNext = false;
  }

  protected addStandartValidator(
    message: string,
    handler: ValidationHandler,
    ...args: any[]
  ): void {
    const validator = new Validator(handler, args);
    validator.message = message;
    this.addItem(validator);
  }

  constructor(
    protected readonly context: Context,
    protected readonly chain: Chain
  ) {}

  not(): Validations<Chain> {
    this.negateNext = true;
    return this;
  }

  isEmail(options?: IsEmailOptions): Chain {
    this.addStandartValidator("invalid email", async (value: any) =>
      validator.isEmail(value, options)
    );
    return this.chain;
  }

  isNumeric(options?: IsNumericOptions): Chain {
    this.addStandartValidator(
      "invalid type",
      async (value: any) => validator.isNumeric(value, options),
      { type: "numeric" }
    );
    return this.chain;
  }

  isString(): Chain {
    this.addStandartValidator(
      "invalid type",
      async (value: any) => typeof value === "string",
      { type: "string" }
    );
    return this.chain;
  }

  isArray(): Chain {
    this.addStandartValidator(
      "invalid type",
      async (value: any) => Array.isArray(value),
      { type: "array" }
    );
    return this.chain;
  }
}
