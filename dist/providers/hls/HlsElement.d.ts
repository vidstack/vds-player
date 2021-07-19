export const HLS_ELEMENT_TAG_NAME: "vds-hls";
export const HLS_EXTENSIONS: RegExp;
export const HLS_TYPES: Set<string>;
/**
 * Enables loading, playing and controlling videos via the HTML5 `<video>` element. This provider
 * also introduces support for the [HTTP Live Streaming protocol](https://en.wikipedia.org/wiki/HTTP_Live_Streaming)
 * (also known as HLS) via the [`video-dev/hls.js`](https://github.com/video-dev/hls.js) library.
 *
 * You can decide whether you'd like to bundle `hls.js` into your application (not recommended), or
 * load it dynamically from your own server or a CDN. We recommended dynamically loading it to
 * prevent blocking the main thread when rendering this element, and to ensure `hls.js` is cached
 * separately.
 *
 * ## Dynamically Loaded
 *
 * ### CDN
 *
 * Simply point the `hlsLibrary` property or `hls-library` attribute to a script on a CDN
 * containing the library. For example, you could use the following URL
 * `https://cdn.jsdelivr.net/npm/hls.js@0.14.7/dist/hls.js`. Swap `hls.js` for `hls.min.js` in
 * production.
 *
 * We recommended using either [JSDelivr](https://jsdelivr.com) or [UNPKG](https://unpkg.com).
 *
 * ```html
 * <vds-hls
 *   src="https://stream.mux.com/dGTf2M5TBA5ZhXvwEIOziAHBhF2Rn00jk79SZ4gAFPn8.m3u8"
 *   hls-library="https://cdn.jsdelivr.net/npm/hls.js@0.14.7/dist/hls.js"
 * ></vds-hls>
 * ```
 *
 * ### Dynamic Import
 *
 * If you'd like to serve your own copy and control when the library is downloaded, simply
 * use [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)
 * and update the `hlsLibrary` property when ready. You must pass in the `hls.js` class constructor.
 *
 * ## Locally Bundled (not recommended)
 *
 * You'll need to install `hls.js`...
 *
 * ```bash
 * $: npm install hls.js@^0.14.0 @types/hls.js@^0.13.3
 * ```
 *
 * Finally, import it and pass it as a property to `<vds-hls>`...
 *
 * ```ts
 * import '@vidstack/elements/providers/hls/define.js';
 *
 * import { html, LitElement } from 'lit';
 * import Hls from 'hls.js';
 *
 * class MyElement extends LitElement {
 *   render() {
 *     return html`<vds-hls src="..."  .hlsLibrary=${Hls}></vds-hls>`;
 *   }
 * }
 * ```
 *
 * @tagname vds-hls
 * @slot Used to pass in `<source>`/`<track>` elements to the underlying HTML5 media player.
 * @slot ui - Used to pass in `<vds-ui>` to customize the player user interface.
 * @csspart media - The video element (`<video>`).
 * @csspart video - Alias for `media` part.
 * @example
 * ```html
 * <vds-hls src="/media/index.m3u8" poster="/media/poster.png">
 *   <!-- ... -->
 * </vds-hls>
 * ```
 * @example
 * ```html
 *  <vds-hls src="/media/index.m3u8" poster="/media/poster.png">
 *    <track default kind="subtitles" src="/media/subs/en.vtt" srclang="en" label="English" />
 *    <vds-ui slot="ui">
 *      <!-- ... -->
 *    </vds-ui>
 *  </vds-hls>
 * ```
 */
export class HlsElement extends VideoElement {
    /**
     * The `hls.js` configuration object.
     *
     * @type {Partial<Hls.Config> | undefined}
     */
    hlsConfig: Partial<Hls.Config> | undefined;
    /**
     * The `hls.js` constructor or a URL of where it can be found. Only version `^0.13.3`
     * (note the `^`) is supported at the moment. Important to note that by default this is
     * `undefined` so you can freely optimize when the best possible time is to load the library.
     *
     * @type {HlsConstructor | string | undefined}
     */
    hlsLibrary: HlsConstructor | string | undefined;
    /**
     * @protected
     * @type {HlsConstructor | undefined}
     */
    protected _Hls: HlsConstructor | undefined;
    /**
     * The `hls.js` constructor.
     *
     * @type {HlsConstructor | undefined}
     */
    get Hls(): typeof import("hls.js") | undefined;
    /**
     * @protected
     * @type {Hls | undefined}
     */
    protected _hlsEngine: Hls | undefined;
    /**
     * @protected
     * @type {boolean}
     */
    protected _isHlsEngineAttached: boolean;
    /**
     * The current `hls.js` instance.
     *
     * @type {Hls | undefined}
     */
    get hlsEngine(): import("hls.js") | undefined;
    /**
     * Whether the `hls.js` instance has mounted the `HtmlMediaElement`.
     *
     * @type {boolean}
     * @default false
     */
    get isHlsEngineAttached(): boolean;
    /**
     * Attempts to preconnect to the `hls.js` remote source given via `hlsLibrary`. This is
     * assuming `hls.js` is not bundled and `hlsLibrary` is a URL string pointing to where it
     * can be found.
     *
     * @protected
     */
    protected initiateHlsLibraryDownloadConnection(): void;
    /**
     * Whether HLS streaming is supported in this environment.
     *
     * @returns {boolean}
     */
    get isHlsSupported(): boolean;
    /**
     * Whether the current src is using HLS.
     *
     * @type {boolean}
     * @default false
     */
    get isHlsStream(): boolean;
    /**
     * Whether the browser natively supports HLS, mostly only true in Safari. Only call this method
     * after the provider has connected to the DOM (wait for `MediaProviderConnectEvent`).
     *
     * @type {boolean}
     */
    get hasNativeHlsSupport(): boolean;
    /**
     * Whether native HLS support is available and whether it should be used. Generally defaults
     * to `false` as long as `window.MediaSource` is defined to enforce consistency by
     * using `hls.js` where ever possible.
     *
     * @type {boolean}
     * @default false
     */
    get shouldUseNativeHlsSupport(): boolean;
    /**
     * Loads `hls.js` from a remote source found at the `hlsLibrary` URL (if a string).
     *
     * @protected
     * @returns {Promise<void>}
     */
    protected loadHlsLibrary(): Promise<void>;
    /**
     * Loads `hls.js` from the remote source given via `hlsLibrary` into the window namespace. This
     * is because `hls.js` in 2021 still doesn't provide a ESM export. This method will return
     * `undefined` if it fails to load the script. Listen to `HlsLoadErrorEvent` to be notified
     * of any failures.
     *
     * @protected
     * @returns {Promise<HlsConstructor | undefined>}
     */
    protected loadHlsScript(): Promise<HlsConstructor | undefined>;
    /**
     * @protected
     * @param {boolean} [forceRebuild=false]
     * @returns {Promise<void>}
     */
    protected buildHlsEngine(forceRebuild?: boolean | undefined): Promise<void>;
    /**
     * @protected
     */
    protected destroyHlsEngine(): void;
    /** @type {string} */
    _prevHlsEngineSrc: string;
    /**
     * @protected
     */
    protected attachHlsEngine(): void;
    /**
     * @protected
     */
    protected detachHlsEngine(): void;
    /**
     * @protected
     */
    protected loadSrcOnHlsEngine(): void;
    /**
     * @protected
     */
    protected listenToHlsEngine(): void;
    /**
     * @protected
     * @param {string} eventType
     * @param {Hls.errorData} data
     */
    protected handleHlsError(eventType: string, data: Hls.errorData): void;
    /**
     * @protected
     * @param {string} eventType
     * @param {Hls.errorData} data
     */
    protected handleHlsNetworkError(eventType: string, data: Hls.errorData): void;
    /**
     * @protected
     * @param {string} eventType
     * @param {Hls.errorData} data
     */
    protected handleHlsMediaError(eventType: string, data: Hls.errorData): void;
    /**
     * @protected
     * @param {string} eventType
     * @param {Hls.errorData} data
     */
    protected handleHlsIrrecoverableError(eventType: string, data: Hls.errorData): void;
    /**
     * @protected
     * @param {string} eventType
     * @param {Hls.levelLoadedData} data
     */
    protected handleHlsLevelLoaded(eventType: string, data: Hls.levelLoadedData): void;
    /**
     * @protected
     * @param {string} eventType
     * @param {Hls.levelLoadedData} data
     */
    protected handleHlsMediaReady(eventType: string, data: Hls.levelLoadedData): void;
}
export type HlsConstructor = typeof import('hls.js');
export type Hls = import('hls.js');
import { VideoElement } from "../video/VideoElement.js";
