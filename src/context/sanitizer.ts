import { SanitizerHandler } from "../handler/sanitizer-handler";
import { Context } from "./context";
import { ContextItem } from "./context-item";

export class Sanitizer implements ContextItem {
  message: string;
  constructor(
    private readonly handler: SanitizerHandler,
    private readonly args: any[]
  ) {}

  async run(context: Context): Promise<void> {
    context.value = await this.handler(context.value, ...this.args);
  }
}
