import { Context } from "./context";
import { ValidationHandler } from "../handler/validation-handler";
import { ContextItem } from "./context-item";
import { ValidationResult } from "../result";

export class ValidatorContextItem implements ContextItem {
  negate = false;

  constructor(
    readonly handler: ValidationHandler,
    readonly args: Record<string, unknown> = {},
    public message: string = "invalid value"
  ) {
    this.args = args;
  }

  async run(context: Context): Promise<ValidationResult> {
    const result = new ValidationResult();
    try {
      let handlerResult: boolean = await this.handler(context.value);
      if (this.negate) handlerResult = !handlerResult;

      if (handlerResult) result.validated = context.value;
      else {
        result.errors.push({
          value: context.value,
          message: this.message,
          args: { ...this.args, negate: this.negate, fieldName: context.name },
          path: context.path
        });
      }
    } catch (e) {
      result.errors.push({
        value: context.value,
        message: e.message,
        args: { ...this.args, negate: this.negate, fieldName: context.name },
        path: context.path
      });
    }

    return result;
  }
}
