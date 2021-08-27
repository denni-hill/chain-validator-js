export interface ValidationError {
  value: any;
  path: string[];
  message?: string;
  inverse?: boolean;
  args: any;
}
