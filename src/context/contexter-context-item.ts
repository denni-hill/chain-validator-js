import { ContexterHandler } from "../handler/contexter-handler";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class ContexterContextItem implements ContextItem {
  constructor(protected readonly handler: ContexterHandler) {}

  async run(context: Context): Promise<void> {
    return await this.handler(context);
  }
}
