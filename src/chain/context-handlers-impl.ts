import { Condition } from "../context/condition";
import { Context, OptionalParams } from "../context/context";
import { Contexter } from "../context/contexter";
import { ContextHandlers } from "./context-handlers";
import { ValidationChain } from "./validation-chain";

export class ContextHandlersImpl<Chain> implements ContextHandlers<Chain> {
  constructor(
    private readonly context: Context,
    private readonly chain: Chain
  ) {}

  addItem(contexter: Contexter): void {
    this.context.addItem(contexter);
  }

  bail(): Chain {
    this.addItem(
      new Contexter(async (context: Context) => {
        context.bailed = true;
      })
    );
    return this.chain;
  }

  if(
    conditionSchema: unknown,
    options: { ifTrue?: ValidationChain; ifFalse?: ValidationChain }
  ): Chain {
    this.context.addItem(
      new Condition(conditionSchema, options.ifTrue, options.ifTrue)
    );

    return this.chain;
  }

  optional(options: OptionalParams = { nullable: false }): Chain {
    this.context.optional = options;
    return this.chain;
  }
}
