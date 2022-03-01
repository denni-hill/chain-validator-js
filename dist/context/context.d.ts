import { ValidationChain } from "../chain/validation-chain";
import { ValidationResult } from "../result";
import { ContextItem } from "./context-item";
export declare type OptionalParams = {
    nullable: boolean;
};
export declare class Context {
    protected _queue: ContextItem[];
    get queue(): ContextItem[];
    chain: ValidationChain;
    bailed: boolean;
    optional: OptionalParams;
    objectToValidate: any;
    path: string[];
    value: unknown;
    name?: string;
    addItem(item: ContextItem): void;
    constructor();
    run(objectToValidate: unknown, path: string[], stopOnFail: boolean): Promise<ValidationResult>;
}
