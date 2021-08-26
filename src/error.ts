export interface ValidationError {
  path: string[];
  message?: string;
  inverse?: boolean;
  args: any;
}
