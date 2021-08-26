import { ContextHandlerImpl } from "../chain/context-handler-impl";
import { SanitizersImpl } from "../chain/sanitizers-impl";
import { ValidationChain } from "../chain/validation-chain";
import { ValidationsImpl } from "../chain/validations-impl";
import { ValidationResult } from "../result";
import { bindAll } from "../utils";
import { ContextItem } from "./context-item";
import { Sanitizer } from "./sanitizer";
import { Validator } from "./validator";

export type OptionalParams = { nullable: boolean };

export class Context {
  protected queue: ContextItem[] = [];
  chain: ValidationChain;
  bailed = false;
  optional: OptionalParams;

  objectToValidate: any;
  path: string[];
  value: any;

  addItem(item: ContextItem): void {
    this.queue.push(item);
  }

  constructor() {
    const methodsKeeper = {};

    this.chain = Object.assign(
      methodsKeeper,
      { context: this },
      bindAll(new SanitizersImpl(this, methodsKeeper)),
      bindAll(new ValidationsImpl(this, methodsKeeper)),
      bindAll(new ContextHandlerImpl(this, methodsKeeper))
    );
  }

  async run(
    objectToValidate: any,
    path: string[],
    value: any
  ): Promise<ValidationResult> {
    this.objectToValidate = objectToValidate;
    this.path = path;
    this.value = value;

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
            message: "not nullable",
            path: this.path,
            args: {}
          });
      }
    }

    for (const chain of this.queue) {
      if (chain instanceof Sanitizer) await chain.run(this);
      else if (chain instanceof Validator) {
        const err = await chain.run(this);
        if (err !== undefined) result.errors.push(err);
        if (result.failed && this.bailed) return result;
      }
    }

    if (result.passed) result.validated = this.value;
    return result;
  }
}
