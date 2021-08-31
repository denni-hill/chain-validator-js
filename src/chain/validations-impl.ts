import {
  AlphaLocale,
  AlphanumericLocale,
  CustomValidatorOptions,
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
import { isArray } from "../implementations/validators/is-array";
import { toString } from "../utils";

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
    return this.chain;
  }

  isArray(): Chain {
    this.addStandartValidator(isArray, { type: "array" }, "type");
    return this.chain;
  }

  contains(seed: any): Chain {
    this.addStandartValidator(
      async (value: any) => validator.contains(toString(value), seed),
      { seed },
      "contains"
    );
    return this.chain;
  }

  equals(comparison: string): Chain {
    this.addStandartValidator(
      async (value: any) => validator.equals(toString(value), comparison),
      { comparison },
      "equals"
    );

    return this.chain;
  }

  isAfter(date?: string): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isAfter(toString(value), date),
      { date },
      "isAfter"
    );

    return this.chain;
  }

  isAlpha(locale?: AlphaLocale): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isAlpha(toString(value), locale),
      { locale },
      "isAlpha"
    );

    return this.chain;
  }

  isAlphanumeric(
    locale?: AlphanumericLocale,
    options?: IsAlphanumericOptions
  ): Chain {
    this.addStandartValidator(
      async (value: any) =>
        validator.isAlphanumeric(toString(value), locale, options),
      { locale, ...options },
      "isAlphanumeric"
    );
    return this.chain;
  }

  isAscii(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isAscii(toString(value)),
      {},
      "isAscii"
    );
    return this.chain;
  }

  isBase32(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isBase32(toString(value)),
      {},
      "isBase32"
    );

    return this.chain;
  }

  isBase58(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isBase58(toString(value)),
      {},
      "isBase58"
    );

    return this.chain;
  }

  isBase64(options?: IsBase64Options): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isBase64(toString(value), options),
      { ...options },
      "isBase64"
    );

    return this.chain;
  }

  isBefore(date?: string): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isBefore(toString(value), date),
      { date },
      "isBefore"
    );

    return this.chain;
  }

  isIBAN(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isIBAN(toString(value)),
      {},
      "isIBAN"
    );

    return this.chain;
  }

  isBIC(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isBIC(toString(value)),
      {},
      "isBIC"
    );

    return this.chain;
  }

  isBoolean(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isBoolean(toString(value)),
      {},
      "isBoolean"
    );

    return this.chain;
  }

  isByteLength(options?: IsByteLengthOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isByteLength(toString(value), options),
      { ...options },
      "isByteLength"
    );

    return this.chain;
  }

  isCreditCard(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isCreditCard(toString(value)),
      {},
      "isCreditCard"
    );

    return this.chain;
  }

  isCurrency(options?: IsCurrencyOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isCurrency(toString(value), options),
      { ...options },
      "isCurrency"
    );

    return this.chain;
  }

  isEtheriumAddress(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isEthereumAddress(toString(value)),
      {},
      "isEtheriumAddress"
    );

    return this.chain;
  }

  isBtcAddress(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isBtcAddress(toString(value)),
      {},
      "isBtcAddress"
    );

    return this.chain;
  }

  isDataURI(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isDataURI(toString(value)),
      {},
      "isDataURI"
    );

    return this.chain;
  }

  isDate(options?: IsDateOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isDate(toString(value), options),
      { ...options },
      "isDate"
    );

    return this.chain;
  }

  isDecimal(options?: IsDecimalOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isDecimal(toString(value), options),
      { ...options },
      "isDecimal"
    );

    return this.chain;
  }

  isDivisibleBy(number: number): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isDivisibleBy(toString(value), number),
      { number },
      "isDivisibleBy"
    );

    return this.chain;
  }

  isEmail(options?: IsEmailOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isEmail(toString(value), options),
      { ...options },
      "isEmail"
    );

    return this.chain;
  }

  isEmpty(options?: IsEmptyOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isEmpty(toString(value), options),
      { ...options },
      "isEmpty"
    );

    return this.chain;
  }

  isFloat(options?: IsFloatOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isFloat(toString(value), options),
      { ...options },
      "isFloat"
    );

    return this.chain;
  }

  isFQDN(options?: IsFQDNOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isFQDN(toString(value), options),
      { ...options },
      "isFQDN"
    );

    return this.chain;
  }

  isFullWidth(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isFullWidth(toString(value)),
      {},
      "isFullWidth"
    );

    return this.chain;
  }

  isHalfWidth(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isHalfWidth(toString(value)),
      {},
      "isHalfWidh"
    );

    return this.chain;
  }

  isHash(algorithm: HashAlgorithm): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isHash(toString(value), algorithm),
      { algorithm },
      "isHash"
    );

    return this.chain;
  }

  isHexadecimal(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isHexadecimal(toString(value)),
      {},
      "isHexadecimal"
    );

    return this.chain;
  }

  isHexColor(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isHexColor(toString(value)),
      {},
      "isHexColor"
    );

    return this.chain;
  }

  isHSL(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isHSL(toString(value)),
      {},
      "isHSL"
    );

    return this.chain;
  }

  isRgbColor(includePercentValues?: boolean): Chain {
    this.addStandartValidator(
      async (value: any) =>
        validator.isRgbColor(toString(value), includePercentValues),
      { includePercentValues },
      "isRgbColor"
    );

    return this.chain;
  }

  isIn(values: any[]): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isIn(toString(value), values),
      { values },
      "isIn"
    );

    return this.chain;
  }

  isInt(options?: IsIntOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isInt(toString(value), options),
      { ...options },
      "isInt"
    );

    return this.chain;
  }

  isIP(version?: IPVersion): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isIP(toString(value), version),
      { version },
      "isIP"
    );

    return this.chain;
  }

  isIPRange(version?: IPVersion): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isIPRange(toString(value), version),
      { version },
      "isIPRange"
    );

    return this.chain;
  }

  isEAN(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isEAN(toString(value)),
      {},
      "isEAN"
    );

    return this.chain;
  }

  isISIN(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isISIN(toString(value)),
      {},
      "isISIN"
    );

    return this.chain;
  }

  isISO31661Alpha2(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isISO31661Alpha2(toString(value)),
      {},
      "isISO31661Alpha2"
    );

    return this.chain;
  }

  isISO31661Alpha3(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isISO31661Alpha3(toString(value)),
      {},
      "isISO31661Alpha3"
    );

    return this.chain;
  }

  isISO8601(options?: IsISO8601Options): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isISO8601(toString(value), options),
      { ...options },
      "isISO8601"
    );

    return this.chain;
  }

  isISSN(options?: IsISSNOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isISSN(toString(value), options),
      { ...options },
      "isISSN"
    );

    return this.chain;
  }

  isISRC(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isISRC(toString(value)),
      {},
      "isISRC"
    );

    return this.chain;
  }

  isRFC3339(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isRFC3339(toString(value)),
      {},
      "isRFC3339"
    );

    return this.chain;
  }

  isJSON(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isJSON(toString(value)),
      {},
      "isJSON"
    );

    return this.chain;
  }

  isJWT(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isJWT(toString(value)),
      {},
      "isJWT"
    );

    return this.chain;
  }

  isLatLong(): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isLatLong(toString(value)),
      {},
      "isLatLong"
    );

    return this.chain;
  }

  isLength(options?: IsLengthOptions): Chain {
    this.addStandartValidator(
      async (value: any) => validator.isLength(toString(value), options),
      { ...options },
      "isLength"
    );

    return this.chain;
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
