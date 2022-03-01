import { ValidationChain } from "../chain/validation-chain";
import { ValidationResult } from "../result";
import { Context } from "./context";
import { ContextItem } from "./context-item";
export declare class ConditionContextItem implements ContextItem {
    protected readonly condition: ValidationChain;
    protected readonly ifTrue: ValidationChain;
    protected readonly ifFalse: ValidationChain;
    protected readonly validateSelf: boolean;
    constructor(condition: ValidationChain, ifTrue: ValidationChain, ifFalse: ValidationChain, validateSelf: boolean);
    run(context: Context): Promise<ValidationResult>;
}
