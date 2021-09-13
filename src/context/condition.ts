import { validate } from "..";
import { ValidationChain } from "../chain/validation-chain";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class Condition implements ContextItem {
  message = "invalid value";
  constructor(
    protected readonly conditionSchema: unknown,
    protected readonly ifTrue: ValidationChain,
    protected readonly ifFalse: ValidationChain
  ) {}

  async run(context: Context): Promise<ValidationResult> {
    const ifConditionResult = await validate(
      context.objectToValidate,
      this.conditionSchema
    );

    if (ifConditionResult.passed && this.ifTrue !== undefined)
      return await validate(
        context.objectToValidate,
        this.ifTrue,
        context.path
      );
    else if (ifConditionResult.failed && this.ifFalse !== undefined)
      return await validate(
        context.objectToValidate,
        this.ifFalse,
        context.path
      );

    const result = new ValidationResult();
    result.validated = context.value;
    return result;
  }
}
