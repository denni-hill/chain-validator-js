import { ContexterHandler } from "../handler/contexter-handler";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";
export declare class ContexterContextItem implements ContextItem {
    protected readonly handler: ContexterHandler;
    constructor(handler: ContexterHandler);
    run(context: Context): Promise<ValidationResult>;
}
