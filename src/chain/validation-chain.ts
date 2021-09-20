import { Context } from "../context/context";
import { Contexters } from "./contexters";
import { Sanitizers } from "./sanitizers";
import { Validations } from "./validations";

export interface ValidationChain
  extends Validations<ValidationChain>,
    Sanitizers<ValidationChain>,
    Contexters<ValidationChain> {
  context: Context;
}
