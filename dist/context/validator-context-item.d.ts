import { Context } from "./context";
import { ValidationHandler } from "../handler/validation-handler";
import { ContextItem } from "./context-item";
import { ValidationResult } from "../result";
export declare class ValidatorContextItem implements ContextItem {
    readonly handler: ValidationHandler;
    readonly args: Record<string, unknown>;
    message: string;
    negate: boolean;
    constructor(handler: ValidationHandler, args?: Record<string, unknown>, message?: string);
    run(context: Context): Promise<ValidationResult>;
}
