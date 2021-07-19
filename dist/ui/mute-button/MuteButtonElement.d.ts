export const MUTE_BUTTON_ELEMENT_TAG_NAME: "vds-mute-button";
/**
 * A button for toggling the muted state of the player.
 *
 * @tagname vds-mute-button
 * @slot mute - The content to show when the `muted` state is `false`.
 * @slot unmute - The content to show when the `muted` state is `true`.
 * @csspart button - The root button (`<vds-button>`).
 * @csspart button-* - All `vds-button` parts re-exported with the `button` prefix.
 * @example
 * ```html
 * <vds-mute-button>
 *   <!-- Showing -->
 *   <div slot="mute"></div>
 *   <!-- Hidden - `hidden` attribute will automatically be applied/removed -->
 *   <div slot="unmute" hidden></div>
 * </vds-mute-button>
 * ```
 */
export class MuteButtonElement extends ToggleButtonElement {
    /**
     * @protected
     * @readonly
     */
    protected readonly remoteControl: MediaRemoteControl;
    /**
     * The `mute` slotted element.
     *
     * @type {HTMLElement | undefined}
     */
    get muteSlotElement(): HTMLElement | undefined;
    /**
     * The `unmute` slotted element.
     *
     * @type {HTMLElement | undefined}
     */
    get unmuteSlotElement(): HTMLElement | undefined;
}
import { ToggleButtonElement } from "../toggle-button/ToggleButtonElement.js";
import { MediaRemoteControl } from "../../media/controller/MediaRemoteControl.js";
