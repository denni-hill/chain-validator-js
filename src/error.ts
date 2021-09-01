export interface ValidationError {
  value: unknown;
  path: string[];
  message?: string;
  inverse?: boolean;
  args: unknown;
}
