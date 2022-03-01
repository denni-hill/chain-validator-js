"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueByPath = exports.toString = exports.bindAll = void 0;
var bindAll = function (object) {
    var protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(object));
    protoKeys.forEach(function (key) {
        var maybeFn = object[key];
        if (typeof maybeFn === "function" && key !== "constructor") {
            object[key] = maybeFn.bind(object);
        }
    });
    return object;
};
exports.bindAll = bindAll;
function toString(value, deep) {
    if (deep === void 0) { deep = true; }
    if (Array.isArray(value) && value.length && deep) {
        return toString(value[0], false);
    }
    else if (value instanceof Date) {
        return value.toISOString();
    }
    else if (value && typeof value === "object" && value.toString) {
        if (typeof value.toString !== "function") {
            return Object.getPrototypeOf(value).toString.call(value);
        }
        return value.toString();
    }
    else if (value == null || (isNaN(Number(value)) && !String(value).length)) {
        return "";
    }
    return String(value);
}
exports.toString = toString;
function getValueByPath(object, path) {
    var value = object;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var pathPart = path_1[_i];
        if (value[pathPart] === undefined)
            return undefined;
        else
            value = value[pathPart];
    }
    return value;
}
exports.getValueByPath = getValueByPath;
