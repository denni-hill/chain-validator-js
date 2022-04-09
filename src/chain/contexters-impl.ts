import { ConditionContextItem } from "../context/condition-context-item";
import { Context, OptionalParams } from "../context/context";
import { ContexterContextItem } from "../context/contexter-context-item";
import { OneOfContextItem } from "../context/one-of-context-item";
import { SchemaContextItem } from "../context/schema-context-item";
import { Contexters } from "./contexters";
import { ValidationChain } from "./validation-chain";

export class ContextersImpl<Chain> implements Contexters<Chain> {
  constructor(
    private readonly context: Context,
    private readonly chain: Chain
  ) {}

  protected addItem(contexter: ContexterContextItem): void {
    this.context.addItem(contexter);
  }

  schema<T>(schema: { [P in keyof T]?: ValidationChain }): Chain {
    this.context.addItem(new SchemaContextItem(schema));

    return this.chain;
  }

  name(fieldName: string): Chain {
    this.context.name = fieldName;

    return this.chain;
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
    conditionSchema: ValidationChain,
    options: { ifTrue?: ValidationChain; ifFalse?: ValidationChain }
  ): Chain {
    this.context.addItem(
      new ConditionContextItem(
        conditionSchema,
        options.ifTrue,
        options.ifFalse,
        false
      )
    );

    return this.chain;
  }

  ifSelf(
    conditionSchema: ValidationChain,
    options: { ifTrue?: ValidationChain; ifFalse?: ValidationChain }
  ): Chain {
    this.context.addItem(
      new ConditionContextItem(
        conditionSchema,
        options.ifTrue,
        options.ifFalse,
        true
      )
    );

    return this.chain;
  }

  oneOf(...conditionSchemas: ValidationChain[]): Chain {
    this.context.addItem(new OneOfContextItem(conditionSchemas, false));
    return this.chain;
  }

  oneOfSelf(...conditionSchemas: ValidationChain[]): Chain {
    this.context.addItem(new OneOfContextItem(conditionSchemas, true));
    return this.chain;
  }

  optional(options: OptionalParams = { nullable: false }): Chain {
    this.context.optional = options;
    return this.chain;
  }
}
