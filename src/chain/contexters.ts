import { OptionalParams } from "../context/context";

export interface Contexters<Chain> {
  bail(): Chain;

  if(
    conditionSchema: unknown,
    options: {
      ifTrue?: unknown;
      ifFalse?: unknown;
    }
  ): Chain;

  ifSelf(
    conditionSchema: unknown,
    options: {
      ifTrue?: unknown;
      ifFalse?: unknown;
    }
  ): Chain;

  optional(options?: Partial<OptionalParams> | true): Chain;
}
