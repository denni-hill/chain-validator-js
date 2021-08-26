import { ValidationResult } from "./result";
import { ValidationChain } from "./chain/validation-chain";
import { Context } from "./context/context";

export function build(): ValidationChain {
  const ctx = new Context();
  return ctx.chain;
}

async function validate(
  value: any,
  chain: ValidationChain
): Promise<ValidationResult> {
  const result = await chain.context.run(value, [], value);

  console.log(result);
  return result;
}

validate("Сука", build().toString().not().isEmail());
