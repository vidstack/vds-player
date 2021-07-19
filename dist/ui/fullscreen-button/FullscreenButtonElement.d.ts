export const FULLSCREEN_BUTTON_ELEMENT_TAG_NAME: "vds-fullscreen-button";
/**
 * A button for toggling the fullscreen mode of the player.
 *
 *
 * @tagname vds-fullscreen-button
 * @slot enter - The content to show when the `fullscreen` state is `false`.
 * @slot exit - The content to show when the `fullscreen` state is `true`.
 * @csspart button - The root button (`<vds-button>`).
 * @csspart button-* - All `vds-button` parts re-exported with the `button` prefix.
 * @example
 * ```html
 * <vds-fullscreen-button>
 *   <!-- Showing -->
 *   <div slot="enter"></div>
 *   <!-- Hidden - `hidden` attribute will automatically be applied/removed -->
 *   <div slot="exit" hidden></div>
 * </vds-fullscreen-button>
 * ```
 */
export class FullscreenButtonElement extends ToggleButtonElement {
    /**
     * @protected
     * @readonly
     */
    protected readonly remoteControl: MediaRemoteControl;
    /**
     * The `enter` slotted element.
     *
     * @type {HTMLElement | undefined}
     */
    get enterSlotElement(): HTMLElement | undefined;
    /**
     * The `exit` slotted element.
     *
     * @type {HTMLElement | undefined}
     */
    get exitSlotElement(): HTMLElement | undefined;
}
import { ToggleButtonElement } from "../toggle-button/ToggleButtonElement.js";
import { MediaRemoteControl } from "../../media/controller/MediaRemoteControl.js";
