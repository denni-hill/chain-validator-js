import { ContextHandlersImpl } from "../chain/context-handlers-impl";
import { SanitizersImpl } from "../chain/sanitizers-impl";
import { ValidationChain } from "../chain/validation-chain";
import { ValidationsImpl } from "../chain/validations-impl";
import { ValidationResult } from "../result";
import { bindAll, getValueByPath } from "../utils";
import { Contexter } from "./context-handler";
import { ContextItem } from "./context-item";
import { Sanitizer } from "./sanitizer";
import { Validator } from "./validator";

export type OptionalParams = { nullable: boolean };

export class Context {
  protected _queue: ContextItem[] = [];
  get queue(): ContextItem[] {
    return [...this._queue];
  }
  chain: ValidationChain;
  bailed = false;
  optional: OptionalParams;

  objectToValidate: unknown;
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
    path: string[]
  ): Promise<ValidationResult> {
    this.objectToValidate = objectToValidate;
    this.path = path;
    this.value = getValueByPath(objectToValidate, path);

    const result = new ValidationResult();

    if (this.optional !== undefined) {
      if (this.value === undefined) {
        result.validated = undefined;
        return result;
      }
      if (this.optional.nullable === true) {
        if (this.value === null) {
          result.validated = null;
          return result;
        } else
          result.errors.push({
            value: this.value,
            message: "not nullable",
            path: this.path,
            args: {}
          });
      }
    }

    for (const item of this._queue) {
      if (item instanceof Sanitizer) await item.run(this);
      else if (item instanceof Validator) {
        const err = await item.run(this);
        if (err !== undefined) result.errors.push(err);
        if (result.failed && this.bailed) return result;
      } else if (item instanceof Contexter) {
        item.run(this);
        if (result.failed && this.bailed) return result;
      }
    }

    if (result.passed) result.validated = this.value;
    return result;
  }
}
