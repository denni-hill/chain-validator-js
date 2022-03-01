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
exports.SanitizersImpl = void 0;
var sanitizer_context_item_1 = require("../context/sanitizer-context-item");
var utils_1 = require("../utils");
var validator_1 = __importDefault(require("validator"));
var SanitizersImpl = /** @class */ (function () {
    function SanitizersImpl(context, chain) {
        this.context = context;
        this.chain = chain;
    }
    SanitizersImpl.prototype.addItem = function (sanitizer) {
        this.context.addItem(sanitizer);
    };
    SanitizersImpl.prototype.addStandartSanitizer = function (func, args) {
        var _this = this;
        var asyncHandler = function (value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, func((0, utils_1.toString)(value))];
        }); }); };
        var sanitizer = new sanitizer_context_item_1.SanitizerContextItem(asyncHandler, args);
        this.addItem(sanitizer);
    };
    SanitizersImpl.prototype.customSanitizer = function (handlerReturner, options) {
        if (options === undefined)
            options = {};
        this.addItem(new sanitizer_context_item_1.SanitizerContextItem(handlerReturner(this.context), options.args));
        return this.chain;
    };
    SanitizersImpl.prototype.blacklist = function (chars) {
        this.addStandartSanitizer(function (value) { return validator_1.default.blacklist(value, chars); }, {
            chars: chars
        });
        return this.chain;
    };
    SanitizersImpl.prototype.escape = function () {
        this.addStandartSanitizer(validator_1.default.escape, {});
        return this.chain;
    };
    SanitizersImpl.prototype.unescape = function () {
        this.addStandartSanitizer(validator_1.default.unescape, {});
        return this.chain;
    };
    SanitizersImpl.prototype.ltrim = function (chars) {
        this.addStandartSanitizer(function (value) { return validator_1.default.ltrim(value, chars); }, {
            chars: chars
        });
        return this.chain;
    };
    SanitizersImpl.prototype.normalizeEmail = function (options) {
        this.addStandartSanitizer(function (value) { return validator_1.default.normalizeEmail(value, options); }, __assign({}, options));
        return this.chain;
    };
    SanitizersImpl.prototype.rtrim = function (chars) {
        this.addStandartSanitizer(function (value) { return validator_1.default.rtrim(value, chars); }, {
            chars: chars
        });
        return this.chain;
    };
    SanitizersImpl.prototype.stripLow = function (keepNewLines) {
        this.addStandartSanitizer(function (value) { return validator_1.default.stripLow(value, keepNewLines); }, { keepNewLines: keepNewLines });
        return this.chain;
    };
    SanitizersImpl.prototype.toBoolean = function (strict) {
        this.addStandartSanitizer(function (value) { return validator_1.default.toBoolean(value, strict); }, {
            strict: strict
        });
        return this.chain;
    };
    SanitizersImpl.prototype.toDate = function () {
        this.addStandartSanitizer(validator_1.default.toDate, {});
        return this.chain;
    };
    SanitizersImpl.prototype.toFloat = function () {
        this.addStandartSanitizer(validator_1.default.toFloat, {});
        return this.chain;
    };
    SanitizersImpl.prototype.toInt = function (radix) {
        this.addStandartSanitizer(function (value) { return validator_1.default.toInt(value, radix); }, {
            radix: radix
        });
        return this.chain;
    };
    SanitizersImpl.prototype.trim = function (chars) {
        this.addStandartSanitizer(function (value) { return validator_1.default.trim(value, chars); }, {
            chars: chars
        });
        return this.chain;
    };
    SanitizersImpl.prototype.whitelist = function (chars) {
        this.addStandartSanitizer(function (value) { return validator_1.default.whitelist(value, chars); }, {
            chars: chars
        });
        return this.chain;
    };
    SanitizersImpl.prototype.toString = function () {
        var _this = this;
        this.addItem(new sanitizer_context_item_1.SanitizerContextItem(function (value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, String(value)];
        }); }); }, {}));
        return this.chain;
    };
    return SanitizersImpl;
}());
exports.SanitizersImpl = SanitizersImpl;
