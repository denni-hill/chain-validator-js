import { SanitizerHandler } from "../handler/sanitizer-handler";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";
export declare class SanitizerContextItem implements ContextItem {
    readonly handler: SanitizerHandler;
    readonly args: Record<string, unknown>;
    constructor(handler: SanitizerHandler, args?: Record<string, unknown>);
    run(context: Context): Promise<ValidationResult>;
}
