import { ConditionContextItem } from "../context/condition-context-item";
import { Context, OptionalParams } from "../context/context";
import { ContexterContextItem } from "../context/contexter-context-item";
import { ContextHandlers } from "./context-handlers";
import { ValidationChain } from "./validation-chain";

export class ContextHandlersImpl<Chain> implements ContextHandlers<Chain> {
  constructor(
    private readonly context: Context,
    private readonly chain: Chain
  ) {}

  addItem(contexter: ContexterContextItem): void {
    this.context.addItem(contexter);
  }

  bail(): Chain {
    this.addItem(
      new ContexterContextItem(async (context: Context) => {
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
      new ConditionContextItem(
        conditionSchema,
        options.ifTrue,
        options.ifTrue,
        false
      )
    );

    return this.chain;
  }

  ifSelf(
    conditionChain: ValidationChain,
    options: { ifTrue?: ValidationChain; ifFalse?: ValidationChain }
  ): Chain {
    this.context.addItem(
      new ConditionContextItem(
        conditionChain,
        options.ifTrue,
        options.ifTrue,
        true
      )
    );

    return this.chain;
  }

  optional(options: OptionalParams = { nullable: false }): Chain {
    this.context.optional = options;
    return this.chain;
  }
}
