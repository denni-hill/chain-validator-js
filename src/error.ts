export interface ValidationError {
  value: unknown;
  path: string[];
  message: string;
  args: unknown;
}
