import { OptionalParams } from "../context/context";
import { ValidationChain } from "./validation-chain";

export interface Contexters<Return> {
  schema(schema: Record<string, ValidationChain>): Return;

  bail(): Return;

  if(
    conditionSchema: ValidationChain,
    options: {
      ifTrue?: ValidationChain;
      ifFalse?: ValidationChain;
    }
  ): Return;

  ifSelf(
    conditionSchema: ValidationChain,
    options: {
      ifTrue?: ValidationChain;
      ifFalse?: ValidationChain;
    }
  ): Return;

  oneOf(...conditionSchemas: ValidationChain[]): Return;

  oneOfSelf(...conditionSchemas: ValidationChain[]): Return;

  optional(options?: Partial<OptionalParams> | true): Return;
}
