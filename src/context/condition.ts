import { validate } from "..";
import { ValidationChain } from "../chain/validation-chain";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class Condition implements ContextItem {
  message = "invalid value";
  constructor(
    protected readonly condition: unknown,
    protected readonly ifTrue: ValidationChain,
    protected readonly ifFalse: ValidationChain,
    protected readonly validateSelf: boolean
  ) {}

  async run(context: Context): Promise<ValidationResult> {
    const ifConditionResult = await validate(
      context.objectToValidate,
      this.condition,
      this.validateSelf ? context.path : [],
      true
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
