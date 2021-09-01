import { ValidationResult } from "./result";
import { ValidationChain } from "./chain/validation-chain";
import { Context } from "./context/context";
import { getValueByPath } from "./utils";

async function _validate(
  objectToValidate: unknown,
  schema: unknown,
  path: string[] = [],
  stopOnFail = false
): Promise<ValidationResult> {
  if (schema === undefined) throw "Validation schema is undefined!";
  if (schema === null) throw "Validation schema cannot be null!";

  const result = new ValidationResult([]);
  if ((schema as ValidationChain).context instanceof Context) {
    const context: Context = (schema as ValidationChain).context;
    return await context.run(objectToValidate, [...path]);
  } else if (Array.isArray(schema)) {
    if (schema.length === 0 || schema.length > 2)
      throw new Error(
        "Array validation schema length must be greater than 0 and less than 2"
      );

    let arrayFieldValidationPassed = true;
    let arrayValidationSchema;
    if (schema.length === 2) {
      const arrayFieldValidationResult = await _validate(
        objectToValidate,
        schema[0],
        [...path],
        stopOnFail
      );
      arrayFieldValidationPassed = arrayFieldValidationResult.passed;
      arrayValidationSchema = schema[1];
    } else arrayValidationSchema = schema[0];

    const arrayToValidate = getValueByPath(objectToValidate, [...path]);
    if (arrayFieldValidationPassed && Array.isArray(arrayToValidate)) {
      const validatedArray = [];
      for (const key in arrayToValidate) {
        const arrayElementValidationResult = await _validate(
          objectToValidate,
          arrayValidationSchema,
          [...path, key],
          stopOnFail
        );
        if (arrayElementValidationResult.passed)
          validatedArray[key] = arrayElementValidationResult.validated;
        else result.errors.push(...arrayElementValidationResult.errors);
      }
      result.validated = validatedArray;
    } else result.validated = [];
  } else if (typeof schema === "object") {
    for (const schemaKey in schema) {
      const subSchemaValidationResult = await _validate(
        objectToValidate,
        schema[schemaKey],
        [...path, schemaKey],
        stopOnFail
      );
      if (
        subSchemaValidationResult.passed ||
        Array.isArray(subSchemaValidationResult.validated)
      )
        result.validated[schemaKey] = subSchemaValidationResult.validated;

      if (subSchemaValidationResult.failed)
        result.errors.push(...subSchemaValidationResult.errors);
    }
  } else {
    throw new Error("Validation schema part is invalid type");
  }

  return result;
}

export async function validate(
  objectToValidate: unknown,
  schema: unknown,
  stopOnFail = false
): Promise<ValidationResult> {
  return await _validate(objectToValidate, schema, [], stopOnFail);
}

export function build(): ValidationChain {
  const ctx = new Context();
  return ctx.chain;
}
