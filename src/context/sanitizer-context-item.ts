import { SanitizerHandler } from "../handler/sanitizer-handler";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class SanitizerContextItem implements ContextItem {
  constructor(
    readonly handler: SanitizerHandler,
    readonly args: Record<string, unknown> = {}
  ) {}

  async run(context: Context): Promise<ValidationResult> {
    const result = new ValidationResult();
    try {
      result.validated = await this.handler(context.value);
    } catch (e) {
      result.errors.push({
        message: e.message,
        value: context.value,
        args: { ...this.args, fieldName: context.name },
        path: context.path
      });
    }
    return result;
  }
}
