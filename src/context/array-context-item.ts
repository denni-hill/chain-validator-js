import { validate } from "..";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class ArrayContextItem implements ContextItem {
  constructor(protected readonly validationShema: unknown) {}

  async run(context: Context): Promise<ValidationResult> {
    const result = new ValidationResult();
    result.validated = [];
    if (Array.isArray(context.value)) {
      for (const key in context.value) {
        const elementValidationResult = await validate(
          context.objectToValidate,
          this.validationShema,
          [...context.path, key]
        );
        if (elementValidationResult.passed)
          result.validated.push(elementValidationResult.validated);
        else result.errors.push(...elementValidationResult.errors);
      }
    }

    return result;
  }
}
