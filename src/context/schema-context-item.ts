import { validate } from "..";
import { ValidationChain } from "../chain/validation-chain";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class SchemaContextItem implements ContextItem {
  constructor(protected readonly schema: Record<string, ValidationChain>) {}

  async run(context: Context): Promise<ValidationResult> {
    const result = new ValidationResult();

    for (const schemaKey in this.schema) {
      const subSchemaValidationResult = await validate(
        context.objectToValidate,
        this.schema[schemaKey],
        [...context.path, schemaKey]
      );

      if (subSchemaValidationResult.failed) {
        result.errors.push(...subSchemaValidationResult.errors);
        continue;
      }

      if (subSchemaValidationResult.validated !== undefined)
        result.validated[schemaKey] = subSchemaValidationResult.validated;
      else result.errors.push(...subSchemaValidationResult.errors);
    }

    return result;
  }
}
