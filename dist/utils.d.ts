export declare const bindAll: <T>(object: T) => { [K in keyof T]: T[K]; };
export declare function toString(value: unknown, deep?: boolean): string;
export declare function getValueByPath(object: unknown, path: string[]): unknown;
