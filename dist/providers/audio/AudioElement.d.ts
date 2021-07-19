export const AUDIO_ELEMENT_TAG_NAME: "vds-audio";
/**
 * Enables loading, playing and controlling audio media via the HTML5 `<audio>` element.
 *
 * @tagname vds-audio
 * @slot Used to pass in `<source>`/`<track>` elements to the underlying HTML5 media player.
 * @csspart media - The audio element (`<audio>`).
 * @csspart audio - Alias for `media` part.
 * @example
 * ```html
 * <vds-audio src="/media/audio.mp3">
 *   <!-- ... -->
 * </vds-video>
 * ```
 * @example
 * ```html
 * <vds-audio>
 *   <source src="/media/audio.mp3" type="audio/mp3" />
 * </vds-audio>
 * ```
 */
export class AudioElement extends Html5MediaElement {
    /** @type {import('lit').CSSResultGroup} */
    static get styles(): import("lit").CSSResultGroup;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderAudio(): import('lit').TemplateResult;
    /**
     * Override this to modify audio CSS Parts.
     *
     * @protected
     * @returns {string}
     */
    protected getAudioPartAttr(): string;
    /**
     * Can be used by attaching engine such as `hls.js` to prevent src attr being set on
     * `<audio>` element.
     *
     * @protected
     * @returns {boolean}
     */
    protected shouldSetAudioSrcAttr(): boolean;
}
import { Html5MediaElement } from "../html5/Html5MediaElement.js";
