import { Context, OptionalParams } from "../context/context";
import { ContexterContextItem } from "../context/contexter-context-item";
import { Contexters } from "./contexters";
import { ValidationChain } from "./validation-chain";
export declare class ContextersImpl<Chain> implements Contexters<Chain> {
    private readonly context;
    private readonly chain;
    constructor(context: Context, chain: Chain);
    protected addItem(contexter: ContexterContextItem): void;
    schema(schema: Record<string, ValidationChain>): Chain;
    name(fieldName: string): Chain;
    bail(): Chain;
    if(conditionSchema: ValidationChain, options: {
        ifTrue?: ValidationChain;
        ifFalse?: ValidationChain;
    }): Chain;
    ifSelf(conditionSchema: ValidationChain, options: {
        ifTrue?: ValidationChain;
        ifFalse?: ValidationChain;
    }): Chain;
    oneOf(...conditionSchemas: ValidationChain[]): Chain;
    oneOfSelf(...conditionSchemas: ValidationChain[]): Chain;
    optional(options?: OptionalParams): Chain;
}
