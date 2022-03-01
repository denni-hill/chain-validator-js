"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationResult = void 0;
var ValidationResult = /** @class */ (function () {
    function ValidationResult(errors) {
        if (errors === void 0) { errors = []; }
        this.validated = {};
        this.errors = [];
        this.errors = errors;
    }
    Object.defineProperty(ValidationResult.prototype, "passed", {
        get: function () {
            return this.errors.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "failed", {
        get: function () {
            return !this.passed;
        },
        enumerable: false,
        configurable: true
    });
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
