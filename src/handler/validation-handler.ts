import { Handler } from "./handler";

export interface ValidationHandler extends Handler {
  (value: any, ...args: any[]): Promise<boolean>;
}
