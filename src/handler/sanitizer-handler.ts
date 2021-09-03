import { Context } from "../context/context";
import { Handler } from "./handler";

export interface SanitizerHandler extends Handler {
  (value: unknown): Promise<unknown>;
}

export interface SanitizerHandlerReturner {
  (context: Context): SanitizerHandler;
}
