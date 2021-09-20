import { ValidationResult } from "./result";
import { ValidationChain } from "./chain/validation-chain";
import { Context } from "./context/context";

export type ArrayValidationSchema = [unknown, unknown];

export async function validate(
  objectToValidate: unknown,
  schema: unknown,
  path: string[] = [],
  stopOnFail = false
): Promise<ValidationResult> {
  if (schema === undefined) throw "Validation schema is undefined!";
  if (schema === null) throw "Validation schema cannot be null!";

  if ((schema as ValidationChain).context instanceof Context) {
    const context: Context = (schema as ValidationChain).context;
    return await context.run(objectToValidate, [...path], stopOnFail);
  }

  if (typeof schema === "object") {
    const result = new ValidationResult();

    for (const schemaKey in schema) {
      const subSchemaValidationResult = await validate(
        objectToValidate,
        schema[schemaKey],
        [...path, schemaKey],
        stopOnFail
      );

      if (subSchemaValidationResult.passed)
        result.validated[schemaKey] = subSchemaValidationResult.validated;
      else result.errors.push(...subSchemaValidationResult.errors);
    }

    return result;
  }

  throw new Error("Validation schema part is invalid type!");
}

export function build(): ValidationChain {
  const ctx = new Context();
  return ctx.chain;
}
