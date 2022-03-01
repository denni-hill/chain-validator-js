import { ValidationChain } from "../chain/validation-chain";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";
export declare class ArrayContextItem implements ContextItem {
    protected readonly validationChain: ValidationChain;
    constructor(validationChain: ValidationChain);
    run(context: Context): Promise<ValidationResult>;
}
