import { nothing } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
import { directive, PartType } from 'lit/directive.js';
import { isFunction, isNil, isString } from '../../utils/unit.js';
import { listen as listenToEvent } from '../events/index.js';
export class EventListenerDirective extends AsyncDirective {
  /**
   * @param {import('lit/directive').PartInfo} partInfo
   */
  constructor(partInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error('The `on` directive must be used on an element tag.');
    }
  }
  /**
   * @template {keyof GlobalEventHandlersEventMap} EventType
   * @param {EventType} type - The name of the event to listen to.
   * @param {(event: GlobalEventHandlersEventMap[EventType]) => void} handler - The function to be called when the event is fired.
   * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options] - Configures the event listener.
   * @returns {typeof nothing}
   */
  render(type, handler, options) {
    return nothing;
  }
  /**
   * @param {import('lit').ElementPart} part
   * @param {Parameters<this['render']>} params
   * @returns {typeof nothing}
   */
  update(part, [type, handler, options]) {
    var _a, _b;
    if (
      this.element !== part.element ||
      this.type !== type ||
      this.handler !== handler ||
      this.options !== options ||
      this.host !==
        ((_a = part.options) === null || _a === void 0 ? void 0 : _a.host)
    ) {
      this.element = part.element;
      this.type = type;
      this.handler = handler;
      this.options = options;
      this.host =
        (_b = part.options) === null || _b === void 0 ? void 0 : _b.host;
      this.removeEventListener();
      this.addEventListener();
    }
    return nothing;
  }
  /**
   * @protected
   */
  addEventListener() {
    var _a;
    if (
      isNil(this.element) ||
      !isString(this.type) ||
      !isFunction(this.handler)
    ) {
      return;
    }
    this.dispose = listenToEvent(
      this.element,
      this.type,
      this.handler.bind(
        (_a = this.host) !== null && _a !== void 0 ? _a : this.element
      ),
      this.options
    );
  }
  /**
   * @protected
   */
  removeEventListener() {
    var _a;
    (_a = this.dispose) === null || _a === void 0 ? void 0 : _a.call(this);
    this.dispose = undefined;
  }
  /**
   * @protected
   */
  reconnected() {
    this.addEventListener();
  }
  /**
   * @protected
   */
  disconnected() {
    this.removeEventListener();
  }
}
/**
 * @typedef {<T extends keyof GlobalEventHandlersEventMap>(
 *   type: T,
 *   event: (event: GlobalEventHandlersEventMap[T]) => void,
 *   options?:  boolean | AddEventListenerOptions | EventListenerOptions
 * ) => import('lit/directive').DirectiveResult<typeof EventListenerDirective>}
 * EventListenerDirectiveResult
 */
export const on = /** @type {EventListenerDirectiveResult} */ (
  directive(EventListenerDirective)
);
//# sourceMappingURL=on.js.map
