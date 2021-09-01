import { Handler } from "./handler";

export interface ValidationHandler extends Handler {
  (value: unknown): Promise<boolean>;
}
