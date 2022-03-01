import { ValidationResult } from "./result";
import { ValidationChain } from "./chain/validation-chain";
export declare function validate(objectToValidate: unknown, chain: ValidationChain, path?: string[], stopOnFail?: boolean): Promise<ValidationResult>;
export declare function build(): ValidationChain;
