/**
 * @typedef {{
 *  readonly videoElement: HTMLVideoElement | undefined
 * } & import('lit').ReactiveElement} VideoPresentationControllerHost
 */
/**
 * Contains the logic for handling presentation modes on Safari. This class is used by
 * the `VideoFullscreenController` as a fallback when the native Fullscreen API is not
 * available (ie: iOS Safari).
 *
 * @example
 * ```ts
 * import { LitElement } from 'lit';
 * import { VideoPresentationController } from '@vidstack/elements';
 *
 * class MyElement extends LitElement {
 *   get videoElement(): HTMLVideoElement | undefined {
 *     return this.videoEl;
 *   }
 *
 *   presentationController = new VideoPresentationController(this);
 * }
 * ```
 */
export class VideoPresentationController {
    /**
     * @param {VideoPresentationControllerHost} host
     */
    constructor(host: VideoPresentationControllerHost);
    /**
     * @protected
     * @readonly
     */
    protected readonly disconnectDisposal: DisposalBin;
    /**
     * @type {VideoPresentationControllerHost}
     * @protected
     * @readonly
     */
    protected readonly host: VideoPresentationControllerHost;
    /**
     * @protected
     */
    protected handleHostDisconnected(): void;
    /**
     * The current presentation mode, possible values include `inline`, `picture-in-picture` and
     * `fullscreen`. Only available in Safari.
     *
     * @type {WebKitPresentationMode | undefined}
     * @default undefined
     * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode
     */
    get presentationMode(): WebKitPresentationMode | undefined;
    /**
     * @type {boolean}
     * Whether the current `presentationMode` is `inline`.
     */
    get isInlineMode(): boolean;
    /**
     * Whether the current `presentationMode` is `picture-in-picture`.
     *
     * @type {boolean}
     */
    get isPictureInPictureMode(): boolean;
    /**
     * Whether the current `presentationMode` is `fullscreen`.
     *
     * @type {boolean}
     */
    get isFullscreenMode(): boolean;
    /**
     * Whether the presentation mode API is available.
     *
     * @type {boolean}
     * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1628805-webkitsupportsfullscreen
     */
    get isSupported(): boolean;
    /**
     * @param {WebKitPresentationMode} mode
     */
    setPresentationMode(mode: WebKitPresentationMode): void;
    /**
     * @protected
     * @returns {() => void} Stop listening function.
     */
    protected addPresentationModeChangeEventListener(): () => void;
    /**
     * @protected
     * @param {Event} event
     */
    protected handlePresentationModeChange(event: Event): void;
}
export type VideoPresentationControllerHost = {
    readonly videoElement: HTMLVideoElement | undefined;
} & import('lit').ReactiveElement;
import { DisposalBin } from "../../../foundation/events/events.js";
