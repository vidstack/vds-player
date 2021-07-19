export class EventListenerDirective extends AsyncDirective {
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
     * @type {((...args: any) => void) | undefined}
     */
    protected handler: ((...args: any) => void) | undefined;
    /**
     * @protected
     * @type {boolean | AddEventListenerOptions | EventListenerOptions | undefined}
     */
    protected options: boolean | AddEventListenerOptions | EventListenerOptions | undefined;
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
/**
 * @typedef {<T extends keyof GlobalEventHandlersEventMap>(
 *   type: T,
 *   event: (event: GlobalEventHandlersEventMap[T]) => void,
 *   options?:  boolean | AddEventListenerOptions | EventListenerOptions
 * ) => import('lit/directive').DirectiveResult<typeof EventListenerDirective>}
 * EventListenerDirectiveResult
 */
export const on: EventListenerDirectiveResult;
export type EventListenerDirectiveResult = <T extends keyof GlobalEventHandlersEventMap>(type: T, event: (event: GlobalEventHandlersEventMap[T]) => void, options?: boolean | AddEventListenerOptions | EventListenerOptions | undefined) => import('lit/directive').DirectiveResult<typeof EventListenerDirective>;
import { AsyncDirective } from "lit-html/async-directive";
