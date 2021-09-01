import { ContexterHandler } from "../handler/contexter-handler";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class Contexter implements ContextItem {
  message = "invalid value";
  constructor(protected readonly handler: ContexterHandler) {}

  run(context: Context): Promise<void> {
    return this.handler(context);
  }
}
