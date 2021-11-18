import { ContextersImpl } from "../chain/contexters-impl";
import { SanitizersImpl } from "../chain/sanitizers-impl";
import { ValidationChain } from "../chain/validation-chain";
import { ValidationsImpl } from "../chain/validations-impl";
import { ValidationResult } from "../result";
import { bindAll, getValueByPath } from "../utils";
import { ContextItem } from "./context-item";

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

  name?: string;

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
      bindAll(new ContextersImpl(this, methodsKeeper))
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
          args: { fieldName: this.name }
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
          args: { fieldName: this.name }
        });
      }
      return result;
    }

    for (const item of this._queue) {
      const subValidationResult = await item.run(this);
      if (subValidationResult.passed)
        this.value = subValidationResult.validated;
      else result.errors.push(...subValidationResult.errors);

      if (result.failed && (this.bailed || stopOnFail)) return result;
    }

    if (result.passed) result.validated = this.value;

    return result;
  }
}
