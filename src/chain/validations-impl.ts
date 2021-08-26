import { Context } from "../context/context";
import { Validator } from "../context/validator";
import { ValidationHandler } from "../handler/validation-handler";
import { Validations } from "./validations";

export class ValidationsImpl<Chain> implements Validations<Chain> {
  protected negateNext = false;

  protected addItem(validator: Validator): void {
    this.context.addItem(validator);
    this.negateNext = false;
  }

  protected addStandartValidator(
    handler: ValidationHandler,
    ...args: any[]
  ): void {
    this.addItem(new Validator(handler, args));
  }

  constructor(
    protected readonly context: Context,
    protected readonly chain: Chain
  ) {}

  not(): Validations<Chain> {
    this.negateNext = true;
    return this;
  }

  isString(): Chain {
    this.addStandartValidator(async (value: any) => typeof value === "string");
    return this.chain;
  }
}
