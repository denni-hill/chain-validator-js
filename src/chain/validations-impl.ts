import {
  AlphaLocale,
  AlphanumericLocale,
  CustomValidatorOptions,
  HashAlgorithm,
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
import { Validator } from "../context/validator";
import { ValidationHandler } from "../handler/validation-handler";
import { Validations } from "./validations";
import { IPVersion } from "net";

export class ValidationsImpl<Chain> implements Validations<Chain> {
  protected negateNext = false;

  constructor(
    protected readonly context: Context,
    protected readonly chain: Chain
  ) {}

  protected addItem(validator: Validator): void {
    validator.negate = this.negateNext;
    this.context.addItem(validator);
    this.negateNext = false;
  }

  protected addStandartValidator(
    handler: ValidationHandler,
    args: any,
    message: string
  ): void {
    const validator = new Validator(handler, args, message);
    this.addItem(validator);
  }

  not(): Validations<Chain> {
    this.negateNext = true;
    return this;
  }

  custom(handler: ValidationHandler, options?: CustomValidatorOptions): Chain {
    if (options === undefined) options = {};
    this.addStandartValidator(handler, options.args, options.message);
  }

  isArray(): Chain {
    this.addStandartValidator(
      async (value: any) => Array.isArray(value),
      { type: "array" },
      "invalid type"
    );
    return this.chain;
  }

  contains(seed: any): Chain {
    throw new Error("Method not implemented.");
  }
  equals(comparison: string): Chain {
    throw new Error("Method not implemented.");
  }
  isAfter(date?: string): Chain {
    throw new Error("Method not implemented.");
  }
  isAlpha(locale?: AlphaLocale): Chain {
    throw new Error("Method not implemented.");
  }
  isAplthanumeric(
    locale?: AlphanumericLocale,
    options?: IsAlphanumericOptions
  ): Chain {
    throw new Error("Method not implemented.");
  }
  isAscii(): Chain {
    throw new Error("Method not implemented.");
  }
  isBase32(): Chain {
    throw new Error("Method not implemented.");
  }
  isBase58(): Chain {
    throw new Error("Method not implemented.");
  }
  isBase64(options?: IsBase64Options): Chain {
    throw new Error("Method not implemented.");
  }
  isBefore(date?: string): Chain {
    throw new Error("Method not implemented.");
  }
  isIBAN(): Chain {
    throw new Error("Method not implemented.");
  }
  isBIC(): Chain {
    throw new Error("Method not implemented.");
  }
  isBoolean(): Chain {
    throw new Error("Method not implemented.");
  }
  isByteLength(options?: IsByteLengthOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isCreditCard(): Chain {
    throw new Error("Method not implemented.");
  }
  isCurrency(options?: IsCurrencyOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isEtheriumAddress(): Chain {
    throw new Error("Method not implemented.");
  }
  isBtcAddress(): Chain {
    throw new Error("Method not implemented.");
  }
  isDataURI(): Chain {
    throw new Error("Method not implemented.");
  }
  isDate(options?: IsDateOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isDecimal(options?: IsDecimalOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isDivisibleBy(number: number): Chain {
    throw new Error("Method not implemented.");
  }
  isEmail(options?: IsEmailOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isEmpty(options?: IsEmptyOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isFloat(options?: IsFloatOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isFQDN(options?: IsFQDNOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isFullWidth(): Chain {
    throw new Error("Method not implemented.");
  }
  isHalfWidth(): Chain {
    throw new Error("Method not implemented.");
  }
  isHash(algorithm: HashAlgorithm): Chain {
    throw new Error("Method not implemented.");
  }
  isHexadecimal(): Chain {
    throw new Error("Method not implemented.");
  }
  isHexColor(): Chain {
    throw new Error("Method not implemented.");
  }
  isHSL(): Chain {
    throw new Error("Method not implemented.");
  }
  isRgbColor(includePercentValues?: boolean): Chain {
    throw new Error("Method not implemented.");
  }
  isIn(values: any[]): Chain {
    throw new Error("Method not implemented.");
  }
  isInt(options?: IsIntOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isIP(version?: IPVersion): Chain {
    throw new Error("Method not implemented.");
  }
  isIPRange(version?: IPVersion): Chain {
    throw new Error("Method not implemented.");
  }
  isEAN(): Chain {
    throw new Error("Method not implemented.");
  }
  isISIN(): Chain {
    throw new Error("Method not implemented.");
  }
  isISO31661Alpha2(): Chain {
    throw new Error("Method not implemented.");
  }
  isISO31661Alpha3(): Chain {
    throw new Error("Method not implemented.");
  }
  isISO8601(options?: IsISO8601Options): Chain {
    throw new Error("Method not implemented.");
  }
  isISSN(options?: IsISSNOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isISRC(): Chain {
    throw new Error("Method not implemented.");
  }
  isRFC3339(): Chain {
    throw new Error("Method not implemented.");
  }
  isJSON(): Chain {
    throw new Error("Method not implemented.");
  }
  isJWT(): Chain {
    throw new Error("Method not implemented.");
  }
  isLatLong(): Chain {
    throw new Error("Method not implemented.");
  }
  isLength(options?: IsLengthOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isLocale(): Chain {
    throw new Error("Method not implemented.");
  }
  isLowercase(): Chain {
    throw new Error("Method not implemented.");
  }
  isMACAddress(options?: IsMACAddressOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isMagnetURI(): Chain {
    throw new Error("Method not implemented.");
  }
  isMD5(): Chain {
    throw new Error("Method not implemented.");
  }
  isMimeType(): Chain {
    throw new Error("Method not implemented.");
  }
  isMobilePhone(locale: MobilePhoneLocale | MobilePhoneLocale[]): Chain {
    throw new Error("Method not implemented.");
  }
  isMongoId(): Chain {
    throw new Error("Method not implemented.");
  }
  isMultibyte(): Chain {
    throw new Error("Method not implemented.");
  }
  isNumeric(options?: IsNumericOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isOctal(): Chain {
    throw new Error("Method not implemented.");
  }
  isPassportNumber(countryCode?: PassportCountryCode): Chain {
    throw new Error("Method not implemented.");
  }
  isPort(): Chain {
    throw new Error("Method not implemented.");
  }
  isPostalCode(locale: PostalCodeLocale): Chain {
    throw new Error("Method not implemented.");
  }
  isSemVer(): Chain {
    throw new Error("Method not implemented.");
  }
  isStrongPassword(options?: IsStrongPasswordOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isSurrogatePair(): Chain {
    throw new Error("Method not implemented.");
  }
  isURL(options?: IsURLOptions): Chain {
    throw new Error("Method not implemented.");
  }
  isUppercase(): Chain {
    throw new Error("Method not implemented.");
  }
  isUUID(version?: UUIDVersion): Chain {
    throw new Error("Method not implemented.");
  }
  isVariableWidth(): Chain {
    throw new Error("Method not implemented.");
  }
  isWhitelisted(chars: string | string[]): Chain {
    throw new Error("Method not implemented.");
  }
  matches(pattern: RegExp): Chain;
  matches(pattern: string, modifiers?: string): Chain;
  matches(pattern: any, modifiers?: any): Chain {
    throw new Error("Method not implemented.");
  }
  isSlug(): Chain {
    throw new Error("Method not implemented.");
  }

  isString(): Chain {
    this.addStandartValidator(
      "invalid type",
      async (value: any) => typeof value === "string",
      { type: "string" }
    );
    return this.chain;
  }
}
