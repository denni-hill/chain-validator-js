import { Handler } from "./handler";

export interface SanitizerHandler extends Handler {
  (value: unknown): Promise<unknown>;
}
