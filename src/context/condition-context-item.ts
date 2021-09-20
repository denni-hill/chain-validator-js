import { validate } from "..";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class ConditionContextItem implements ContextItem {
  constructor(
    protected readonly condition: unknown,
    protected readonly ifTrue: unknown,
    protected readonly ifFalse: unknown,
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
