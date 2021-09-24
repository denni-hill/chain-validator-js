import { ValidationResult } from "./result";
import { ValidationChain } from "./chain/validation-chain";
import { Context } from "./context/context";

export async function validate(
  objectToValidate: unknown,
  schema: ValidationChain,
  path: string[] = [],
  stopOnFail = false
): Promise<ValidationResult> {
  if (schema === undefined)
    throw new Error("Validation schema cannot be undefined!");
  if (schema === null) throw new Error("Validation schema cannot be null!");

  return await schema.context.run(objectToValidate, [...path], stopOnFail);
}

export function build(): ValidationChain {
  const ctx = new Context();
  return ctx.chain;
}
