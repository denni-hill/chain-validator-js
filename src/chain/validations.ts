import { IsEmailOptions, IsNumericOptions } from "../options";

export interface Validations<Return> {
  not(): Validations<Return>;

  isEmail(options?: IsEmailOptions): Return;

  isNumeric(options?: IsNumericOptions): Return;

  isString(): Return;

  isArray(): Return;
}
