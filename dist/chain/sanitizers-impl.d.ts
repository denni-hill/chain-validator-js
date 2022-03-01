import { SanitizerHandlerReturner } from "./../handler/sanitizer-handler";
import { SanitizerContextItem } from "../context/sanitizer-context-item";
import { Context } from "../context/context";
import { Sanitizers } from "./sanitizers";
import { NormalizeEmailOptions } from "../options";
export declare class SanitizersImpl<Chain> implements Sanitizers<Chain> {
    private readonly context;
    private readonly chain;
    constructor(context: Context, chain: Chain);
    addItem(sanitizer: SanitizerContextItem): void;
    addStandartSanitizer(func: {
        (value: string): unknown;
    }, args: Record<string, unknown>): void;
    customSanitizer(handlerReturner: SanitizerHandlerReturner, options?: {
        args?: Record<string, unknown>;
    }): Chain;
    blacklist(chars: string): Chain;
    escape(): Chain;
    unescape(): Chain;
    ltrim(chars?: string): Chain;
    normalizeEmail(options?: NormalizeEmailOptions): Chain;
    rtrim(chars?: string): Chain;
    stripLow(keepNewLines?: boolean): Chain;
    toBoolean(strict?: boolean): Chain;
    toDate(): Chain;
    toFloat(): Chain;
    toInt(radix?: number): Chain;
    trim(chars?: string): Chain;
    whitelist(chars?: string): Chain;
    toString(): Chain;
}
