import { ValidationError } from "./error";
export declare class ValidationResult {
    validated: any;
    errors: ValidationError[];
    get passed(): boolean;
    get failed(): boolean;
    constructor(errors?: ValidationError[]);
}
