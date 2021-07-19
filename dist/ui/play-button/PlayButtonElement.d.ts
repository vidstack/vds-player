export const PLAY_BUTTON_ELEMENT_TAG_NAME: "vds-play-button";
/**
 * A button for toggling the playback state (play/pause) of the current media.
 *
 *
 * @tagname vds-play-button
 * @slot play - The content to show when the `paused` state is `true`.
 * @slot pause - The content to show when the `paused` state is `false`.
 * @csspart button - The root button (`<vds-button>`).
 * @csspart button-* - All `vds-button` parts re-exported with the `button` prefix.
 * @example
 * ```html
 * <vds-play-button>
 *   <!-- Showing -->
 *   <div slot="play"></div>
 *   <!-- Hidden - `hidden` attribute will automatically be applied/removed -->
 *   <div slot="pause" hidden></div>
 * </vds-play-button>
 * ```
 */
export class PlayButtonElement extends ToggleButtonElement {
    /**
     * @protected
     * @readonly
     */
    protected readonly remoteControl: MediaRemoteControl;
    /**
     * The `play` slotted element.
     *
     * @type {HTMLElement | undefined}
     */
    get playSlotElement(): HTMLElement | undefined;
    /**
     * The `pause` slotted element.
     *
     * @type {HTMLElement | undefined}
     */
    get pauseSlotElement(): HTMLElement | undefined;
}
import { ToggleButtonElement } from "../toggle-button/ToggleButtonElement.js";
import { MediaRemoteControl } from "../../media/controller/MediaRemoteControl.js";
