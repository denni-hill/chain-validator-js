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

  isArray(elementValidationSchema?: unknown): Chain {
    this.addItem(
      new ValidatorContextItem(
        async (value: unknown) => Array.isArray(value),
        {},
        "isArray"
      )
    );

    if (elementValidationSchema !== undefined)
      this.context.addItem(new ArrayContextItem(elementValidationSchema));

    return this.chain;
  }

  isArrayLength(options?: { min?: number; max?: number }): Chain {
    this.isArray();

    if (
      options === undefined ||
      (options.min === undefined && options.max === undefined)
    )
      options = { min: 1, max: undefined };

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
      validator.contains.name
    );

    return this.chain;
  }

  equals(comparison: string): Chain {
    this.addStandartValidator(
      (value) => validator.equals(value, comparison),
      { comparison },
      validator.equals.name
    );

    return this.chain;
  }

  isAfter(date?: string): Chain {
    this.addStandartValidator(
      (value) => validator.isAfter(value, date),
      { date },
      validator.isAfter.name
    );

    return this.chain;
  }

  isAlpha(locale?: AlphaLocale): Chain {
    this.addStandartValidator(
      (value) => validator.isAlpha(value, locale),
      { locale },
      validator.isAlpha.name
    );

    return this.chain;
  }

  isAlphanumeric(
    locale?: AlphanumericLocale,
    options?: IsAlphanumericOptions
  ): Chain {
    this.addStandartValidator(
      (value) => validator.isAlphanumeric(value, locale, options),
      { locale, ...options },
      validator.isAlphanumeric.name
    );

    return this.chain;
  }

  isAscii(): Chain {
    this.addStandartValidator(validator.isAscii, {}, validator.isAscii.name);

    return this.chain;
  }

  isBase32(): Chain {
    this.addStandartValidator(validator.isBase32, {}, validator.isBase32.name);

    return this.chain;
  }

  isBase58(): Chain {
    this.addStandartValidator(validator.isBase58, {}, validator.isBase58.name);

    return this.chain;
  }

  isBase64(options?: IsBase64Options): Chain {
    this.addStandartValidator(
      (value) => validator.isBase64(value, options),
      { ...options },
      validator.isBase64.name
    );

    return this.chain;
  }

  isBefore(date?: string): Chain {
    this.addStandartValidator(
      (value) => validator.isBefore(value, date),
      { date },
      validator.isBefore.name
    );

    return this.chain;
  }

  isIBAN(): Chain {
    this.addStandartValidator(validator.isIBAN, {}, validator.isIBAN.name);

    return this.chain;
  }

  isBIC(): Chain {
    this.addStandartValidator(validator.isBIC, {}, validator.isBIC.name);

    return this.chain;
  }

  isBoolean(): Chain {
    this.addStandartValidator(
      validator.isBoolean,
      {},
      validator.isBoolean.name
    );

    return this.chain;
  }

  isByteLength(options?: IsByteLengthOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isByteLength(value, options),
      { ...options },
      validator.isByteLength.name
    );

    return this.chain;
  }

  isCreditCard(): Chain {
    this.addStandartValidator(
      validator.isCreditCard,
      {},
      validator.isCreditCard.name
    );

    return this.chain;
  }

  isCurrency(options?: IsCurrencyOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isCurrency(value, options),
      { ...options },
      validator.isCurrency.name
    );

    return this.chain;
  }

  isEtheriumAddress(): Chain {
    this.addStandartValidator(
      validator.isEthereumAddress,
      {},
      validator.isEthereumAddress.name
    );

    return this.chain;
  }

  isBtcAddress(): Chain {
    this.addStandartValidator(
      validator.isBtcAddress,
      {},
      validator.isBtcAddress.name
    );

    return this.chain;
  }

  isDataURI(): Chain {
    this.addStandartValidator(
      validator.isDataURI,
      {},
      validator.isDataURI.name
    );

    return this.chain;
  }

  isDate(options?: IsDateOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isDate(value, options),
      { ...options },
      validator.isDate.name
    );

    return this.chain;
  }

  isDecimal(options?: IsDecimalOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isDecimal(value, options),
      { ...options },
      validator.isDecimal.name
    );

    return this.chain;
  }

  isDivisibleBy(number: number): Chain {
    this.addStandartValidator(
      (value) => validator.isDivisibleBy(value, number),
      { number },
      validator.isDivisibleBy.name
    );

    return this.chain;
  }

  isEmail(options?: IsEmailOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isEmail(value, options),
      { ...options },
      validator.isEmail.name
    );

    return this.chain;
  }

  isEmpty(options?: IsEmptyOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isEmpty(value),
      { ...options },
      validator.isEmpty.name
    );

    return this.chain;
  }

  isFloat(options?: IsFloatOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isFloat(value, options),
      { ...options },
      validator.isFloat.name
    );

    return this.chain;
  }

  isFQDN(options?: IsFQDNOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isFQDN(value, options),
      { ...options },
      validator.isFQDN.name
    );

    return this.chain;
  }

  isFullWidth(): Chain {
    this.addStandartValidator(
      validator.isFullWidth,
      {},
      validator.isFullWidth.name
    );

    return this.chain;
  }

  isHalfWidth(): Chain {
    this.addStandartValidator(
      validator.isHalfWidth,
      {},
      validator.isHalfWidth.name
    );

    return this.chain;
  }

  isHash(algorithm: HashAlgorithm): Chain {
    this.addStandartValidator(
      (value) => validator.isHash(value, algorithm),
      { algorithm },
      validator.isHash.name
    );

    return this.chain;
  }

  isHexadecimal(): Chain {
    this.addStandartValidator(
      validator.isHexadecimal,
      {},
      validator.isHexadecimal.name
    );

    return this.chain;
  }

  isHexColor(): Chain {
    this.addStandartValidator(
      validator.isHexColor,
      {},
      validator.isHexColor.name
    );

    return this.chain;
  }

  isHSL(): Chain {
    this.addStandartValidator(validator.isHSL, {}, validator.isHSL.name);

    return this.chain;
  }

  isRgbColor(includePercentValues?: boolean): Chain {
    this.addStandartValidator(
      (value) => validator.isRgbColor(value, includePercentValues),
      { includePercentValues },
      validator.isRgbColor.name
    );

    return this.chain;
  }

  isIn(values: unknown[]): Chain {
    this.addStandartValidator(
      (value) => validator.isIn(value, values),
      { values },
      validator.isIn.name
    );

    return this.chain;
  }

  isInt(options?: IsIntOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isInt(value, options),
      { ...options },
      validator.isInt.name
    );

    return this.chain;
  }

  isIP(version?: IPVersion): Chain {
    this.addStandartValidator(
      (value) => validator.isIP(value, version),
      { version },
      validator.isIP.name
    );

    return this.chain;
  }

  isIPRange(version?: IPVersion): Chain {
    this.addStandartValidator(
      (value) => validator.isIPRange(value, version),
      { version },
      validator.isIPRange.name
    );

    return this.chain;
  }

  isEAN(): Chain {
    this.addStandartValidator(validator.isEAN, {}, validator.isEAN.name);

    return this.chain;
  }

  isISIN(): Chain {
    this.addStandartValidator(validator.isISIN, {}, validator.isISIN.name);

    return this.chain;
  }

  isISO31661Alpha2(): Chain {
    this.addStandartValidator(
      validator.isISO31661Alpha2,
      {},
      validator.isISO31661Alpha2.name
    );

    return this.chain;
  }

  isISO31661Alpha3(): Chain {
    this.addStandartValidator(
      validator.isISO31661Alpha3,
      {},
      validator.isISO31661Alpha3.name
    );

    return this.chain;
  }

  isISO8601(options?: IsISO8601Options): Chain {
    this.addStandartValidator(
      (value) => validator.isISO8601(value, options),
      { ...options },
      validator.isISO8601.name
    );

    return this.chain;
  }

  isISSN(options?: IsISSNOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isISSN(value, options),
      { ...options },
      validator.isISIN.name
    );

    return this.chain;
  }

  isISRC(): Chain {
    this.addStandartValidator(validator.isISRC, {}, validator.isISRC.name);

    return this.chain;
  }

  isRFC3339(): Chain {
    this.addStandartValidator(
      validator.isRFC3339,
      {},
      validator.isRFC3339.name
    );

    return this.chain;
  }

  isJSON(): Chain {
    this.addStandartValidator(validator.isJSON, {}, validator.isJSON.name);

    return this.chain;
  }

  isJWT(): Chain {
    this.addStandartValidator(validator.isJWT, {}, validator.isJWT.name);

    return this.chain;
  }

  isLatLong(): Chain {
    this.addStandartValidator(
      validator.isLatLong,
      {},
      validator.isLatLong.name
    );

    return this.chain;
  }

  isLength(options?: IsLengthOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isLength(value, options),
      { ...options },
      validator.isLength.name
    );

    return this.chain;
  }
  isLocale(): Chain {
    this.addStandartValidator(validator.isLocale, {}, validator.isLocale.name);

    return this.chain;
  }

  isLowercase(): Chain {
    this.addStandartValidator(
      validator.isLowercase,
      {},
      validator.isLowercase.name
    );

    return this.chain;
  }

  isMACAddress(options?: IsMACAddressOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isMACAddress(value, options),
      { ...options },
      validator.isMACAddress.name
    );

    return this.chain;
  }

  isMagnetURI(): Chain {
    this.addStandartValidator(
      validator.isMagnetURI,
      {},
      validator.isMagnetURI.name
    );

    return this.chain;
  }

  isMD5(): Chain {
    this.addStandartValidator(validator.isMD5, {}, validator.isMD5.name);

    return this.chain;
  }

  isMimeType(): Chain {
    this.addStandartValidator(
      validator.isMimeType,
      {},
      validator.isMimeType.name
    );

    return this.chain;
  }

  isMobilePhone(
    locale?: "any" | MobilePhoneLocale | MobilePhoneLocale[],
    options?: IsMobilePhoneOptions
  ): Chain {
    this.addStandartValidator(
      (value) => validator.isMobilePhone(value, locale, options),
      { locale, ...options },
      validator.isMobilePhone.name
    );

    return this.chain;
  }

  isMongoId(): Chain {
    this.addStandartValidator(
      validator.isMongoId,
      {},
      validator.isMongoId.name
    );

    return this.chain;
  }

  isMultibyte(): Chain {
    this.addStandartValidator(
      validator.isMultibyte,
      {},
      validator.isMultibyte.name
    );

    return this.chain;
  }

  isNumeric(options?: IsNumericOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isNumeric(value, options),
      { ...options },
      validator.isNumeric.name
    );

    return this.chain;
  }

  isOctal(): Chain {
    this.addStandartValidator(validator.isOctal, {}, validator.isOctal.name);

    return this.chain;
  }

  isPassportNumber(countryCode?: PassportCountryCode): Chain {
    this.addStandartValidator(
      (value) => validator.isPassportNumber(value, countryCode),
      { countryCode },
      validator.isPassportNumber.name
    );

    return this.chain;
  }

  isPort(): Chain {
    this.addStandartValidator(validator.isPort, {}, validator.isPort.name);

    return this.chain;
  }

  isPostalCode(locale: "any" | PostalCodeLocale): Chain {
    this.addStandartValidator(
      (value) => validator.isPostalCode(value, locale),
      { locale },
      validator.isPostalCode.name
    );

    return this.chain;
  }

  isSemVer(): Chain {
    this.addStandartValidator(validator.isSemVer, {}, validator.isSemVer.name);

    return this.chain;
  }

  isStrongPassword(options?: IsStrongPasswordOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isStrongPassword(value, options),
      { ...options },
      validator.isStrongPassword.name
    );

    return this.chain;
  }

  isSurrogatePair(): Chain {
    this.addStandartValidator(
      validator.isSurrogatePair,
      {},
      validator.isSurrogatePair.name
    );

    return this.chain;
  }

  isURL(options?: IsURLOptions): Chain {
    this.addStandartValidator(
      (value) => validator.isURL(value, options),
      { ...options },
      validator.isURL.name
    );

    return this.chain;
  }

  isUppercase(): Chain {
    this.addStandartValidator(
      validator.isUppercase,
      {},
      validator.isUppercase.name
    );

    return this.chain;
  }

  isUUID(version?: UUIDVersion): Chain {
    this.addStandartValidator(
      (value) => validator.isUUID(value, version),
      { version },
      validator.isUUID.name
    );

    return this.chain;
  }

  isVariableWidth(): Chain {
    this.addStandartValidator(
      validator.isVariableWidth,
      {},
      validator.isVariableWidth.name
    );

    return this.chain;
  }

  isWhitelisted(chars: string | string[]): Chain {
    this.addStandartValidator(
      (value) => validator.isWhitelisted(value, chars),
      { chars },
      validator.isWhitelisted.name
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

    this.addStandartValidator(
      func,
      { pattern, modifiers },
      validator.matches.name
    );

    return this.chain;
  }

  isSlug(): Chain {
    this.addStandartValidator(validator.isSlug, {}, validator.isSlug.name);

    return this.chain;
  }

  isString(): Chain {
    this.addItem(
      new ValidatorContextItem(
        async (value) => typeof value === "string",
        { type: "string" },
        "isString"
      )
    );

    return this.chain;
  }
}
