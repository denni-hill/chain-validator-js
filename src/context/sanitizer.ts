import { SanitizerHandler } from "../handler/sanitizer-handler";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class Sanitizer implements ContextItem {
  constructor(
    readonly handler: SanitizerHandler,
    readonly args: unknown,
    public message: string
  ) {}

  async run(context: Context): Promise<void> {
    context.value = await this.handler(context.value);
  }
}
