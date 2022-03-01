export interface ValidationError {
    value: unknown;
    path: string[];
    message: string;
    args: ValidationErrorArgs;
}
export declare type ValidationErrorArgs = {
    fieldName?: string;
    [key: string]: any;
};
