import { ValidationHandlerReturner } from "../handler/validation-handler";
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
  IsNumericOptions,
  IsStrongPasswordOptions,
  IsURLOptions,
  MobilePhoneLocale,
  PassportCountryCode,
  PostalCodeLocale,
  UUIDVersion
} from "../options";
import { ValidationChain } from "./validation-chain";

export interface Validations<Return> {
  withMessage(message: string): Return;

  not(): Validations<Return>;

  custom(
    handlerReturner: ValidationHandlerReturner,
    options?: { args?: Record<string, unknown>; message?: string }
  ): Return;

  isArray(elementValidationChain?: ValidationChain): Return;

  isArrayLength(options?: { min?: number; max?: number }): Return;

  isString(): Return;

  contains(seed: unknown): Return;

  equals(comparison: string): Return;

  isAfter(date?: string): Return;

  isAlpha(locale?: AlphaLocale): Return;

  isAlphanumeric(
    locale?: AlphanumericLocale,
    options?: IsAlphanumericOptions
  ): Return;

  isAscii(): Return;

  isBase32(): Return;

  isBase58(): Return;

  isBase64(options?: IsBase64Options): Return;

  isBefore(date?: string): Return;

  isIBAN(): Return;

  isBIC(): Return;

  isBoolean(): Return;

  isByteLength(options?: IsByteLengthOptions): Return;

  isCreditCard(): Return;

  isCurrency(options?: IsCurrencyOptions): Return;

  isEtheriumAddress(): Return;

  isBtcAddress(): Return;

  isDataURI(): Return;

  isDate(options?: IsDateOptions): Return;

  isDecimal(options?: IsDecimalOptions): Return;

  isDivisibleBy(number: number): Return;

  isEmail(options?: IsEmailOptions): Return;

  isEmpty(options?: IsEmptyOptions): Return;

  isFloat(options?: IsFloatOptions): Return;

  isFQDN(options?: IsFQDNOptions): Return;

  isFullWidth(): Return;

  isHalfWidth(): Return;

  isHash(algorithm: HashAlgorithm): Return;

  isHexadecimal(): Return;

  isHexColor(): Return;

  isHSL(): Return;

  isRgbColor(includePercentValues?: boolean): Return;

  isIn(values: unknown[]): Return;

  isInt(options?: IsIntOptions): Return;

  isIP(version?: IPVersion): Return;

  isIPRange(version?: IPVersion): Return;

  isEAN(): Return;

  isISIN(): Return;

  isISO31661Alpha2(): Return;

  isISO31661Alpha3(): Return;

  isISO8601(options?: IsISO8601Options): Return;

  isISSN(options?: IsISSNOptions): Return;

  isISRC(): Return;

  isRFC3339(): Return;

  isJSON(): Return;

  isJWT(): Return;

  isLatLong(): Return;

  isLength(options?: IsLengthOptions): Return;

  isLocale(): Return;

  isLowercase(): Return;

  isMACAddress(options?: IsMACAddressOptions): Return;

  isMagnetURI(): Return;

  isMD5(): Return;

  isMimeType(): Return;

  isMobilePhone(
    locale: "any" | MobilePhoneLocale | MobilePhoneLocale[]
  ): Return;

  isMongoId(): Return;

  isMultibyte(): Return;

  isNumeric(
    options?: IsNumericOptions & { min?: number; max?: number }
  ): Return;

  isOctal(): Return;

  isPassportNumber(countryCode?: PassportCountryCode): Return;

  isPort(): Return;

  isPostalCode(locale: "any" | PostalCodeLocale): Return;

  isSemVer(): Return;

  isStrongPassword(options?: IsStrongPasswordOptions): Return;

  isSurrogatePair(): Return;

  isURL(options?: IsURLOptions): Return;

  isUppercase(): Return;

  isUUID(version?: UUIDVersion): Return;

  isVariableWidth(): Return;

  isWhitelisted(chars: string | string[]): Return;

  matches(pattern: RegExp): Return;

  matches(pattern: string, modifiers?: string): Return;

  isSlug(): Return;
}
