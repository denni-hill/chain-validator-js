import {
  AlphaLocale,
  AlphanumericLocale,
  HashAlgorithm,
  IPVersion,
  IsAlphanumericOptions,
  IsBase64Options,
  IsByteLengthOptions,
  IsCurrencyOptions,
  IsDateOptions,
  IsDecimalOptions,
  IsEmailOptions,
  IsEmptyOptions,
  IsFloatOptions,
  IsFQDNOptions,
  IsIntOptions,
  IsISO8601Options,
  IsISSNOptions,
  IsLengthOptions,
  IsMACAddressOptions,
  IsMobilePhoneOptions,
  IsNumericOptions,
  IsStrongPasswordOptions,
  IsURLOptions,
  MobilePhoneLocale,
  PassportCountryCode,
  PostalCodeLocale,
  UUIDVersion
} from "./../options";
import validator from "validator";
import { Context } from "../context/context";
import { ValidatorContextItem } from "../context/validator-context-item";
import { ValidationHandlerReturner } from "../handler/validation-handler";
import { Validations } from "./validations";
import { toString } from "../utils";
import { ArrayContextItem } from "../context/array-context-item";
import { ValidationChain } from "./validation-chain";

export class ValidationsImpl<Chain> implements Validations<Chain> {
  protected negateNext = false;

  constructor(
    protected readonly context: Context,
    protected readonly chain: Chain
  ) {}

  protected addItem(validator: ValidatorContextItem): void {
    validator.negate = this.negateNext;
    this.context.addItem(validator);
    this.negateNext = false;
  }

  protected addStandartValidator(
    func: { (value: string): boolean },
    args: Record<string, unknown>,
    message: string
  ): void {
    const asyncHandler = async (value: unknown) => func(toString(value));
    const validator = new ValidatorContextItem(asyncHandler, args, message);
    this.addItem(validator);
  }

  withMessage(message: string): Chain {
    if (this.context.queue.length === 0)
      throw new Error("Validation chain cannot start from withMessage");
    const lastContextItem = this.context.queue[this.context.queue.length - 1];
    if (!(lastContextItem instanceof ValidatorContextItem))
      throw new Error(
        "Only validators can be modified with withMessage method"
      );

    lastContextItem.message = message;

    return this.chain;
  }

  not(): Validations<Chain> {
    this.negateNext = true;

    return this;
  }

  custom(
    handler: ValidationHandlerReturner,
    options?: { args?: Record<string, unknown>; message?: string }
  ): Chain {
    if (options === undefined) options = {};
    this.addItem(
      new ValidatorContextItem(
        handler(this.context),
        options.args,
        options.message
      )
    );

    return this.chain;
  }

  isArray(elementValidationChain?: ValidationChain): Chain {
    this.addItem(
      new ValidatorContextItem(
        async (value: unknown) => Array.isArray(value),
        {},
        "isArray"
      )
    );

    if (elementValidationChain !== undefined)
      this.context.addItem(new ArrayContextItem(elementValidationChain));

    return this.chain;
  }

  isArrayLength(options?: { min?: number; max?: number }): Chain {
    this.isArray();

    if (options === undefined) options = { min: 1, max: Infinity };
    if (options.min === undefined) options.min = 1;
    if (options.max === undefined) options.max = Infinity;

    this.addItem(
      new ValidatorContextItem(
        async (value: unknown[]) =>
          (options.min === undefined || value.length >= options.min) &&
          (options.max === undefined || value.length <= options.max),
        { ...options },
        "isArrayLength"
      )
    );

    return this.chain;
  }

  contains(seed: unknown): Chain {
    this.addStandartValidator(
      (value) => validator.contains(value, seed),
      { seed },
      "contains"
    );

    return this.chain;
  }

  equals(comparison: string): Chain {
    this.addStandartValidator(
      (value) => validator.equals(value, comparison),
      { comparison },
      "equals"
    );

    return this.chain;
  }

  isAfter(date: string): Chain {
    this.addStandartValidator(
      (value) => validator.isAfter(value, date),
      { date },
      "isAfter"
    );

    return this.chain;
  }

  isAlpha(locale: AlphaLocale): Chain {
    this.addStandartValidator(
      (value) => validator.isAlpha(value, locale),
      { locale },
      "isAlpha"
    );

    return this.chain;
  }

  isAlphanumeric(
    locale: AlphanumericLocale,
    options?: IsAlphanumericOptions
  ): Chain {
    this.addStandartValidator(
      (value) => validator.isAlphanumeric(value, locale, options),
      { locale, ...options },
      "isAlphanumeric"
    );

    return this.chain;
  }

  isAscii(): Chain {
    this.addStandartValidator(validator.isAscii, {}, "isAscii");

    return this.chain;
  }

  isBase32(): Chain {
    this.addStandartValidator(validator.isBase32, {}, "isBase32");

    return this.chain;
  }

  isBase58(): Chain {
    this.addStandartValidator(validator.isBase58, {}, "isBase58");

    return this.chain;
  }

  isBase64(options?: IsBase64Options): Chain {
    this.addStandartValidator(
      (value) => validator.isBase64(value, options),
      { ...options },
      "isBase64"
    );

    return this.chain;
  }

  isBefore(date?: string): Chain {
    this.addStandartValidator(
      (value) => validator.isBefore(value, date),
      { date },
      "isBefore"
    );

    return this.chain;
  }

  isIBAN(): Chain {
    this.addStandartValidator(validator.isIBAN, {}, "isIBAN");

    return this.chain;
  }

  isBIC(): Chain {
    this.addStandartValidator(validator.isBIC, {}, "isBIC");

    return this.chain;
  }

  isBoolean(): Chain {
    this.addStandartValidator(validator.isBoolean, {}, "isBoolean");

    return this.chain;
  }

  isByteLength(options?: IsByteLengthOptions): Chain {
    if (options === undefined) options = {};
    if (options.min === undefined) options.min = 1;
    if (options.max === undefined) options.max = Infinity;
    this.addStandartValidator(
      (value) => validator.isByteLength(value, options),
      { ...options },
      "isByteLength"
    );

    return this.chain;
  }

  isCreditCard(): Chain {
    this.addStandartValidator(validator.isCreditCard, {}, "isCreditCard");

    return this.chain;
  }

  isCurrency(options?: IsCurrencyOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isCurrency(value, options),
      { ...options },
      "isCurrency"
    );

    return this.chain;
  }

  isEtheriumAddress(): Chain {
    this.addStandartValidator(
      validator.isEthereumAddress,
      {},
      "isEthereumAddress"
    );

    return this.chain;
  }

  isBtcAddress(): Chain {
    this.addStandartValidator(validator.isBtcAddress, {}, "isBtcAddress");

    return this.chain;
  }

  isDataURI(): Chain {
    this.addStandartValidator(validator.isDataURI, {}, "isDataURI");

    return this.chain;
  }

  isDate(options?: IsDateOptions): Chain {
    this.addStandartValidator(
      (value) =>
        validator.isDate(value, options) || new Date(value).valueOf() !== NaN,
      { ...options },
      "isDate"
    );

    return this.chain;
  }

  isDecimal(options?: IsDecimalOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isDecimal(value, options),
      { ...options },
      "isDecimal"
    );

    return this.chain;
  }

  isDivisibleBy(number: number): Chain {
    this.addStandartValidator(
      (value) => validator.isDivisibleBy(value, number),
      { number },
      "isDivisibleBy"
    );

    return this.chain;
  }

  isEmail(options?: IsEmailOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isEmail(value, options),
      { ...options },
      "isEmail"
    );

    return this.chain;
  }

  isEmpty(options?: IsEmptyOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isEmpty(value),
      { ...options },
      "isEmpty"
    );

    return this.chain;
  }

  isFloat(options?: IsFloatOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isFloat(value, options),
      { ...options },
      "isFloat"
    );

    return this.chain;
  }

  isFQDN(options?: IsFQDNOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isFQDN(value, options),
      { ...options },
      "isFQDN"
    );

    return this.chain;
  }

  isFullWidth(): Chain {
    this.addStandartValidator(validator.isFullWidth, {}, "isFullWidth");

    return this.chain;
  }

  isHalfWidth(): Chain {
    this.addStandartValidator(validator.isHalfWidth, {}, "isHalfWidth");

    return this.chain;
  }

  isHash(algorithm: HashAlgorithm): Chain {
    this.addStandartValidator(
      (value) => validator.isHash(value, algorithm),
      { algorithm },
      "isHash"
    );

    return this.chain;
  }

  isHexadecimal(): Chain {
    this.addStandartValidator(validator.isHexadecimal, {}, "isHexadecimal");

    return this.chain;
  }

  isHexColor(): Chain {
    this.addStandartValidator(validator.isHexColor, {}, "isHexColor");

    return this.chain;
  }

  isHSL(): Chain {
    this.addStandartValidator(validator.isHSL, {}, "isHSL");

    return this.chain;
  }

  isRgbColor(includePercentValues?: boolean): Chain {
    this.addStandartValidator(
      (value) => validator.isRgbColor(value, includePercentValues),
      { includePercentValues },
      "isRgbColor"
    );

    return this.chain;
  }

  isIn(values: unknown[]): Chain {
    this.addStandartValidator(
      (value) => validator.isIn(value, values),
      { values },
      "isIn"
    );

    return this.chain;
  }

  isInt(options?: IsIntOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isInt(value, options),
      { ...options },
      "isInt"
    );

    return this.chain;
  }

  isIP(version: IPVersion = "4"): Chain {
    this.addStandartValidator(
      (value) => validator.isIP(value, version),
      { version },
      "isIP"
    );

    return this.chain;
  }

  isIPRange(version: IPVersion = "4"): Chain {
    this.addStandartValidator(
      (value) => validator.isIPRange(value, version),
      { version },
      "isIPRange"
    );

    return this.chain;
  }

  isEAN(): Chain {
    this.addStandartValidator(validator.isEAN, {}, "isEAN");

    return this.chain;
  }

  isISIN(): Chain {
    this.addStandartValidator(validator.isISIN, {}, "isISIN");

    return this.chain;
  }

  isISO31661Alpha2(): Chain {
    this.addStandartValidator(
      validator.isISO31661Alpha2,
      {},
      "isISO31661Alpha2"
    );

    return this.chain;
  }

  isISO31661Alpha3(): Chain {
    this.addStandartValidator(
      validator.isISO31661Alpha3,
      {},
      "isISO31661Alpha3"
    );

    return this.chain;
  }

  isISO8601(options?: IsISO8601Options): Chain {
    this.addStandartValidator(
      (value) => validator.isISO8601(value, options),
      { ...options },
      "isISO8601"
    );

    return this.chain;
  }

  isISSN(options?: IsISSNOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isISSN(value, options),
      { ...options },
      "isISIN"
    );

    return this.chain;
  }

  isISRC(): Chain {
    this.addStandartValidator(validator.isISRC, {}, "isISRC");

    return this.chain;
  }

  isRFC3339(): Chain {
    this.addStandartValidator(validator.isRFC3339, {}, "isRFC3339");

    return this.chain;
  }

  isJSON(): Chain {
    this.addStandartValidator(validator.isJSON, {}, "isJSON");

    return this.chain;
  }

  isJWT(): Chain {
    this.addStandartValidator(validator.isJWT, {}, "isJWT");

    return this.chain;
  }

  isLatLong(): Chain {
    this.addStandartValidator(validator.isLatLong, {}, "isLatLong");

    return this.chain;
  }

  isLength(options?: IsLengthOptions): Chain {
    if (options === undefined) options = { min: 1, max: Infinity };
    if (options.min === undefined) options.min = 1;
    if (options.max === undefined) options.max = Infinity;

    this.addStandartValidator(
      (value) => validator.isLength(value, options),
      { ...options },
      "isLength"
    );

    return this.chain;
  }
  isLocale(): Chain {
    this.addStandartValidator(validator.isLocale, {}, "isLocale");

    return this.chain;
  }

  isLowercase(): Chain {
    this.addStandartValidator(validator.isLowercase, {}, "isLowercase");

    return this.chain;
  }

  isMACAddress(options?: IsMACAddressOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isMACAddress(value, options),
      { ...options },
      "isMACAddress"
    );

    return this.chain;
  }

  isMagnetURI(): Chain {
    this.addStandartValidator(validator.isMagnetURI, {}, "isMagnetURI");

    return this.chain;
  }

  isMD5(): Chain {
    this.addStandartValidator(validator.isMD5, {}, "isMD5");

    return this.chain;
  }

  isMimeType(): Chain {
    this.addStandartValidator(validator.isMimeType, {}, "isMimeType");

    return this.chain;
  }

  isMobilePhone(
    locale: "any" | MobilePhoneLocale | MobilePhoneLocale[] = "ru-RU",
    options?: IsMobilePhoneOptions
  ): Chain {
    this.addStandartValidator(
      (value) => validator.isMobilePhone(value, locale, options),
      { locale, ...options },
      "isMobilePhone"
    );

    return this.chain;
  }

  isMongoId(): Chain {
    this.addStandartValidator(validator.isMongoId, {}, "isMongoId");

    return this.chain;
  }

  isMultibyte(): Chain {
    this.addStandartValidator(validator.isMultibyte, {}, "isMultibyte");

    return this.chain;
  }

  isNumeric(
    options: IsNumericOptions & { min?: number; max?: number } = {}
  ): Chain {
    this.addStandartValidator(
      (value) =>
        validator.isNumeric(value, options) &&
        (isNaN(options.min) || Number(value) >= options.min) &&
        (isNaN(options.max) || Number(value) <= options.max),
      { ...options },
      "isNumeric"
    );

    return this.chain;
  }

  isOctal(): Chain {
    this.addStandartValidator(validator.isOctal, {}, "isOctal");

    return this.chain;
  }

  isPassportNumber(countryCode?: PassportCountryCode): Chain {
    this.addStandartValidator(
      (value) => validator.isPassportNumber(value, countryCode),
      { countryCode },
      "isPassportNumber"
    );

    return this.chain;
  }

  isPort(): Chain {
    this.addStandartValidator(validator.isPort, {}, "isPort");

    return this.chain;
  }

  isPostalCode(locale: "any" | PostalCodeLocale): Chain {
    this.addStandartValidator(
      (value) => validator.isPostalCode(value, locale),
      { locale },
      "isPostalCode"
    );

    return this.chain;
  }

  isSemVer(): Chain {
    this.addStandartValidator(validator.isSemVer, {}, "isSemVer");

    return this.chain;
  }

  isStrongPassword(options?: IsStrongPasswordOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isStrongPassword(value, options),
      { ...options },
      "isStrongPassword"
    );

    return this.chain;
  }

  isSurrogatePair(): Chain {
    this.addStandartValidator(validator.isSurrogatePair, {}, "isSurrogatePair");

    return this.chain;
  }

  isURL(options?: IsURLOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isURL(value, options),
      { ...options },
      "isURL"
    );

    return this.chain;
  }

  isUppercase(): Chain {
    this.addStandartValidator(validator.isUppercase, {}, "isUppercase");

    return this.chain;
  }

  isUUID(version?: UUIDVersion): Chain {
    this.addStandartValidator(
      (value) => validator.isUUID(value, version),
      { version },
      "isUUID"
    );

    return this.chain;
  }

  isVariableWidth(): Chain {
    this.addStandartValidator(validator.isVariableWidth, {}, "isVariableWidth");

    return this.chain;
  }

  isWhitelisted(chars: string | string[]): Chain {
    this.addStandartValidator(
      (value) => validator.isWhitelisted(value, chars),
      { chars },
      "isWhitelisted"
    );

    return this.chain;
  }

  matches(pattern: RegExp): Chain;
  matches(pattern: string, modifiers?: string): Chain;
  matches(pattern: unknown, modifiers?: unknown): Chain {
    if (modifiers !== undefined && typeof modifiers !== "string")
      throw new Error("given modifiers is not type of string");
    let func: { (value: string): boolean };
    if (pattern instanceof RegExp) {
      func = (value) => validator.matches(value, pattern);
    } else if (typeof pattern === "string") {
      func = (value) => validator.matches(value, pattern, modifiers);
    } else throw new Error("given pattern is not correct string or RegExp");

    this.addStandartValidator(func, { pattern, modifiers }, "matches");

    return this.chain;
  }

  isSlug(): Chain {
    this.addStandartValidator(validator.isSlug, {}, "isSlug");

    return this.chain;
  }

  isString(): Chain {
    this.addItem(
      new ValidatorContextItem(
        async (value) => typeof value === "string",
        {},
        "isString"
      )
    );

    return this.chain;
  }
}
