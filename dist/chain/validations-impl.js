"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationsImpl = void 0;
var validator_1 = __importDefault(require("validator"));
var validator_context_item_1 = require("../context/validator-context-item");
var utils_1 = require("../utils");
var array_context_item_1 = require("../context/array-context-item");
var ValidationsImpl = /** @class */ (function () {
    function ValidationsImpl(context, chain) {
        this.context = context;
        this.chain = chain;
        this.negateNext = false;
    }
    ValidationsImpl.prototype.addItem = function (validator) {
        validator.negate = this.negateNext;
        this.context.addItem(validator);
        this.negateNext = false;
    };
    ValidationsImpl.prototype.addStandartValidator = function (func, args, message) {
        var _this = this;
        var asyncHandler = function (value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, func((0, utils_1.toString)(value))];
        }); }); };
        var validator = new validator_context_item_1.ValidatorContextItem(asyncHandler, args, message);
        this.addItem(validator);
    };
    ValidationsImpl.prototype.withMessage = function (message) {
        if (this.context.queue.length === 0)
            throw new Error("Validation chain cannot start from withMessage");
        var lastContextItem = this.context.queue[this.context.queue.length - 1];
        if (!(lastContextItem instanceof validator_context_item_1.ValidatorContextItem))
            throw new Error("Only validators can be modified with withMessage method");
        lastContextItem.message = message;
        return this.chain;
    };
    ValidationsImpl.prototype.not = function () {
        this.negateNext = true;
        return this;
    };
    ValidationsImpl.prototype.custom = function (handler, options) {
        if (options === undefined)
            options = {};
        this.addItem(new validator_context_item_1.ValidatorContextItem(handler(this.context), options.args, options.message));
        return this.chain;
    };
    ValidationsImpl.prototype.isArray = function (elementValidationChain) {
        var _this = this;
        this.addItem(new validator_context_item_1.ValidatorContextItem(function (value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, Array.isArray(value)];
        }); }); }, {}, "isArray"));
        if (elementValidationChain !== undefined)
            this.context.addItem(new array_context_item_1.ArrayContextItem(elementValidationChain));
        return this.chain;
    };
    ValidationsImpl.prototype.isArrayLength = function (options) {
        var _this = this;
        this.isArray();
        if (options === undefined)
            options = { min: 1, max: Infinity };
        if (options.min === undefined)
            options.min = 1;
        if (options.max === undefined)
            options.max = Infinity;
        this.addItem(new validator_context_item_1.ValidatorContextItem(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (options.min === undefined || value.length >= options.min) &&
                        (options.max === undefined || value.length <= options.max)];
            });
        }); }, __assign({}, options), "isArrayLength"));
        return this.chain;
    };
    ValidationsImpl.prototype.contains = function (seed) {
        this.addStandartValidator(function (value) { return validator_1.default.contains(value, seed); }, { seed: seed }, "contains");
        return this.chain;
    };
    ValidationsImpl.prototype.equals = function (comparison) {
        this.addStandartValidator(function (value) { return validator_1.default.equals(value, comparison); }, { comparison: comparison }, "equals");
        return this.chain;
    };
    ValidationsImpl.prototype.isAfter = function (date) {
        this.addStandartValidator(function (value) { return validator_1.default.isAfter(value, date); }, { date: date }, "isAfter");
        return this.chain;
    };
    ValidationsImpl.prototype.isAlpha = function (locale) {
        this.addStandartValidator(function (value) { return validator_1.default.isAlpha(value, locale); }, { locale: locale }, "isAlpha");
        return this.chain;
    };
    ValidationsImpl.prototype.isAlphanumeric = function (locale, options) {
        this.addStandartValidator(function (value) { return validator_1.default.isAlphanumeric(value, locale, options); }, __assign({ locale: locale }, options), "isAlphanumeric");
        return this.chain;
    };
    ValidationsImpl.prototype.isAscii = function () {
        this.addStandartValidator(validator_1.default.isAscii, {}, "isAscii");
        return this.chain;
    };
    ValidationsImpl.prototype.isBase32 = function () {
        this.addStandartValidator(validator_1.default.isBase32, {}, "isBase32");
        return this.chain;
    };
    ValidationsImpl.prototype.isBase58 = function () {
        this.addStandartValidator(validator_1.default.isBase58, {}, "isBase58");
        return this.chain;
    };
    ValidationsImpl.prototype.isBase64 = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isBase64(value, options); }, __assign({}, options), "isBase64");
        return this.chain;
    };
    ValidationsImpl.prototype.isBefore = function (date) {
        this.addStandartValidator(function (value) { return validator_1.default.isBefore(value, date); }, { date: date }, "isBefore");
        return this.chain;
    };
    ValidationsImpl.prototype.isIBAN = function () {
        this.addStandartValidator(validator_1.default.isIBAN, {}, "isIBAN");
        return this.chain;
    };
    ValidationsImpl.prototype.isBIC = function () {
        this.addStandartValidator(validator_1.default.isBIC, {}, "isBIC");
        return this.chain;
    };
    ValidationsImpl.prototype.isBoolean = function () {
        this.addStandartValidator(validator_1.default.isBoolean, {}, "isBoolean");
        return this.chain;
    };
    ValidationsImpl.prototype.isByteLength = function (options) {
        if (options === undefined)
            options = {};
        if (options.min === undefined)
            options.min = 1;
        if (options.max === undefined)
            options.max = Infinity;
        this.addStandartValidator(function (value) { return validator_1.default.isByteLength(value, options); }, __assign({}, options), "isByteLength");
        return this.chain;
    };
    ValidationsImpl.prototype.isCreditCard = function () {
        this.addStandartValidator(validator_1.default.isCreditCard, {}, "isCreditCard");
        return this.chain;
    };
    ValidationsImpl.prototype.isCurrency = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isCurrency(value, options); }, __assign({}, options), "isCurrency");
        return this.chain;
    };
    ValidationsImpl.prototype.isEtheriumAddress = function () {
        this.addStandartValidator(validator_1.default.isEthereumAddress, {}, "isEthereumAddress");
        return this.chain;
    };
    ValidationsImpl.prototype.isBtcAddress = function () {
        this.addStandartValidator(validator_1.default.isBtcAddress, {}, "isBtcAddress");
        return this.chain;
    };
    ValidationsImpl.prototype.isDataURI = function () {
        this.addStandartValidator(validator_1.default.isDataURI, {}, "isDataURI");
        return this.chain;
    };
    ValidationsImpl.prototype.isDate = function (options) {
        this.addStandartValidator(function (value) {
            return validator_1.default.isDate(value, options) || new Date(value).valueOf() !== NaN;
        }, __assign({}, options), "isDate");
        return this.chain;
    };
    ValidationsImpl.prototype.isDecimal = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isDecimal(value, options); }, __assign({}, options), "isDecimal");
        return this.chain;
    };
    ValidationsImpl.prototype.isDivisibleBy = function (number) {
        this.addStandartValidator(function (value) { return validator_1.default.isDivisibleBy(value, number); }, { number: number }, "isDivisibleBy");
        return this.chain;
    };
    ValidationsImpl.prototype.isEmail = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isEmail(value, options); }, __assign({}, options), "isEmail");
        return this.chain;
    };
    ValidationsImpl.prototype.isEmpty = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isEmpty(value); }, __assign({}, options), "isEmpty");
        return this.chain;
    };
    ValidationsImpl.prototype.isFloat = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isFloat(value, options); }, __assign({}, options), "isFloat");
        return this.chain;
    };
    ValidationsImpl.prototype.isFQDN = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isFQDN(value, options); }, __assign({}, options), "isFQDN");
        return this.chain;
    };
    ValidationsImpl.prototype.isFullWidth = function () {
        this.addStandartValidator(validator_1.default.isFullWidth, {}, "isFullWidth");
        return this.chain;
    };
    ValidationsImpl.prototype.isHalfWidth = function () {
        this.addStandartValidator(validator_1.default.isHalfWidth, {}, "isHalfWidth");
        return this.chain;
    };
    ValidationsImpl.prototype.isHash = function (algorithm) {
        this.addStandartValidator(function (value) { return validator_1.default.isHash(value, algorithm); }, { algorithm: algorithm }, "isHash");
        return this.chain;
    };
    ValidationsImpl.prototype.isHexadecimal = function () {
        this.addStandartValidator(validator_1.default.isHexadecimal, {}, "isHexadecimal");
        return this.chain;
    };
    ValidationsImpl.prototype.isHexColor = function () {
        this.addStandartValidator(validator_1.default.isHexColor, {}, "isHexColor");
        return this.chain;
    };
    ValidationsImpl.prototype.isHSL = function () {
        this.addStandartValidator(validator_1.default.isHSL, {}, "isHSL");
        return this.chain;
    };
    ValidationsImpl.prototype.isRgbColor = function (includePercentValues) {
        this.addStandartValidator(function (value) { return validator_1.default.isRgbColor(value, includePercentValues); }, { includePercentValues: includePercentValues }, "isRgbColor");
        return this.chain;
    };
    ValidationsImpl.prototype.isIn = function (values) {
        this.addStandartValidator(function (value) { return validator_1.default.isIn(value, values); }, { values: values }, "isIn");
        return this.chain;
    };
    ValidationsImpl.prototype.isInt = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isInt(value, options); }, __assign({}, options), "isInt");
        return this.chain;
    };
    ValidationsImpl.prototype.isIP = function (version) {
        if (version === void 0) { version = "4"; }
        this.addStandartValidator(function (value) { return validator_1.default.isIP(value, version); }, { version: version }, "isIP");
        return this.chain;
    };
    ValidationsImpl.prototype.isIPRange = function (version) {
        if (version === void 0) { version = "4"; }
        this.addStandartValidator(function (value) { return validator_1.default.isIPRange(value, version); }, { version: version }, "isIPRange");
        return this.chain;
    };
    ValidationsImpl.prototype.isEAN = function () {
        this.addStandartValidator(validator_1.default.isEAN, {}, "isEAN");
        return this.chain;
    };
    ValidationsImpl.prototype.isISIN = function () {
        this.addStandartValidator(validator_1.default.isISIN, {}, "isISIN");
        return this.chain;
    };
    ValidationsImpl.prototype.isISO31661Alpha2 = function () {
        this.addStandartValidator(validator_1.default.isISO31661Alpha2, {}, "isISO31661Alpha2");
        return this.chain;
    };
    ValidationsImpl.prototype.isISO31661Alpha3 = function () {
        this.addStandartValidator(validator_1.default.isISO31661Alpha3, {}, "isISO31661Alpha3");
        return this.chain;
    };
    ValidationsImpl.prototype.isISO8601 = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isISO8601(value, options); }, __assign({}, options), "isISO8601");
        return this.chain;
    };
    ValidationsImpl.prototype.isISSN = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isISSN(value, options); }, __assign({}, options), "isISIN");
        return this.chain;
    };
    ValidationsImpl.prototype.isISRC = function () {
        this.addStandartValidator(validator_1.default.isISRC, {}, "isISRC");
        return this.chain;
    };
    ValidationsImpl.prototype.isRFC3339 = function () {
        this.addStandartValidator(validator_1.default.isRFC3339, {}, "isRFC3339");
        return this.chain;
    };
    ValidationsImpl.prototype.isJSON = function () {
        this.addStandartValidator(validator_1.default.isJSON, {}, "isJSON");
        return this.chain;
    };
    ValidationsImpl.prototype.isJWT = function () {
        this.addStandartValidator(validator_1.default.isJWT, {}, "isJWT");
        return this.chain;
    };
    ValidationsImpl.prototype.isLatLong = function () {
        this.addStandartValidator(validator_1.default.isLatLong, {}, "isLatLong");
        return this.chain;
    };
    ValidationsImpl.prototype.isLength = function (options) {
        if (options === undefined)
            options = { min: 1, max: Infinity };
        if (options.min === undefined)
            options.min = 1;
        if (options.max === undefined)
            options.max = Infinity;
        this.addStandartValidator(function (value) { return validator_1.default.isLength(value, options); }, __assign({}, options), "isLength");
        return this.chain;
    };
    ValidationsImpl.prototype.isLocale = function () {
        this.addStandartValidator(validator_1.default.isLocale, {}, "isLocale");
        return this.chain;
    };
    ValidationsImpl.prototype.isLowercase = function () {
        this.addStandartValidator(validator_1.default.isLowercase, {}, "isLowercase");
        return this.chain;
    };
    ValidationsImpl.prototype.isMACAddress = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isMACAddress(value, options); }, __assign({}, options), "isMACAddress");
        return this.chain;
    };
    ValidationsImpl.prototype.isMagnetURI = function () {
        this.addStandartValidator(validator_1.default.isMagnetURI, {}, "isMagnetURI");
        return this.chain;
    };
    ValidationsImpl.prototype.isMD5 = function () {
        this.addStandartValidator(validator_1.default.isMD5, {}, "isMD5");
        return this.chain;
    };
    ValidationsImpl.prototype.isMimeType = function () {
        this.addStandartValidator(validator_1.default.isMimeType, {}, "isMimeType");
        return this.chain;
    };
    ValidationsImpl.prototype.isMobilePhone = function (locale, options) {
        if (locale === void 0) { locale = "ru-RU"; }
        this.addStandartValidator(function (value) { return validator_1.default.isMobilePhone(value, locale, options); }, __assign({ locale: locale }, options), "isMobilePhone");
        return this.chain;
    };
    ValidationsImpl.prototype.isMongoId = function () {
        this.addStandartValidator(validator_1.default.isMongoId, {}, "isMongoId");
        return this.chain;
    };
    ValidationsImpl.prototype.isMultibyte = function () {
        this.addStandartValidator(validator_1.default.isMultibyte, {}, "isMultibyte");
        return this.chain;
    };
    ValidationsImpl.prototype.isNumeric = function (options) {
        if (options === void 0) { options = {}; }
        this.addStandartValidator(function (value) {
            return validator_1.default.isNumeric(value, options) &&
                (isNaN(options.min) || Number(value) >= options.min) &&
                (isNaN(options.max) || Number(value) <= options.max);
        }, __assign({}, options), "isNumeric");
        return this.chain;
    };
    ValidationsImpl.prototype.isOctal = function () {
        this.addStandartValidator(validator_1.default.isOctal, {}, "isOctal");
        return this.chain;
    };
    ValidationsImpl.prototype.isPassportNumber = function (countryCode) {
        this.addStandartValidator(function (value) { return validator_1.default.isPassportNumber(value, countryCode); }, { countryCode: countryCode }, "isPassportNumber");
        return this.chain;
    };
    ValidationsImpl.prototype.isPort = function () {
        this.addStandartValidator(validator_1.default.isPort, {}, "isPort");
        return this.chain;
    };
    ValidationsImpl.prototype.isPostalCode = function (locale) {
        this.addStandartValidator(function (value) { return validator_1.default.isPostalCode(value, locale); }, { locale: locale }, "isPostalCode");
        return this.chain;
    };
    ValidationsImpl.prototype.isSemVer = function () {
        this.addStandartValidator(validator_1.default.isSemVer, {}, "isSemVer");
        return this.chain;
    };
    ValidationsImpl.prototype.isStrongPassword = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isStrongPassword(value, options); }, __assign({}, options), "isStrongPassword");
        return this.chain;
    };
    ValidationsImpl.prototype.isSurrogatePair = function () {
        this.addStandartValidator(validator_1.default.isSurrogatePair, {}, "isSurrogatePair");
        return this.chain;
    };
    ValidationsImpl.prototype.isURL = function (options) {
        this.addStandartValidator(function (value) { return validator_1.default.isURL(value, options); }, __assign({}, options), "isURL");
        return this.chain;
    };
    ValidationsImpl.prototype.isUppercase = function () {
        this.addStandartValidator(validator_1.default.isUppercase, {}, "isUppercase");
        return this.chain;
    };
    ValidationsImpl.prototype.isUUID = function (version) {
        this.addStandartValidator(function (value) { return validator_1.default.isUUID(value, version); }, { version: version }, "isUUID");
        return this.chain;
    };
    ValidationsImpl.prototype.isVariableWidth = function () {
        this.addStandartValidator(validator_1.default.isVariableWidth, {}, "isVariableWidth");
        return this.chain;
    };
    ValidationsImpl.prototype.isWhitelisted = function (chars) {
        this.addStandartValidator(function (value) { return validator_1.default.isWhitelisted(value, chars); }, { chars: chars }, "isWhitelisted");
        return this.chain;
    };
    ValidationsImpl.prototype.matches = function (pattern, modifiers) {
        if (modifiers !== undefined && typeof modifiers !== "string")
            throw new Error("given modifiers is not type of string");
        var func;
        if (pattern instanceof RegExp) {
            func = function (value) { return validator_1.default.matches(value, pattern); };
        }
        else if (typeof pattern === "string") {
            func = function (value) { return validator_1.default.matches(value, pattern, modifiers); };
        }
        else
            throw new Error("given pattern is not correct string or RegExp");
        this.addStandartValidator(func, { pattern: pattern, modifiers: modifiers }, "matches");
        return this.chain;
    };
    ValidationsImpl.prototype.isSlug = function () {
        this.addStandartValidator(validator_1.default.isSlug, {}, "isSlug");
        return this.chain;
    };
    ValidationsImpl.prototype.isString = function () {
        var _this = this;
        this.addItem(new validator_context_item_1.ValidatorContextItem(function (value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, typeof value === "string"];
        }); }); }, {}, "isString"));
        return this.chain;
    };
    return ValidationsImpl;
}());
exports.ValidationsImpl = ValidationsImpl;
