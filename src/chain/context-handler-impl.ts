import { Context, OptionalParams } from "../context/context";
import { ValidationHandler } from "../handler/validation-handler";
import { ContextHandler } from "./context-handler";
import { ValidationChain } from "./validation-chain";

export class ContextHandlerImpl<Chain> implements ContextHandler<Chain> {
  constructor(
    private readonly context: Context,
    private readonly chain: Chain
  ) {}

  bail(): Chain {
    this.context.bailed = true;
    return this.chain;
  }
  if(condition: ValidationHandler | ValidationChain): Chain {
    return this.chain;
  }
  optional(options: OptionalParams = { nullable: false }): Chain {
    this.context.optional = options;
    return this.chain;
  }
}
