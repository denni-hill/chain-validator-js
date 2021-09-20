import { OptionalParams } from "../context/context";

export interface Contexters<Return> {
  bail(): Return;

  if(
    conditionSchema: unknown,
    options: {
      ifTrue?: unknown;
      ifFalse?: unknown;
    }
  ): Return;

  ifSelf(
    conditionSchema: unknown,
    options: {
      ifTrue?: unknown;
      ifFalse?: unknown;
    }
  ): Return;

  oneOf(...conditionSchemas: unknown[]): Return;

  oneOfSelf(...conditionSchemas: unknown[]): Return;

  optional(options?: Partial<OptionalParams> | true): Return;
}
