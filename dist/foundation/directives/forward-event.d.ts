export class ForwardEventDirective extends AsyncDirective {
    /**
     * @protected
     * @type {Element | undefined}
     */
    protected element: Element | undefined;
    /**
     * @protected
     * @type {object | undefined}
     */
    protected host: object | undefined;
    /**
     * @protected
     * @type {string | undefined}
     */
    protected type: string | undefined;
    /**
     * @protected
     * @type {(() => void) | undefined}
     */
    protected dispose: (() => void) | undefined;
    /**
     * @protected
     */
    protected addEventListener(): void;
    /**
     * @protected
     */
    protected removeEventListener(): void;
}
export const forwardEvent: (type: keyof GlobalEventHandlersEventMap) => import("lit-html/directive").DirectiveResult<typeof ForwardEventDirective>;
import { AsyncDirective } from "lit-html/async-directive";
