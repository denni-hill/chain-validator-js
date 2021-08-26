import { Handler } from "./handler";

export interface SanitizerHandler extends Handler {
  (value: any, ...args: any[]): Promise<any>;
}
