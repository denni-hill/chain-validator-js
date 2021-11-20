import { ValidationResult } from "./result";
import { ValidationChain } from "./chain/validation-chain";
import { Context } from "./context/context";

export async function validate(
  objectToValidate: unknown,
  chain: ValidationChain,
  path: string[] = [],
  stopOnFail = false
): Promise<ValidationResult> {
  if (chain === undefined)
    throw new Error("Validation chain cannot be undefined!");
  if (chain === null) throw new Error("Validation chain cannot be null!");

  return await chain.context.run(objectToValidate, [...path], stopOnFail);
}

export function build(): ValidationChain {
  const ctx = new Context();
  return ctx.chain;
}
