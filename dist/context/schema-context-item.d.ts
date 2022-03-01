import { ValidationChain } from "../chain/validation-chain";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";
export declare class SchemaContextItem implements ContextItem {
    protected readonly schema: Record<string, ValidationChain>;
    constructor(schema: Record<string, ValidationChain>);
    run(context: Context): Promise<ValidationResult>;
}
