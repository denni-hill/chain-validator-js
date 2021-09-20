import { OptionalParams } from "../context/context";
import { ValidationChain } from "./validation-chain";

export interface Contexters<Chain> {
  bail(): Chain;

  if(
    conditionSchema: unknown,
    options: {
      ifTrue?: ValidationChain;
      ifFalse?: ValidationChain;
    }
  ): Chain;

  ifSelf(
    conditionChain: ValidationChain,
    options: {
      ifTrue?: ValidationChain;
      ifFalse?: ValidationChain;
    }
  ): Chain;

  optional(options?: Partial<OptionalParams> | true): Chain;
}
