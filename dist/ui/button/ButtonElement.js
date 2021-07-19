import { __decorate } from 'tslib';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifNonEmpty } from '../../foundation/directives/index.js';
import { ElementDisposalController } from '../../foundation/elements/index.js';
import { WithFocus } from '../../foundation/elements/index.js';
import { listen } from '../../foundation/events/index.js';
import { isUndefined } from '../../utils/unit.js';
import { buttonElementStyles } from './styles.js';
export const BUTTON_ELEMENT_TAG_NAME = 'vds-button';
/** @typedef {'button' | 'submit' | 'reset' | 'menu'} ButtonType */
/**
 * Base control that is basically a naked (not styled) button that helps manage ARIA
 * attributes and normalizes any web-component or cross-browser related issues.
 *
 * @tagname vds-button
 * @slot Used to pass content into the button.
 * @csspart root - The component's root element (`<button>`).
 * @example
 * ```html
 * <vds-button>
 *   <!-- ... -->
 * </vds-button>
 * ```
 * @example
 * ```css
 * vds-button::part(root) {
 *   transform: scale(1);
 *   transition: transform 0.3s linear;
 * }
 *
 * vds-button::part(root):hover,
 * vds-button::part(root):focus {
 *   outline: 0;
 *   transform: scale(1.05);
 * }
 * ```
 */
export class ButtonElement extends WithFocus(LitElement) {
  constructor() {
    super(...arguments);
    /**
     * Whether the button should be hidden.
     *
     * @type {boolean}
     */
    this.hidden = false;
    /**
     * Whether the button should be disabled (not-interactable).
     *
     * @type {boolean}
     */
    this.disabled = false;
    /**
     * Sets the default behaviour of the button.
     *
     * @type {ButtonType}
     */
    this.type = 'button';
    // -------------------------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------------------------
    /**
     * @protected
     * @readonly
     */
    this.disconnectDisposal = new ElementDisposalController(this);
    // -------------------------------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------------------------------
    /**
     * @protected
     * @type {import('lit/directives/ref').Ref<HTMLButtonElement>}
     */
    this.rootRef = createRef();
  }
  /** @type {import('lit').CSSResultGroup} */
  static get styles() {
    return [buttonElementStyles];
  }
  /** @type {string[]} */
  static get parts() {
    return ['root'];
  }
  connectedCallback() {
    super.connectedCallback();
    this.addDefaultEventListeners();
  }
  /**
   * The underlying `<button>` element.
   *
   * @type {HTMLButtonElement}
   */
  get rootElement() {
    return /** @type {HTMLButtonElement} */ (this.rootRef.value);
  }
  render() {
    return this.renderButton();
  }
  renderButton() {
    return html`
      <button
        id="root"
        class=${this.getButtonClassAttr()}
        part=${this.getButtonPartAttr()}
        type=${ifNonEmpty(this.type)}
        aria-label=${ifNonEmpty(this.label)}
        aria-controls=${ifNonEmpty(this.controls)}
        aria-haspopup=${ifDefined(this.hasAriaPopupMenu())}
        aria-pressed=${ifDefined(this.isAriaPressed())}
        aria-expanded=${ifDefined(this.isAriaExpanded())}
        aria-describedby=${ifNonEmpty(this.describedBy)}
        ?hidden=${this.hidden}
        ?disabled=${this.disabled}
        ${ref(this.rootRef)}
      >
        ${this.renderButtonChildren()}
      </button>
    `;
  }
  /**
   * Override this to modify content rendered inside root control (`<button>`).
   *
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderButtonChildren() {
    return html`${this.renderDefaultSlot()}`;
  }
  /**
   * Override this to modify rendering of default slot.
   *
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderDefaultSlot() {
    return html`<slot></slot>`;
  }
  /**
   * Override this to modify CSS Classes.
   *
   * @protected
   * @returns {string}
   */
  getButtonClassAttr() {
    return 'root';
  }
  /**
   * Override this to modify CSS Parts.
   *
   * @protected
   * @returns {string}
   */
  getButtonPartAttr() {
    return 'root';
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  /**
   * The `aria-pressed` attribute value.
   *
   * @protected
   * @returns {'true' | 'false' | undefined}
   */
  isAriaPressed() {
    if (isUndefined(this.pressed)) return undefined;
    return this.pressed ? 'true' : 'false';
  }
  /**
   * The `aria-expanded` attribute value.
   *
   * @protected
   * @returns {'true' | 'false' | undefined}
   */
  isAriaExpanded() {
    if (isUndefined(this.controls)) return undefined;
    return this.expanded ? 'true' : 'false';
  }
  /**
   * The `aria-haspopup` attribute value.
   *
   * @protected
   * @returns {'true' | undefined}
   */
  hasAriaPopupMenu() {
    if (isUndefined(this.hasPopup)) return undefined;
    return this.hasPopup ? 'true' : undefined;
  }
  // -------------------------------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------------------------------
  // Forward click event to button and prevent it from working when disabled.
  click() {
    if (this.disabled) return;
    this.rootElement.click();
  }
  // -------------------------------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------------------------------
  /**
   * @protected
   */
  addDefaultEventListeners() {
    this.disconnectDisposal.add(
      listen(this, 'click', this.handleClickCapture.bind(this), {
        capture: true
      })
    );
  }
  /**
   * @protected
   * @param {Event} event
   * @returns {void | boolean}
   */
  handleClickCapture(event) {
    if (!this.disabled) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    return false;
  }
}
__decorate([property()], ButtonElement.prototype, 'label', void 0);
__decorate([property()], ButtonElement.prototype, 'controls', void 0);
__decorate(
  [property({ type: Boolean, attribute: 'has-popup' })],
  ButtonElement.prototype,
  'hasPopup',
  void 0
);
__decorate(
  [property({ type: Boolean, reflect: true })],
  ButtonElement.prototype,
  'hidden',
  void 0
);
__decorate(
  [property({ type: Boolean, reflect: true })],
  ButtonElement.prototype,
  'disabled',
  void 0
);
__decorate(
  [property({ reflect: true })],
  ButtonElement.prototype,
  'type',
  void 0
);
__decorate(
  [property({ type: Boolean, reflect: true })],
  ButtonElement.prototype,
  'expanded',
  void 0
);
__decorate(
  [property({ type: Boolean, reflect: true })],
  ButtonElement.prototype,
  'pressed',
  void 0
);
__decorate(
  [property({ reflect: true, attribute: 'described-by' })],
  ButtonElement.prototype,
  'describedBy',
  void 0
);
//# sourceMappingURL=ButtonElement.js.map
