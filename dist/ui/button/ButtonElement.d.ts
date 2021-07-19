export const BUTTON_ELEMENT_TAG_NAME: "vds-button";
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
export class ButtonElement extends LitElement {
    /** @type {import('lit').CSSResultGroup} */
    static get styles(): import("lit").CSSResultGroup;
    /** @type {string[]} */
    static get parts(): string[];
    /**
     * ♿ **ARIA:** The `aria-label` property of the button.
     *
     * @type {string | undefined}
     */
    label: string | undefined;
    /**
     * ♿ **ARIA:** Identifies the element (or elements) whose contents or presence are controlled by
     * the current button. See related `aria-owns`.
     *
     * @type {string | undefined}
     */
    controls: string | undefined;
    /**
     * Indicates the availability and type of interactive popup element, such as menu or dialog,
     * that can be triggered by the button.
     *
     * @type {boolean | undefined}
     */
    hasPopup: boolean | undefined;
    /**
     * Whether the button should be disabled (not-interactable).
     *
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * Sets the default behaviour of the button.
     *
     * @type {ButtonType}
     */
    type: ButtonType;
    /**
     * ♿ **ARIA:** Indicates whether the button, or another grouping element it controls, is
     * currently expanded or collapsed.
     *
     * @type {boolean | undefined}
     */
    expanded: boolean | undefined;
    /**
     * ♿ **ARIA:** Indicates the current "pressed" state of toggle buttons. See related `aria-checked`
     * and `aria-selected`.
     *
     * @type {boolean | undefined}
     */
    pressed: boolean | undefined;
    /**
     * ♿ **ARIA:** Identifies the element (or elements) that describes the button. See related
     * `aria-labelledby`.
     *
     * @type {string | undefined}
     */
    describedBy: string | undefined;
    /**
     * @protected
     * @readonly
     */
    protected readonly disconnectDisposal: ElementDisposalController;
    /**
     * @protected
     * @type {import('lit/directives/ref').Ref<HTMLButtonElement>}
     */
    protected rootRef: import('lit/directives/ref').Ref<HTMLButtonElement>;
    /**
     * The underlying `<button>` element.
     *
     * @type {HTMLButtonElement}
     */
    get rootElement(): HTMLButtonElement;
    renderButton(): import("lit-html").TemplateResult<1>;
    /**
     * Override this to modify content rendered inside root control (`<button>`).
     *
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderButtonChildren(): import('lit').TemplateResult;
    /**
     * Override this to modify rendering of default slot.
     *
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderDefaultSlot(): import('lit').TemplateResult;
    /**
     * Override this to modify CSS Classes.
     *
     * @protected
     * @returns {string}
     */
    protected getButtonClassAttr(): string;
    /**
     * Override this to modify CSS Parts.
     *
     * @protected
     * @returns {string}
     */
    protected getButtonPartAttr(): string;
    /**
     * The `aria-pressed` attribute value.
     *
     * @protected
     * @returns {'true' | 'false' | undefined}
     */
    protected isAriaPressed(): 'true' | 'false' | undefined;
    /**
     * The `aria-expanded` attribute value.
     *
     * @protected
     * @returns {'true' | 'false' | undefined}
     */
    protected isAriaExpanded(): 'true' | 'false' | undefined;
    /**
     * The `aria-haspopup` attribute value.
     *
     * @protected
     * @returns {'true' | undefined}
     */
    protected hasAriaPopupMenu(): 'true' | undefined;
    /**
     * @protected
     */
    protected addDefaultEventListeners(): void;
    /**
     * @protected
     * @param {Event} event
     * @returns {void | boolean}
     */
    protected handleClickCapture(event: Event): void | boolean;
}
export type ButtonType = 'button' | 'submit' | 'reset' | 'menu';
import { LitElement } from "lit-element/lit-element";
import { ElementDisposalController } from "../../foundation/elements/ElementDisposalController.js";
