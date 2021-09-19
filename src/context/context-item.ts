import { Context } from "./context";

export interface ContextItem {
  run(context: Context): Promise<unknown>;
}
