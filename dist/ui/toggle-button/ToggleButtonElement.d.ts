export const TOGGLE_BUTTON_ELEMENT_TAG_NAME: "vds-toggle-button";
/**
 * The foundation for any toggle button such as a `play-button` or `mute-button`.
 *
 *
 * @tagname vds-toggle-button
 * @csspart button - The root button component (`<vds-button>`).
 * @csspart button-* - All `vds-button` parts re-exported with the `button` prefix.
 * @slot The content to show when the toggle is not pressed.
 * @slot pressed - The content to show when the toggle is pressed.
 * @example
 * ```html
 * <vds-toggle-button label="Some action">
 *   <!-- Showing -->
 *   <div slot="pressed"></div>
 *   <!-- Hidden - `hidden` attribute will automatically be applied/removed -->
 *   <div hidden></div>
 * </vds-toggle-button>
 * ```
 */
export class ToggleButtonElement extends ToggleElement {
    /** @type {string[]} */
    static get parts(): string[];
    /**
     * ♿ **ARIA:** The `aria-label` property of the underlying button.
     *
     * @type {string | undefined}
     */
    label: string | undefined;
    /**
     * Whether the underlying button should be disabled (not-interactable).
     *
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * ♿ **ARIA:** Identifies the element (or elements) that describes the underlying button.
     *
     * @type {string | undefined}
     */
    describedBy: string | undefined;
    /**
     * @protected
     * @type {import('lit/directives/ref').Ref<ButtonElement>}
     */
    protected rootRef: import('lit/directives/ref').Ref<ButtonElement>;
    /**
     * The component's root element.
     *
     * @type {ButtonElement}
     */
    get rootElement(): ButtonElement;
    /**
     * Override this to modify root CSS Classes.
     *
     * @protected
     * @returns {string}
     */
    protected getRootClassAttr(): string;
    /**
     * Override this to modify root CSS parts.
     *
     * @protected
     * @returns {string}
     */
    protected getRootPartAttr(): string;
    /**
     * Override this to modify root CSS export parts.
     *
     * @protected
     * @returns {string}
     */
    protected getRootExportPartsAttr(): string;
    /**
     * Override this to modify on button click behaviour.
     *
     * @protected
     * @param {Event} event
     */
    protected handleButtonClick(event: Event): void;
}
import { ToggleElement } from "../toggle/ToggleElement.js";
import { ButtonElement } from "../button/ButtonElement.js";
