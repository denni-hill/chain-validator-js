export type URLProtocol = "http" | "https" | "ftp" | string;
export type UUIDVersion = 3 | 4 | 5 | "3" | "4" | "5" | "all";
export type IPVersion = "4" | "6" | 4 | 6;

export type AlphaLocale =
  | "en-US"
  | "bg-BG"
  | "cs-CZ"
  | "da-DK"
  | "de-DE"
  | "el-GR"
  | "es-AR"
  | "es-ES"
  | "fr-FR"
  | "it-IT"
  | "nb-NO"
  | "nl-NL"
  | "nn-NO"
  | "hu-HU"
  | "pl-PL"
  | "pt-PT"
  | "ru-RU"
  | "sl-SI"
  | "sk-SK"
  | "sr-RS@latin"
  | "sr-RS"
  | "sv-SE"
  | "tr-TR"
  | "uk-UA"
  | "ku-IQ"
  | "ar"
  | "he"
  | "fa-IR"
  | "en-AU"
  | "en-GB"
  | "en-HK"
  | "en-IN"
  | "en-NZ"
  | "en-ZA"
  | "en-ZM"
  | "ar-AE"
  | "ar-BH"
  | "ar-DZ"
  | "ar-EG"
  | "ar-IQ"
  | "ar-JO"
  | "ar-KW"
  | "ar-LB"
  | "ar-LY"
  | "ar-MA"
  | "ar-QM"
  | "ar-QA"
  | "ar-SA"
  | "ar-SD"
  | "ar-SY"
  | "ar-TN"
  | "ar-YE"
  | "pt-BR"
  | "pl-Pl";

export type AlphanumericLocale =
  | "en-US"
  | "bg-BG"
  | "cs-CZ"
  | "da-DK"
  | "de-DE"
  | "el-GR"
  | "es-AR"
  | "es-ES"
  | "fr-FR"
  | "it-IT"
  | "hu-HU"
  | "nb-NO"
  | "nl-NL"
  | "nn-NO"
  | "pl-PL"
  | "pt-PT"
  | "ru-RU"
  | "sl-SI"
  | "sk-SK"
  | "sr-RS@latin"
  | "sr-RS"
  | "sv-SE"
  | "tr-TR"
  | "uk-UA"
  | "ku-IQ"
  | "ar"
  | "he"
  | "fa-IR"
  | "en-AU"
  | "en-GB"
  | "en-HK"
  | "en-IN"
  | "en-NZ"
  | "en-ZA"
  | "en-ZM"
  | "ar-AE"
  | "ar-BH"
  | "ar-DZ"
  | "ar-EG"
  | "ar-IQ"
  | "ar-JO"
  | "ar-KW"
  | "ar-LB"
  | "ar-LY"
  | "ar-MA"
  | "ar-QM"
  | "ar-QA"
  | "ar-SA"
  | "ar-SD"
  | "ar-SY"
  | "ar-TN"
  | "ar-YE"
  | "pt-BR"
  | "pl-Pl";

export type MobilePhoneLocale =
  | "ar-AE"
  | "ar-BH"
  | "ar-DZ"
  | "ar-EG"
  | "ar-IQ"
  | "ar-JO"
  | "ar-KW"
  | "ar-SA"
  | "ar-SY"
  | "ar-TN"
  | "be-BY"
  | "bg-BG"
  | "bn-BD"
  | "cs-CZ"
  | "da-DK"
  | "de-DE"
  | "de-AT"
  | "el-GR"
  | "en-AU"
  | "en-GB"
  | "en-GG"
  | "en-GH"
  | "en-HK"
  | "en-IE"
  | "en-IN"
  | "en-KE"
  | "en-MT"
  | "en-MU"
  | "en-NG"
  | "en-NZ"
  | "en-PK"
  | "en-RW"
  | "en-SG"
  | "en-TZ"
  | "en-UG"
  | "en-US"
  | "en-ZA"
  | "en-ZM"
  | "es-CL"
  | "es-ES"
  | "es-MX"
  | "es-PA"
  | "es-PY"
  | "es-UY"
  | "et-EE"
  | "fa-IR"
  | "fi-FI"
  | "fj-FJ"
  | "fo-FO"
  | "fr-FR"
  | "fr-GF"
  | "fr-GP"
  | "fr-MQ"
  | "fr-RE"
  | "he-IL"
  | "hu-HU"
  | "id-ID"
  | "it-IT"
  | "ja-JP"
  | "kk-KZ"
  | "kl-GL"
  | "ko-KR"
  | "lt-LT"
  | "ms-MY"
  | "nb-NO"
  | "nl-BE"
  | "nl-NL"
  | "nn-NO"
  | "pl-PL"
  | "pt-BR"
  | "pt-PT"
  | "ro-RO"
  | "ru-RU"
  | "sl-SI"
  | "sk-SK"
  | "sr-RS"
  | "sv-SE"
  | "th-TH"
  | "tr-TR"
  | "uk-UA"
  | "vi-VN"
  | "zh-CN"
  | "zh-TW"
  | "en-CA"
  | "fr-BE"
  | "zh-HK";

export type PostalCodeLocale =
  | "AD"
  | "AT"
  | "AU"
  | "BE"
  | "BG"
  | "BR"
  | "CA"
  | "CH"
  | "CZ"
  | "DE"
  | "DK"
  | "DZ"
  | "EE"
  | "ES"
  | "FI"
  | "FR"
  | "GB"
  | "GR"
  | "HR"
  | "HU"
  | "ID"
  | "IE"
  | "IL"
  | "IN"
  | "IS"
  | "IT"
  | "JP"
  | "KE"
  | "LI"
  | "LT"
  | "LU"
  | "LV"
  | "MX"
  | "MT"
  | "NL"
  | "NO"
  | "NZ"
  | "PL"
  | "PR"
  | "PT"
  | "RO"
  | "RU"
  | "SA"
  | "SE"
  | "SI"
  | "SK"
  | "TN"
  | "TW"
  | "UA"
  | "US"
  | "ZA"
  | "ZM";

export type HashAlgorithm =
  | "md4"
  | "md5"
  | "sha1"
  | "sha256"
  | "sha384"
  | "sha512"
  | "ripemd128"
  | "ripemd160"
  | "tiger128"
  | "tiger160"
  | "tiger192"
  | "crc32"
  | "crc32b";

export type IdentityCard =
  | "any"
  | "ar-TN"
  | "ES"
  | "he-IL"
  | "IN"
  | "IT"
  | "NO"
  | "zh-CN"
  | "zh-TW";

export type PassportCountryCode =
  | "AM"
  | "AR"
  | "AT"
  | "AU"
  | "BE"
  | "BG"
  | "BY"
  | "CA"
  | "CH"
  | "CN"
  | "CY"
  | "CZ"
  | "DE"
  | "DK"
  | "DZ"
  | "EE"
  | "ES"
  | "FI"
  | "FR"
  | "GB"
  | "GR"
  | "HR"
  | "HU"
  | "IE"
  | "IN"
  | "IS"
  | "IT"
  | "JP"
  | "KR"
  | "LT"
  | "LU"
  | "LV"
  | "MT"
  | "NL"
  | "PO"
  | "PT"
  | "RO"
  | "RU"
  | "SE"
  | "SL"
  | "SK"
  | "TR"
  | "UA"
  | "US";

export type TaxIDLocale = "en-US";

export type VATCountryCode = "GB";

export interface MinMaxOptions {
  min?: number;
  max?: number;
}

export interface MinMaxExtendedOptions extends MinMaxOptions {
  lt?: number;
  gt?: number;
}

/**
 * defaults to
 * {
 *  ignoreCase: false
 * }
 */
export interface ContainsOptions {
  ignoreCase?: boolean;
}

export interface IsAlphaOptions {
  ignore?: string | string[] | RegExp;
}

export interface IsAlphanumericOptions {
  ignore?: string | RegExp;
}

/**
 * defaults to
 * {
 *  urlSafe: false
 * }
 */
export interface IsBase64Options {
  urlSafe?: boolean;
}

/**
 * defaults to
 * {
 *  strict: false
 * }
 */
export interface IsBooleanOptions {
  strict?: boolean;
}

export interface IsByteLengthOptions {
  /**
   * @default 0
   */
  min?: number | undefined;
  /**
   * @default undefined
   */
  max?: number | undefined;
}

/**
 * defaults to
 * {
 *   symbol: '$',
 *   require_symbol: false,
 *   allow_space_after_symbol: false,
 *   symbol_after_digits: false,
 *   allow_negatives: true,
 *   parens_for_negatives: false,
 *   negative_sign_before_digits: false,
 *   negative_sign_after_digits: false,
 *   allow_negative_sign_placeholder: false,
 *   thousands_separator: ',',
 *   decimal_separator: '.',
 *   allow_space_after_digits: false
 * }
 */
export interface IsCurrencyOptions {
  symbol?: string;
  require_symbol?: boolean;
  allow_space_after_symbol?: boolean;
  symbol_after_digits?: boolean;
  allow_negatives?: boolean;
  parens_for_negatives?: boolean;
  negative_sign_before_digits?: boolean;
  negative_sign_after_digits?: boolean;
  allow_negative_sign_placeholder?: boolean;
  thousands_separator?: string;
  decimal_separator?: string;
  allow_decimal?: boolean;
  require_decimal?: boolean;
  digits_after_decimal?: number[];
  allow_space_after_digits?: boolean;
}

/**
 * defaults to
 * {
 *    format: 'YYYY/MM/DD',
 *    delimiters: ['/', '-'],
 *    strictMode: false
 * }
 */
export interface IsDateOptions {
  format?: string;
  delimiters?: string[];
  strictMode?: boolean;
}

export type FloatLocale =
  | "en-US"
  | "ar"
  | "en-AU"
  | "en-GB"
  | "en-HK"
  | "en-IN"
  | "en-NZ"
  | "en-ZA"
  | "en-ZM"
  | "ar-AE"
  | "ar-BH"
  | "ar-DZ"
  | "ar-EG"
  | "ar-IQ"
  | "ar-JO"
  | "ar-KW"
  | "ar-LB"
  | "ar-LY"
  | "ar-MA"
  | "ar-QM"
  | "ar-QA"
  | "ar-SA"
  | "ar-SD"
  | "ar-SY"
  | "ar-TN"
  | "ar-YE"
  | "bg-BG"
  | "cs-CZ"
  | "da-DK"
  | "de-DE"
  | "el-GR"
  | "es-ES"
  | "fr-FR"
  | "it-IT"
  | "ku-IQ"
  | "hu-HU"
  | "nb-NO"
  | "nn-NO"
  | "nl-NL"
  | "pl-PL"
  | "pt-PT"
  | "ru-RU"
  | "sl-SI"
  | "sr-RS@latin"
  | "sr-RS"
  | "sv-SE"
  | "tr-TR"
  | "uk-UA"
  | "pt-BR"
  | "pl-Pl";

export type DecimalLocale = FloatLocale;

export interface IsDecimalOptions {
  /**
   * @default false
   */
  force_decimal?: boolean | undefined;
  /**
   * `decimal_digits` is given as a range like `'1,3'`,
   * a specific value like `'3'` or min like `'1,'`
   *
   * @default '1,'
   */
  decimal_digits?: string | undefined;
  /**
   * DecimalLocale
   *
   * @default 'en-US'
   */
  locale?: DecimalLocale | undefined;
}

export interface IsEmailOptions {
  allow_display_name?: boolean;
  allow_utf8_local_part?: boolean;
  require_tld?: boolean;
  ignore_max_length?: boolean;
  allow_ip_domain?: boolean;
  domain_specific_validation?: boolean;
  blacklisted_chars?: string;
}

/**
 * defaults to
 * {
 *    ignore_whitespace: false
 * }
 */
export interface IsEmptyOptions {
  ignore_whitespace: boolean;
}

export interface IsFloatOptions {
  /**
   * less or equal
   */
  min?: number | undefined;
  /**
   * greater or equal
   */
  max?: number | undefined;
  /**
   * greater than
   */
  gt?: number | undefined;
  /**
   * less than
   */
  lt?: number | undefined;
  /**
   * FloatLocale
   */
  locale?: FloatLocale | undefined;
}

/**
 * defaults to
 * {
 *    require_tld: true,
 *    allow_underscores: false,
 *    allow_trailing_dot: false,
 *    allow_numeric_tld: false
 * }
 */
export interface IsFQDNOptions {
  require_tld?: boolean;
  allow_underscores?: boolean;
  allow_trailing_dot?: boolean;
  allow_numeric_tld?: false;
}

export interface IsIntOptions extends MinMaxExtendedOptions {
  allow_leading_zeroes?: boolean;
}

/**
 * defaults to
 * {
 *  allow_primitives: false
 * }
 */
export interface IsJSONOptions {
  allow_primitives?: boolean;
}

/**
 * defaults to
 * {
 *  checkDMS: false
 * }
 */
export interface IsLatLongOptions {
  checkDMS?: boolean;
}

export interface IsLengthOptions {
  /**
   * @default 0
   */
  min?: number | undefined;
  /**
   * @default undefined
   */
  max?: number | undefined;
}

/**
 * defaults to
 * {
 *  allow_hyphens: false
 * }
 */
export interface IsIMEIOptions {
  allow_hyphens?: boolean;
}

/**
 * defaults to
 * {
 *    strict: false,
 *    strictSeparator: false
 * }
 */
export interface IsISO8601Options {
  strict?: boolean;
  strictSeparator?: boolean;
}

/**
 * defaults to
 * {
 *    case_sensitive: false,
 *    require_hyphen: false
 * }
 */
export interface IsISSNOptions {
  case_sensitive?: boolean;
  require_hyphen?: boolean;
}

/**
 * defaults to
 * {
 *    no_colons: false
 * }
 */
export interface IsMACAddressOptions {
  no_colons?: boolean;
}

export interface IsMobilePhoneOptions {
  strictMode?: boolean;
}

/**
 * defaults to
 * {
 *    no_symbols: false
 * }
 */
export interface IsNumericOptions {
  no_symbols?: boolean;
  locale?: AlphanumericLocale;
}

/**
 * defaults to
 * {
 *    minLength: 8,
 *    minLowercase: 1,
 *    minUppercase: 1,
 *    minNumbers: 1,
 *    minSymbols: 1,
 *    returnScore: false,
 *    pointsPerUnique: 1,
 *    pointsPerRepeat: 0.5,
 *    pointsForContainingLower: 10,
 *    pointsForContainingUpper: 10,
 *    pointsForContainingNumber: 10,
 *    pointsForContainingSymbol: 10
 * }
 */
export interface IsStrongPasswordOptions {
  minLength?: number;
  minLowercase?: number;
  minUppercase?: number;
  minNumbers?: number;
  minSymbols?: number;
  returnScore?: boolean;
  pointsPerUnique?: number;
  pointsPerRepeat?: number;
  pointsForContainingLower?: number;
  pointsForContainingUpper?: number;
  pointsForContainingNumber?: number;
  pointsForContainingSymbol?: number;
}

/**
 * defaults to
 * {
 *    protocols: ['http','https','ftp'],
 *    require_tld: true,
 *    require_protocol: false,
 *    require_host: true,
 *    require_port: false;
 *    require_valid_protocol: true,
 *    allow_underscores: false,
 *    host_whitelist: false,
 *    host_blacklist: false,
 *    allow_trailing_dot: false,
 *    allow_protocol_relative_urls: false,
 *    validate_length: true
 * }
 */
export interface IsURLOptions {
  protocols?: URLProtocol[];
  require_tld?: boolean;
  require_protocol?: boolean;
  require_host?: boolean;
  require_port?: boolean;
  require_valid_protocol?: boolean;
  allow_underscores?: boolean;
  host_whitelist?: (string | RegExp)[];
  host_blacklist?: (string | RegExp)[];
  allow_trailing_dot?: boolean;
  allow_protocol_relative_urls?: boolean;
  disallow_auth?: boolean;
  validate_length?: boolean;
}

export interface NormalizeEmailOptions {
  all_lowercase?: boolean;
  gmail_lowercase?: boolean;
  gmail_remove_dots?: boolean;
  gmail_remove_subaddress?: boolean;
  gmail_convert_googlemaildotcom?: boolean;
  outlookdotcom_lowercase?: boolean;
  outlookdotcom_remove_subaddress?: boolean;
  yahoo_lowercase?: boolean;
  yahoo_remove_subaddress?: boolean;
  icloud_lowercase?: boolean;
  icloud_remove_subaddress?: boolean;
}
