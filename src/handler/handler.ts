export interface Handler {
  (value: unknown, ...args: unknown[]): unknown;
}
