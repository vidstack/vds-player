import { __decorate } from 'tslib';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifNonEmpty } from '../../foundation/directives/index.js';
import { formatHtml5Duration, formatTime } from '../../utils/time.js';
import { timeElementStyles } from './styles.js';
export const TIME_ELEMENT_TAG_NAME = 'vds-time';
/**
 * Formats and displays a length of time given in `seconds`.
 *
 * @tagname vds-time
 * @csspart root - The component's root element (`<time>`).
 * @example
 * ```html
 * <vds-time seconds="50"></vds-time>
 * ```
 * @example
 * ```html
 * <vds-time
 *   label="Current time"
 *   seconds="3650"
 *   pad-hours
 *   always-show-hours
 * ></vds-time>
 * ```
 * @example
 * ```css
 * vds-time::part(root) {
 *   font-size: 16px;
 * }
 * ```
 */
export class TimeElement extends LitElement {
  constructor() {
    super(...arguments);
    /**
     * The length of time in seconds.
     *
     * @type {number}
     */
    this.seconds = 0;
    /**
     * Whether the time should always show the hours unit, even if the time is less than
     * 1 hour.
     *
     * @type {boolean}
     * @example `20:30` -> `0:20:35`
     */
    this.alwaysShowHours = false;
    /**
     * Whether the hours unit should be padded with zeroes to a length of 2.
     *
     * @type {boolean}
     * @example `1:20:03` -> `01:20:03`
     */
    this.padHours = false;
    // -------------------------------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------------------------------
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<HTMLTimeElement>}
     */
    this.rootRef = createRef();
  }
  /** @type {import('lit').CSSResultGroup} */
  static get styles() {
    return [timeElementStyles];
  }
  /** @type {string[]} */
  static get parts() {
    return ['root', 'time'];
  }
  /**
   * The component's root element.
   *
   * @type {HTMLTimeElement}
   */
  get rootElement() {
    return /** @type {HTMLTimeElement} */ (this.rootRef.value);
  }
  render() {
    return html`
      <time
        id="root"
        class=${this.getRootClassAttr()}
        part=${this.getRootPartAttr()}
        aria-label=${ifNonEmpty(this.label)}
        datetime=${this.getFormattedDuration()}
        ${ref(this.rootRef)}
      >
        ${this.renderRootChildren()}
      </time>
    `;
  }
  /**
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderRootChildren() {
    return html`${this.getFormattedTime()}`;
  }
  /**
   * @protected
   * @returns {string} The seconds formatted into human readable form.
   */
  getFormattedTime() {
    return formatTime(this.seconds, this.padHours, this.alwaysShowHours);
  }
  /**
   * @protected
   * @returns {string} A valid HTML5 duration.
   * @see https://www.w3.org/TR/2014/REC-html5-20141028/infrastructure.html#valid-duration-string
   */
  getFormattedDuration() {
    return formatHtml5Duration(this.seconds);
  }
  /**
   * Override this to modify root CSS Classes.
   *
   * @protected
   * @returns {string}
   */
  getRootClassAttr() {
    return 'root';
  }
  /**
   * Override this to modify root CSS parts.
   *
   * @protected
   * @returns {string}
   */
  getRootPartAttr() {
    return 'root time';
  }
}
__decorate([property()], TimeElement.prototype, 'label', void 0);
__decorate(
  [property({ type: Number })],
  TimeElement.prototype,
  'seconds',
  void 0
);
__decorate(
  [property({ attribute: 'always-show-hours', type: Boolean })],
  TimeElement.prototype,
  'alwaysShowHours',
  void 0
);
__decorate(
  [property({ attribute: 'pad-hours', type: Boolean })],
  TimeElement.prototype,
  'padHours',
  void 0
);
//# sourceMappingURL=TimeElement.js.map
