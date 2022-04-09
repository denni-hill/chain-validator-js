import { OptionalParams } from "../context/context";
import { ValidationChain } from "./validation-chain";

export interface Contexters<Return> {
  schema<T>(schema: { [P in keyof T]?: ValidationChain }): Return;

  name(fieldName: string): Return;

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
