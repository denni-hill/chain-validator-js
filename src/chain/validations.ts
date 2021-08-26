export interface Validations<Return> {
  not(): Validations<Return>;

  isEmail(): Return;
}
