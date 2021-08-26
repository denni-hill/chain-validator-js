import { Context } from "../context/context";
import { ContextHandler } from "./context-handler";
import { Sanitizers } from "./sanitizers";
import { Validations } from "./validations";

export interface ValidationChain
  extends Validations<ValidationChain>,
    Sanitizers<ValidationChain>,
    ContextHandler<ValidationChain> {
  context: Context;
}
