import { Context } from "../context/context";
import { Handler } from "./handler";
export interface ContexterHandler extends Handler {
    (context: Context): Promise<void>;
}
