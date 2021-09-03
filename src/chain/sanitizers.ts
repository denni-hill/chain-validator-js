import { SanitizerHandlerReturner } from "../handler/sanitizer-handler";
import { NormalizeEmailOptions } from "../options";

export interface Sanitizers<Return> {
  customSanitizer(
    handler: SanitizerHandlerReturner,
    options?: { args?: unknown; message?: string }
  ): Return;

  blacklist(chars: string): Return;

  escape(): Return;

  unescape(): Return;

  ltrim(chars?: string): Return;

  normalizeEmail(options?: NormalizeEmailOptions): Return;

  rtrim(chars?: string): Return;

  stripLow(keepNewLines?: boolean): Return;

  toBoolean(strict?: boolean): Return;

  toDate(): Return;

  toFloat(): Return;

  toInt(radix?: number): Return;

  trim(chars?: string): Return;

  whitelist(chars?: string): Return;

  toString(): Return;
}
