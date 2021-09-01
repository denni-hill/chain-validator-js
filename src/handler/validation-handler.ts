import { Context } from "../context/context";
import { Handler } from "./handler";

export interface ValidationHandler extends Handler {
  (value: unknown): Promise<boolean>;
}

export interface ValidationHandlerReturner {
  (context: Context): ValidationHandler;
}
