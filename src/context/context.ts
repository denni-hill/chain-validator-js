import { ContextHandlersImpl } from "../chain/context-handlers-impl";
import { SanitizersImpl } from "../chain/sanitizers-impl";
import { ValidationChain } from "../chain/validation-chain";
import { ValidationsImpl } from "../chain/validations-impl";
import { ValidationResult } from "../result";
import { bindAll, getValueByPath } from "../utils";
import { ContexterContextItem } from "./contexter-context-item";
import { ContextItem } from "./context-item";
import { SanitizerContextItem } from "./sanitizer-context-item";
import { ValidatorContextItem } from "./validator-context-item";
import { ConditionContextItem } from "./condition-context-item";
import { ArrayContextItem } from "./array-context-item";

export type OptionalParams = { nullable: boolean };

export class Context {
  protected _queue: ContextItem[] = [];
  get queue(): ContextItem[] {
    return [...this._queue];
  }
  chain: ValidationChain;
  bailed = false;
  optional: OptionalParams;

  objectToValidate: any;
  path: string[];
  value: unknown;

  addItem(item: ContextItem): void {
    this._queue.push(item);
  }

  constructor() {
    const methodsKeeper = {};

    this.chain = Object.assign(
      methodsKeeper,
      { context: this },
      bindAll(new SanitizersImpl(this, methodsKeeper)),
      bindAll(new ValidationsImpl(this, methodsKeeper)),
      bindAll(new ContextHandlersImpl(this, methodsKeeper))
    );
  }

  async run(
    objectToValidate: unknown,
    path: string[],
    stopOnFail: boolean
  ): Promise<ValidationResult> {
    this.objectToValidate = objectToValidate;
    this.path = path;
    this.value = getValueByPath(objectToValidate, path);

    const result = new ValidationResult();

    if (this.value === undefined) {
      if (this.optional !== undefined) result.validated = undefined;
      else {
        result.errors.push({
          value: this.value,
          message: "required",
          path: this.path,
          args: {}
        });
      }
      return result;
    } else if (this.value === null) {
      if (this.optional !== undefined && this.optional.nullable)
        result.validated = null;
      else {
        result.errors.push({
          value: this.value,
          message: "not nullable",
          path: this.path,
          args: {}
        });
      }
      return result;
    }

    for (const item of this._queue) {
      if (item instanceof SanitizerContextItem) await item.run(this);
      else if (item instanceof ValidatorContextItem) {
        const err = await item.run(this);
        if (err !== undefined) result.errors.push(err);
      } else if (item instanceof ContexterContextItem) {
        await item.run(this);
      } else if (
        item instanceof ConditionContextItem ||
        item instanceof ArrayContextItem
      ) {
        const subValidationResult = await item.run(this);
        result.errors.push(...subValidationResult.errors);
        if (subValidationResult.passed)
          this.value = subValidationResult.validated;
      }

      if (result.failed && (this.bailed || stopOnFail)) return result;
    }

    if (result.passed) result.validated = this.value;
    return result;
  }
}
