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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextersImpl = void 0;
var condition_context_item_1 = require("../context/condition-context-item");
var contexter_context_item_1 = require("../context/contexter-context-item");
var one_of_context_item_1 = require("../context/one-of-context-item");
var schema_context_item_1 = require("../context/schema-context-item");
var ContextersImpl = /** @class */ (function () {
    function ContextersImpl(context, chain) {
        this.context = context;
        this.chain = chain;
    }
    ContextersImpl.prototype.addItem = function (contexter) {
        this.context.addItem(contexter);
    };
    ContextersImpl.prototype.schema = function (schema) {
        this.context.addItem(new schema_context_item_1.SchemaContextItem(schema));
        return this.chain;
    };
    ContextersImpl.prototype.name = function (fieldName) {
        this.context.name = fieldName;
        return this.chain;
    };
    ContextersImpl.prototype.bail = function () {
        var _this = this;
        this.addItem(new contexter_context_item_1.ContexterContextItem(function (context) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                context.bailed = true;
                return [2 /*return*/];
            });
        }); }));
        return this.chain;
    };
    ContextersImpl.prototype.if = function (conditionSchema, options) {
        this.context.addItem(new condition_context_item_1.ConditionContextItem(conditionSchema, options.ifTrue, options.ifFalse, false));
        return this.chain;
    };
    ContextersImpl.prototype.ifSelf = function (conditionSchema, options) {
        this.context.addItem(new condition_context_item_1.ConditionContextItem(conditionSchema, options.ifTrue, options.ifFalse, true));
        return this.chain;
    };
    ContextersImpl.prototype.oneOf = function () {
        var conditionSchemas = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            conditionSchemas[_i] = arguments[_i];
        }
        this.context.addItem(new one_of_context_item_1.OneOfContextItem(conditionSchemas, false));
        return this.chain;
    };
    ContextersImpl.prototype.oneOfSelf = function () {
        var conditionSchemas = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            conditionSchemas[_i] = arguments[_i];
        }
        this.context.addItem(new one_of_context_item_1.OneOfContextItem(conditionSchemas, true));
        return this.chain;
    };
    ContextersImpl.prototype.optional = function (options) {
        if (options === void 0) { options = { nullable: false }; }
        this.context.optional = options;
        return this.chain;
    };
    return ContextersImpl;
}());
exports.ContextersImpl = ContextersImpl;
