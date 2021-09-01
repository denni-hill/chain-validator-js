import { OptionalParams } from "../context/context";
import { ValidationHandler } from "../handler/validation-handler";
import { ValidationChain } from "./validation-chain";

export interface ContextHandlers<Chain> {
  bail(): Chain;
  if(condition: ValidationHandler | ValidationChain): Chain;
  optional(options?: Partial<OptionalParams> | true): Chain;
}
