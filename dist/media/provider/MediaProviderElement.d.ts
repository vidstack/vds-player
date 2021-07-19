/**
 * Fired when the media provider connects to the DOM.
 *
 * @bubbles
 * @composed
 * @augments {DiscoveryEvent<MediaProviderElement>}
 */
export class MediaProviderConnectEvent extends DiscoveryEvent<MediaProviderElement> {
    /** @readonly */
    static readonly TYPE: "vds-media-provider-connect";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<import("../../foundation/elements/index.js").DiscoveryEventDetail<MediaProviderElement>> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Base abstract media provider class that defines the interface to be implemented by
 * all concrete media providers. Extending this class enables provider-agnostic communication 💬
 *
 */
export class MediaProviderElement extends LitElement {
    /** @type {string[]} */
    static get events(): string[];
    /**
     * @protected
     * @readonly
     */
    protected readonly disconnectDisposal: ElementDisposalController;
    /**
     * @protected
     * @readonly
     */
    protected readonly discoveryController: ElementDiscoveryController<MediaProviderElement>;
    /**
     * @protected
     * @readonly
     */
    protected readonly eventListenerController: EventListenerController<{
        "vds-fullscreen-change": (event: FullscreenChangeEvent) => void;
    }>;
    /**
     * @protected
     * @type {boolean}
     */
    protected hasFlushedMediaRequestQueueOnce: boolean;
    /**
     * Whether playback should automatically begin as soon as enough media is available to do so
     * without interruption.
     *
     * Sites which automatically play audio (or videos with an audio track) can be an unpleasant
     * experience for users, so it should be avoided when possible. If you must offer autoplay
     * functionality, you should make it opt-in (requiring a user to specifically enable it).
     *
     * However, autoplay can be useful when creating media elements whose source will be set at a
     * later time, under user control.
     *
     * @type {boolean}
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay
     */
    autoplay: boolean;
    /**
     * Indicates whether a user interface should be shown for controlling the resource. Set this to
     * `false` when you want to provide your own custom controls, and `true` if you want the current
     * provider to supply its own default controls. Depending on the provider, changing this prop
     * may cause the player to completely reset.
     *
     * @type {boolean}
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controls
     */
    controls: boolean;
    /**
     * Whether media should automatically start playing from the beginning (replay) every time
     * it ends.
     *
     * @type {boolean}
     * @default false
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loop
     */
    loop: boolean;
    /**
     * Whether the video is to be played "inline", that is within the element's playback area. Note
     * that setting this to `false` does not imply that the video will always be played in fullscreen.
     * Depending on the provider, changing this prop may cause the player to completely reset.
     *
     * @type {boolean}
     */
    playsinline: boolean;
    set volume(arg: number);
    /**
     * An `int` between `0` (silent) and `1` (loudest) indicating the audio volume. Defaults to `1`.
     *
     * @type {number}
     * @default 1
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume
     */
    get volume(): number;
    /**
     * @protected
     * @abstract
     * @returns {number}
     */
    protected getVolume(): number;
    /**
     * @protected
     * @abstract
     * @param {number} newVolume
     */
    protected setVolume(newVolume: number): void;
    /** @param {boolean} shouldPause */
    set paused(arg: boolean);
    /**
     * Whether playback should be paused. Defaults to `true` if no media has loaded or playback has
     * not started. Setting this to `false` will begin/resume playback.
     *
     * @type {boolean}
     * @default true
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/paused
     */
    get paused(): boolean;
    /**
     * @protected
     * @abstract
     * @returns {boolean}
     */
    protected getPaused(): boolean;
    /** @param {number} requestedTime */
    set currentTime(arg: number);
    /**
     * A `double` indicating the current playback time in seconds. Defaults to `0` if the media has
     * not started to play and has not seeked. Setting this value seeks the media to the new
     * time. The value can be set to a minimum of `0` and maximum of the total length of the
     * media (indicated by the duration prop).
     *
     * @type {number}
     * @default 0
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
     */
    get currentTime(): number;
    /**
     * @protected
     * @abstract
     * @returns {number}
     */
    protected getCurrentTime(): number;
    /**
     * @protected
     * @abstract
     * @param {number} newTime
     */
    protected setCurrentTime(newTime: number): void;
    /** @param {boolean} shouldMute */
    set muted(arg: boolean);
    /**
     * Whether the audio is muted or not.
     *
     * @type {boolean}
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/muted
     */
    get muted(): boolean;
    /**
     * @protected
     * @abstract
     * @returns {boolean}
     */
    protected getMuted(): boolean;
    /**
     * @protected
     * @abstract
     * @param {boolean} isMuted
     */
    protected setMuted(isMuted: boolean): void;
    /**
     * The underlying engine that is actually responsible for rendering/loading media. Some examples
     * are:
     *
     * - The `VideoElement` engine is `HTMLVideoElement`.
     * - The `HlsElement` engine is the `hls.js` instance.
     * - The `YoutubeElement` engine is `HTMLIFrameElement`.
     *
     * Refer to the respective provider documentation to find out which engine is powering it.
     *
     * @abstract
     * @type {unknown}
     */
    get engine(): unknown;
    /**
     * An immutable snapshot of the current media state.
     *
     * @type {Readonly<import('../../foundation/context').ExtractContextRecordTypes<typeof mediaContext>>}
     */
    get mediaState(): Readonly<import("../../foundation/context").ExtractContextRecordTypes<{
        autoplay: import("../../foundation/context").Context<boolean>;
        buffered: import("../../foundation/context").Context<TimeRanges>;
        duration: import("../../foundation/context").Context<number>;
        bufferedAmount: import("../../foundation/context").DerivedContext<number>;
        canRequestFullscreen: import("../../foundation/context").Context<boolean>;
        canPlay: import("../../foundation/context").Context<boolean>;
        canPlayThrough: import("../../foundation/context").Context<boolean>;
        controls: import("../../foundation/context").Context<boolean>;
        currentPoster: import("../../foundation/context").Context<string>;
        currentSrc: import("../../foundation/context").Context<string>;
        currentTime: import("../../foundation/context").Context<number>;
        ended: import("../../foundation/context").Context<boolean>;
        error: import("../../foundation/context").Context<unknown>;
        fullscreen: import("../../foundation/context").Context<boolean>;
        loop: import("../../foundation/context").Context<boolean>;
        live: import("../../foundation/context").DerivedContext<boolean>;
        mediaType: import("../../foundation/context").Context<string>;
        isAudio: import("../../foundation/context").DerivedContext<boolean>;
        isVideo: import("../../foundation/context").DerivedContext<boolean>;
        isLiveVideo: import("../../foundation/context").DerivedContext<boolean>;
        muted: import("../../foundation/context").Context<boolean>;
        paused: import("../../foundation/context").Context<boolean>;
        played: import("../../foundation/context").Context<TimeRanges>;
        playing: import("../../foundation/context").Context<boolean>;
        playsinline: import("../../foundation/context").Context<boolean>;
        seekable: import("../../foundation/context").Context<TimeRanges>;
        seekableAmount: import("../../foundation/context").DerivedContext<number>;
        seeking: import("../../foundation/context").Context<boolean>;
        started: import("../../foundation/context").Context<boolean>;
        viewType: import("../../foundation/context").Context<string>;
        isAudioView: import("../../foundation/context").DerivedContext<boolean>;
        isVideoView: import("../../foundation/context").DerivedContext<boolean>;
        volume: import("../../foundation/context").Context<number>;
        waiting: import("../../foundation/context").Context<boolean>;
    }>>;
    /**
     * Returns a `TimeRanges` object that indicates the ranges of the media source that the
     * browser has buffered (if any) at the moment the buffered property is accessed. This is usually
     * contiguous but if the user jumps about while media is buffering, it may contain holes.
     *
     * @type {TimeRanges}
     * @link https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered
     * @default TimeRanges
     */
    get buffered(): TimeRanges;
    /**
     * Whether the user agent can play the media, but estimates that **not enough** data has been
     * loaded to play the media up to its end without having to stop for further buffering of
     * content.
     *
     * @type {boolean}
     * @default false
     */
    get canPlay(): boolean;
    /**
     * Whether the user agent can play the media, and estimates that enough data has been
     * loaded to play the media up to its end without having to stop for further buffering
     * of content.
     *
     * @type {boolean}
     * @default false
     */
    get canPlayThrough(): boolean;
    /**
     * The URL of the current poster. Defaults to `''` if no media/poster has been given or
     * loaded.
     *
     * @type {string}
     */
    get currentPoster(): string;
    /**
     * The absolute URL of the media resource that has been chosen. Defaults to `''` if no
     * media has been loaded.
     *
     * @type {string}
     * @default ''
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentSrc
     */
    get currentSrc(): string;
    /**
     * A `double` indicating the total playback length of the media in seconds. If no media data is
     * available, the returned value is `NaN`. If the media is of indefinite length (such as
     * streamed live media, a WebRTC call's media, or similar), the value is `+Infinity`.
     *
     * @type {number}
     * @default NaN
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration
     */
    get duration(): number;
    /**
     * Whether media playback has reached the end. In other words it'll be true
     * if `currentTime === duration`.
     *
     * @type {boolean}
     * @default false
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended
     */
    get ended(): boolean;
    /**
     * Contains the most recent error or undefined if there's been none. You can listen for
     * `vds-error` event updates and examine this object to debug further. The error could be a
     * native `MediaError` object or something else.
     *
     * @type {unknown}
     * @default undefined
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error
     */
    get error(): unknown;
    /**
     * Whether the current media is a live stream.
     *
     * @type {boolean}
     */
    get live(): boolean;
    /**
     * The type of media that is currently active, whether it's audio or video. Defaults
     * to `unknown` when no media has been loaded or the type cannot be determined.
     *
     * @type {MediaType}
     * @default MediaType.Unknown
     */
    get mediaType(): string;
    /**
     * Contains the ranges of the media source that the browser has played, if any.
     *
     * @type {TimeRanges}
     * @default TimeRanges
     */
    get played(): TimeRanges;
    /**
     * Whether media is actively playing back. Defaults to `false` if no media has
     * loaded or playback has not started.
     *
     * @type {boolean}
     * @default false
     */
    get playing(): boolean;
    /**
     * Contains the time ranges that the user is able to seek to, if any. This tells us which parts
     * of the media can be played without delay; this is irrespective of whether that part has
     * been downloaded or not.
     *
     * Some parts of the media may be seekable but not buffered if byte-range
     * requests are enabled on the server. Byte range requests allow parts of the media file to
     * be delivered from the server and so can be ready to play almost immediately — thus they are
     * seekable.
     *
     * @type {TimeRanges}
     * @default TimeRanges
     * @link https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seekable
     */
    get seekable(): TimeRanges;
    /**
     * Whether media is actively seeking to an new playback position.
     *
     * @type {boolean}
     * @default false
     */
    get seeking(): boolean;
    /**
     * Whether media playback has started. In other words it will be true if `currentTime > 0`.
     *
     * @type {boolean}
     * @default false
     */
    get started(): boolean;
    /**
     * The type of player view that is being used, whether it's an audio player view or
     * video player view. Normally if the media type is of audio then the view is of type audio, but
     * in some cases it might be desirable to show a different view type. For example, when playing
     * audio with a poster. This is subject to the provider allowing it. Defaults to `unknown`
     * when no media has been loaded.
     *
     * @type {ViewType}
     * @default ViewType.Unknown
     */
    get viewType(): string;
    /**
     * Whether playback has temporarily stopped because of a lack of temporary data.
     *
     * @type {boolean}
     * @default false
     */
    get waiting(): boolean;
    /**
     * Determines if the media provider can play the given `type`. The `type` is
     * generally the media resource identifier, URL or MIME type (optional Codecs parameter).
     *
     * @abstract
     * @param {string} type
     * @returns {CanPlay}
     * @example `audio/mp3`
     * @example `video/mp4`
     * @example `video/webm; codecs="vp8, vorbis"`
     * @example `/my-audio-file.mp3`
     * @example `youtube/RO7VcUAsf-I`
     * @example `vimeo.com/411652396`
     * @example `https://www.youtube.com/watch?v=OQoz7FCWkfU`
     * @example `https://media.vidstack.io/hls/index.m3u8`
     * @example `https://media.vidstack.io/dash/index.mpd`
     * @link https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter
     */
    canPlayType(type: string): CanPlay;
    /**
     * Determines if the media provider "should" play the given type. "Should" in this
     * context refers to the `canPlayType()` method returning `Maybe` or `Probably`.
     *
     * @param {string} type refer to `canPlayType`.
     * @returns {boolean}
     */
    shouldPlayType(type: string): boolean;
    /**
     * Begins/resumes playback of the media. If this method is called programmatically before the
     * user has interacted with the player, the promise may be rejected subject to the browser's
     * autoplay policies.
     *
     * @abstract
     * @returns {Promise<void>}
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
     */
    play(): Promise<void>;
    /**
     * Pauses playback of the media.
     *
     * @abstract
     * @returns {Promise<void>}
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause
     */
    pause(): Promise<void>;
    /**
     * @protected
     * @throws {Error} - Will throw if media is not ready for playback.
     */
    protected throwIfNotReadyForPlayback(): void;
    /**
     * @protected
     * @returns {boolean}
     */
    protected hasPlaybackRoughlyEnded(): boolean;
    /**
     * Call if you suspect that playback might have resumed/ended again.
     *
     * @protected
     */
    protected validatePlaybackEndedState(): void;
    /**
     * @protected
     * @returns {Promise<void>}
     */
    protected resetPlayback(): Promise<void>;
    /**
     * @protected
     * @returns {Promise<void>}
     */
    protected resetPlaybackIfEnded(): Promise<void>;
    /**
     * @protected
     * @throws {Error} - Will throw if player is not in a video view.
     */
    protected throwIfNotVideoView(): void;
    /**
     * @protected
     * @param {Event} [event]
     */
    protected handleMediaReady(event?: Event | undefined): void;
    /**
     * @protected
     */
    protected handleMediaSrcChange(): void;
    /**
     * Any property updated inside this object will trigger a context update. The media controller
     * will provide (inject) the context record to be managed by this media provider. Any updates here
     * will flow down from the media controller to all components.
     *
     * If there's no media controller then this will be a plain JS object that's used to keep
     * track of media state.
     *
     * @readonly
     * @internal
     */
    readonly context: import("../../foundation/context").ExtractContextRecordTypes<import("../../utils.js").ReadonlyIfType<import("../../foundation/context").DerivedContext<any>, {
        autoplay: import("../../foundation/context").Context<boolean>;
        buffered: import("../../foundation/context").Context<TimeRanges>;
        duration: import("../../foundation/context").Context<number>;
        bufferedAmount: import("../../foundation/context").DerivedContext<number>;
        canRequestFullscreen: import("../../foundation/context").Context<boolean>;
        canPlay: import("../../foundation/context").Context<boolean>;
        canPlayThrough: import("../../foundation/context").Context<boolean>;
        controls: import("../../foundation/context").Context<boolean>;
        currentPoster: import("../../foundation/context").Context<string>;
        currentSrc: import("../../foundation/context").Context<string>;
        currentTime: import("../../foundation/context").Context<number>;
        ended: import("../../foundation/context").Context<boolean>;
        error: import("../../foundation/context").Context<unknown>;
        fullscreen: import("../../foundation/context").Context<boolean>;
        loop: import("../../foundation/context").Context<boolean>;
        live: import("../../foundation/context").DerivedContext<boolean>;
        mediaType: import("../../foundation/context").Context<string>;
        isAudio: import("../../foundation/context").DerivedContext<boolean>;
        isVideo: import("../../foundation/context").DerivedContext<boolean>;
        isLiveVideo: import("../../foundation/context").DerivedContext<boolean>;
        muted: import("../../foundation/context").Context<boolean>;
        paused: import("../../foundation/context").Context<boolean>;
        played: import("../../foundation/context").Context<TimeRanges>;
        playing: import("../../foundation/context").Context<boolean>;
        playsinline: import("../../foundation/context").Context<boolean>;
        seekable: import("../../foundation/context").Context<TimeRanges>;
        seekableAmount: import("../../foundation/context").DerivedContext<number>;
        seeking: import("../../foundation/context").Context<boolean>;
        started: import("../../foundation/context").Context<boolean>;
        viewType: import("../../foundation/context").Context<string>;
        isAudioView: import("../../foundation/context").DerivedContext<boolean>;
        isVideoView: import("../../foundation/context").DerivedContext<boolean>;
        volume: import("../../foundation/context").Context<number>;
        waiting: import("../../foundation/context").Context<boolean>;
    }>>;
    /**
     * Media context properties that should be reset when media is changed. Override this
     * to include additional properties.
     *
     * @protected
     * @returns {Set<string>}
     */
    protected getMediaPropsToResetWhenSrcChanges(): Set<string>;
    /**
     * When the `currentSrc` is changed this method is called to update any context properties
     * that need to be reset. Important to note that not all properties are reset, only the
     * properties returned from `getSoftResettableMediaContextProps()`.
     *
     * @protected
     */
    protected softResetMediaContext(): void;
    /**
     * Queue actions to be applied safely after the element has connected to the DOM.
     *
     * @protected
     * @readonly
     */
    protected readonly connectedQueue: RequestQueue<string | symbol, () => void | Promise<void>>;
    /**
     * Queue actions to be taken on the current media provider when it's ready for playback, marked
     * by the `canPlay` property. If the media provider is ready, actions will be invoked immediately.
     *
     * @readonly
     */
    readonly mediaRequestQueue: RequestQueue<string | symbol, () => void | Promise<void>>;
    /**
     * @readonly
     */
    readonly screenOrientationController: ScreenOrientationController;
    /**
     * @readonly
     */
    readonly fullscreenController: FullscreenController;
    /**
     * Whether the native browser fullscreen API is available, or the current provider can
     * toggle fullscreen mode. This does not mean that the operation is guaranteed to be successful,
     * only that it can be attempted.
     *
     * @type {boolean}
     * @default false
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
     */
    get canRequestFullscreen(): boolean;
    /**
     * Whether the player is currently in fullscreen mode.
     *
     * @type {boolean}
     * @default false
     */
    get fullscreen(): boolean;
    set fullscreenOrientation(arg: string | undefined);
    /**
     * This will indicate the orientation to lock the screen to when in fullscreen mode and
     * the Screen Orientation API is available. The default is `undefined` which indicates
     * no screen orientation change.
     *
     * @attribute fullscreen-orientation
     * @type {ScreenOrientationLock | undefined}
     */
    get fullscreenOrientation(): string | undefined;
    /** @returns {Promise<void>} */
    exitFullscreen(): Promise<void>;
    /**
     * @protected
     * @param {FullscreenChangeEvent} event
     */
    protected handleFullscreenChange(event: FullscreenChangeEvent): void;
}
import { DiscoveryEvent } from "../../foundation/elements/discovery/events.js";
import { LitElement } from "lit-element/lit-element";
import { ElementDisposalController } from "../../foundation/elements/ElementDisposalController.js";
import { ElementDiscoveryController } from "../../foundation/elements/discovery/ElementDiscoveryController.js";
import { FullscreenChangeEvent } from "../../foundation/fullscreen/events.js";
import { EventListenerController } from "../../foundation/events/EventListenerController.js";
import { CanPlay } from "../CanPlay.js";
import { RequestQueue } from "../../foundation/queue/RequestQueue.js";
import { ScreenOrientationController } from "../../foundation/screen-orientation/ScreenOrientationController.js";
import { FullscreenController } from "../../foundation/fullscreen/FullscreenController.js";
