import { ConditionContextItem } from "../context/condition-context-item";
import { Context, OptionalParams } from "../context/context";
import { ContexterContextItem } from "../context/contexter-context-item";
import { Contexters } from "./contexters";

export class ContextersImpl<Chain> implements Contexters<Chain> {
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
    options: { ifTrue?: unknown; ifFalse?: unknown }
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
    conditionSchema: unknown,
    options: { ifTrue?: unknown; ifFalse?: unknown }
  ): Chain {
    this.context.addItem(
      new ConditionContextItem(
        conditionSchema,
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
