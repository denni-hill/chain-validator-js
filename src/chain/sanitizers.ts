import { NormalizeEmailOptions } from "../options";

export interface Sanitizers<Return> {
  blacklist(chars: string): Return;

  escape(): Return;

  unescape(): Return;

  ltrim(): Return;

  normalizeEmail(options?: NormalizeEmailOptions): Return;

  rtrim(): Return;

  stripLow(keepNewLines?: boolean): Return;

  toBoolean(strict?: boolean): Return;

  toDate(): Return;

  toFloat(): Return;

  toInt(radix?: number): Return;

  trim(chars?: string): Return;

  whitelist(chars?: string): Return;

  toString(): Return;
}
