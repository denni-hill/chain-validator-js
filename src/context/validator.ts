import { Context } from "./context";
import { ValidationHandler } from "../handler/validation-handler";
import { ContextItem } from "./context-item";
import { ValidationError } from "../error";

export class Validator implements ContextItem {
  message = "invalid value";
  negate = false;
  protected args: any[];

  constructor(private readonly handler: ValidationHandler, ...args: any[]) {
    this.args = args;
  }

  async run(context: Context): Promise<ValidationError> {
    let message: string = this.message;
    try {
      let result = await this.handler(context.value, ...this.args);
      if (this.negate) result = !result;

      if (result) return;
    } catch (e) {
      message = e.message;
    }

    return {
      value: context.value,
      message,
      args: this.args,
      path: context.path
    };
  }
}
