import { Context } from "../context/context";
import { ContextHandlers } from "./context-handlers";
import { Sanitizers } from "./sanitizers";
import { Validations } from "./validations";

export interface ValidationChain
  extends Validations<ValidationChain>,
    Sanitizers<ValidationChain>,
    ContextHandlers<ValidationChain> {
  context: Context;
}
