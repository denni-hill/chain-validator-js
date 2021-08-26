import { Context } from "./context";

export interface ContextItem {
  message: string;
  run(context: Context): Promise<any>;
}
