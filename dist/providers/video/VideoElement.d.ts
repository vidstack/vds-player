export const VIDEO_ELEMENT_TAG_NAME: "vds-video";
/**
 * Enables loading, playing and controlling videos via the HTML5 `<video>` element.
 *
 * @tagname vds-video
 * @slot Used to pass in `<source>`/`<track>` elements to the underlying HTML5 media player.
 * @csspart media - The video element (`<video>`).
 * @csspart video - Alias for `media` part.
 * @example
 * ```html
 * <vds-video src="/media/video.mp4" poster="/media/poster.png">
 *   <!-- ... -->
 * </vds-video>
 * ```
 * @example
 * ```html
 * <vds-video poster="/media/poster.png">
 *   <source src="/media/video.mp4" type="video/mp4" />
 *   <track default kind="subtitles" src="/media/subs/en.vtt" srclang="en" label="English" />
 * </vds-video>
 * ```
 */
export class VideoElement extends Html5MediaElement {
    /** @type {import('lit').CSSResultGroup} */
    static get styles(): import("lit").CSSResultGroup;
    /** @type {string[]} */
    static get parts(): string[];
    /**
     * 🧑‍🔬 **EXPERIMENTAL:** Whether the browser should automatically toggle picture-in-picture mode as
     * the user switches back and forth between this document and another document or application.
     *
     * @type {boolean | undefined}
     */
    autoPiP: boolean | undefined;
    /**
     * 🧑‍🔬 **EXPERIMENTAL:** Prevents the browser from suggesting a picture-in-picture context menu or
     * to request picture-in-picture automatically in some cases.
     *
     * @type {boolean | undefined}
     * @link https://w3c.github.io/picture-in-picture/#disable-pip
     */
    disablePiP: boolean | undefined;
    set poster(arg: string);
    /**
     * A URL for an image to be shown while the video is downloading. If this attribute isn't
     * specified, nothing is displayed until the first frame is available, then the first frame is
     * shown as the poster frame.
     *
     * @type {string}
     */
    get poster(): string;
    get videoElement(): HTMLVideoElement;
    get videoEngine(): HTMLVideoElement;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderVideo(): import('lit').TemplateResult;
    /**
     * Override this to modify video CSS Parts.
     *
     * @protected
     * @returns {string}
     */
    protected getVideoPartAttr(): string;
    /**
     * Can be used by attaching engine such as `hls.js` to prevent src attr being set on
     * `<video>` element.
     *
     * @protected
     * @returns {boolean}
     */
    protected shouldSetVideoSrcAttr(): boolean;
    /**
     * Issues an asynchronous request to display the video in picture-in-picture mode.
     *
     * It's not guaranteed that the video will be put into picture-in-picture. If permission to enter
     * that mode is granted, the returned `Promise` will resolve and the video will receive a
     * `enterpictureinpicture` event to let it know that it's now in picture-in-picture.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestPictureInPicture
     * @returns {Promise<PictureInPictureWindow>}
     */
    requestPictureInPicture(): Promise<PictureInPictureWindow>;
    presentationController: VideoPresentationController;
}
import { Html5MediaElement } from "../html5/Html5MediaElement.js";
import { VideoPresentationController } from "./presentation/VideoPresentationController.js";
