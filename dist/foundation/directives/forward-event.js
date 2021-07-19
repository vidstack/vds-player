import { nothing } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
import { directive, PartType } from 'lit/directive.js';
import { isNil, isString } from '../../utils/unit.js';
import { listen, redispatchEvent } from '../events/index.js';
export class ForwardEventDirective extends AsyncDirective {
  /**
   * @param {import('lit/directive').PartInfo} partInfo
   */
  constructor(partInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error(
        'The `forwardEvent` directive must be used on an element tag.'
      );
    }
  }
  /**
   * @param {keyof GlobalEventHandlersEventMap} type - The name of the event to listen to.
   * @returns {typeof nothing}
   */
  render(type) {
    return nothing;
  }
  /**
   * @param {import('lit').ElementPart} part
   * @param {Parameters<this['render']>} params
   * @returns {typeof nothing}
   */
  update(part, [type]) {
    var _a, _b;
    if (
      this.element !== part.element ||
      this.type !== type ||
      this.host !==
        ((_a = part.options) === null || _a === void 0 ? void 0 : _a.host)
    ) {
      this.element = part.element;
      this.type = type;
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
    if (isNil(this.element) || isNil(this.host) || !isString(this.type)) {
      return;
    }
    this.dispose = listen(this.element, this.type, (e) => {
      redispatchEvent(this.host, e);
    });
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
export const forwardEvent = directive(ForwardEventDirective);
//# sourceMappingURL=forward-event.js.map
