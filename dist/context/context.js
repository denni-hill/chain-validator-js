"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var contexters_impl_1 = require("../chain/contexters-impl");
var sanitizers_impl_1 = require("../chain/sanitizers-impl");
var validations_impl_1 = require("../chain/validations-impl");
var result_1 = require("../result");
var utils_1 = require("../utils");
var Context = /** @class */ (function () {
    function Context() {
        this._queue = [];
        this.bailed = false;
        var methodsKeeper = {};
        this.chain = Object.assign(methodsKeeper, { context: this }, (0, utils_1.bindAll)(new sanitizers_impl_1.SanitizersImpl(this, methodsKeeper)), (0, utils_1.bindAll)(new validations_impl_1.ValidationsImpl(this, methodsKeeper)), (0, utils_1.bindAll)(new contexters_impl_1.ContextersImpl(this, methodsKeeper)));
    }
    Object.defineProperty(Context.prototype, "queue", {
        get: function () {
            return __spreadArray([], this._queue, true);
        },
        enumerable: false,
        configurable: true
    });
    Context.prototype.addItem = function (item) {
        this._queue.push(item);
    };
    Context.prototype.run = function (objectToValidate, path, stopOnFail) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, _a, item, subValidationResult;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.objectToValidate = objectToValidate;
                        this.path = path;
                        this.value = (0, utils_1.getValueByPath)(objectToValidate, path);
                        result = new result_1.ValidationResult();
                        if (this.value === undefined) {
                            if (this.optional !== undefined)
                                result.validated = undefined;
                            else {
                                result.errors.push({
                                    value: this.value,
                                    message: "required",
                                    path: this.path,
                                    args: { fieldName: this.name }
                                });
                            }
                            return [2 /*return*/, result];
                        }
                        else if (this.value === null) {
                            if (this.optional !== undefined && this.optional.nullable)
                                result.validated = null;
                            else {
                                result.errors.push({
                                    value: this.value,
                                    message: "not nullable",
                                    path: this.path,
                                    args: { fieldName: this.name }
                                });
                            }
                            return [2 /*return*/, result];
                        }
                        _i = 0, _a = this._queue;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        item = _a[_i];
                        return [4 /*yield*/, item.run(this)];
                    case 2:
                        subValidationResult = _c.sent();
                        if (subValidationResult.passed)
                            this.value = subValidationResult.validated;
                        else
                            (_b = result.errors).push.apply(_b, subValidationResult.errors);
                        if (result.failed && (this.bailed || stopOnFail))
                            return [2 /*return*/, result];
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (result.passed)
                            result.validated = this.value;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Context;
}());
exports.Context = Context;
