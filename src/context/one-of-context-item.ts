import { validate } from "..";
import { ValidationChain } from "../chain/validation-chain";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class OneOfContextItem implements ContextItem {
  constructor(
    protected readonly validationSchemas: ValidationChain[],
    protected readonly validateSelf: boolean
  ) {}
  async run(context: Context): Promise<ValidationResult> {
    const result = new ValidationResult();

    for (const schema of this.validationSchemas) {
      const schemaResult = await validate(
        context.objectToValidate,
        schema,
        this.validateSelf ? context.path : []
      );
      if (schemaResult.passed) return schemaResult;
      result.errors.push(...schemaResult.errors);
    }

    return result;
  }
}
