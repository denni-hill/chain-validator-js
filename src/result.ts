import { ValidationError } from "./error";

export class ValidationResult {
  validated: any = {};

  errors: ValidationError[] = [];

  get passed(): boolean {
    return this.errors.length === 0;
  }
  get failed(): boolean {
    return !this.passed;
  }

  constructor(errors: ValidationError[] = []) {
    this.errors = errors;
  }
}
