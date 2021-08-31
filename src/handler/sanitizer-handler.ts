import { Handler } from "./handler";

export interface SanitizerHandler extends Handler {
  (value: any): Promise<any>;
}
