import { Context, OptionalParams } from "../context/context";
import { Contexter } from "../context/context-handler";
import { ValidationHandler } from "../handler/validation-handler";
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

  if(condition: ValidationHandler | ValidationChain): Chain {
    if ((condition as ValidationChain).context !== undefined) {
      const context = (condition as ValidationChain).context;
      context.queue.forEach(this.context.addItem);
      this.bail();
      //todo: complete if statement
    }
    return this.chain;
  }

  optional(options: OptionalParams = { nullable: false }): Chain {
    this.context.optional = options;
    return this.chain;
  }
}
