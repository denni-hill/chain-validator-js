import { ContexterHandler } from "../handler/contexter-handler";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class ContexterContextItem implements ContextItem {
  constructor(protected readonly handler: ContexterHandler) {}

  async run(context: Context): Promise<ValidationResult> {
    const result = new ValidationResult();
    try {
      await this.handler(context);
      result.validated = context.value;
    } catch (e) {
      result.errors.push({
        message: e.message,
        value: context.value,
        args: { fieldName: context.name },
        path: context.path
      });
    }

    return result;
  }
}
