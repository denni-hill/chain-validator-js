import { ValidationChain } from "../chain/validation-chain";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";
export declare class OneOfContextItem implements ContextItem {
    protected readonly validationSchemas: ValidationChain[];
    protected readonly validateSelf: boolean;
    constructor(validationSchemas: ValidationChain[], validateSelf: boolean);
    run(context: Context): Promise<ValidationResult>;
}
