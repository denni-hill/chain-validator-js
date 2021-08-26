import { Context } from "./context/context";

export function build() {
  const ctx = new Context();
  return ctx.chain;
}
