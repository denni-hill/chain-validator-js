import { Context } from "./context";
import { ValidationHandler } from "../handler/validation-handler";
import { ContextItem } from "./context-item";
import { ValidationError } from "../error";

export class ValidatorContextItem implements ContextItem {
  negate = false;

  constructor(
    readonly handler: ValidationHandler,
    readonly args: Record<string, unknown> = {},
    public message: string = "invalid value"
  ) {
    this.args = args;
  }

  async run(context: Context): Promise<ValidationError> {
    let message: string = this.message;
    try {
      let result = await this.handler(context.value);
      if (this.negate) result = !result;

      if (result) return;
    } catch (e) {
      message = e.message;
    }

    return {
      value: context.value,
      message,
      args: { ...this.args, negate: this.negate },
      path: context.path
    };
  }
}
