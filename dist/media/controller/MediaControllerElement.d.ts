export const MEDIA_CONTROLLER_ELEMENT_TAG_NAME: "vds-media-controller";
/**
 * Fired when the media controller connects to the DOM.
 *
 * @bubbles
 * @composed
 * @augments {DiscoveryEvent<MediaControllerElement>}
 */
export class MediaControllerConnectEvent extends DiscoveryEvent<MediaControllerElement> {
    /** @readonly */
    static readonly TYPE: "vds-media-controller-connect";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<import("../../foundation/elements/index.js").DiscoveryEventDetail<MediaControllerElement>> | undefined, type?: string | undefined, final?: boolean | undefined);
}
declare const MediaControllerElement_base: typeof LitElement & import("../../utils.js").Constructor<import("./types.js").MediaProviderBridge>;
/**
 * The media controller acts as a message bus between the media provider and all other
 * components, such as UI components. The main responsibilities are:
 *
 * - Provide the media context that is used to pass media state down to components (this
 * context is injected into and managed by the media provider).
 *
 * - Listen for media request events and fulfill them by calling the appropriate props/methods on
 * the current media provider.
 *
 * - Act as a proxy for the connected media provider element. As a proxy it will forward
 * attributes, properties, methods and events to/from the provider.
 *
 * @tagname vds-media-controller
 * @slot Used to pass in components that use/manage media state.
 * @example
 * ```html
 * <vds-media-controller>
 *   <vds-media-container>
 *     <vds-video
 *       src="/media/video.mp4"
 *       poster="/media/poster.png"
 *     >
 *       <!-- ... -->
 *     </vds-video>
 *
 *     <!-- UI components here. -->
 *   </vds-media-container>
 *
 *   <!-- Other components that use/manage media state here. -->
 * </vds-media-controller>
 * ```
 */
export class MediaControllerElement extends MediaControllerElement_base {
    /** @type {import('lit').CSSResultGroup} */
    static get styles(): import("lit").CSSResultGroup;
    /**
     * @protected
     * @readonly
     */
    protected readonly discoveryController: ElementDiscoveryController<MediaControllerElement>;
    /**
     * @protected
     * @readonly
     */
    protected readonly eventListenerController: EventListenerController<{
        "vds-media-container-connect": (event: MediaContainerConnectEvent) => void;
        "vds-mute-request": (event: MuteRequestEvent) => void;
        "vds-unmute-request": (event: UnmuteRequestEvent) => void;
        "vds-play-request": (event: PlayRequestEvent) => void;
        "vds-pause-request": (event: PauseRequestEvent) => void;
        "vds-seeking-request": (event: SeekRequestEvent) => void;
        "vds-seek-request": (event: SeekRequestEvent) => void;
        "vds-volume-change-request": (event: VolumeChangeRequestEvent) => void;
        "vds-enter-fullscreen-request": (event: EnterFullscreenRequestEvent) => Promise<void>;
        "vds-exit-fullscreen-request": (event: ExitFullscreenRequestEvent) => Promise<void>;
    }>;
    /**
     * @readonly
     */
    readonly controlsManager: ControlsManager;
    /**
     * @readonly
     */
    readonly idleObserver: IdleObserver;
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
        /**
         * @protected
         * @readonly
         */
        viewType: import("../../foundation/context").Context<string>;
        isAudioView: import("../../foundation/context").DerivedContext<boolean>;
        isVideoView: import("../../foundation/context").DerivedContext<boolean>;
        volume: import("../../foundation/context").Context<number>;
        waiting: import("../../foundation/context").Context<boolean>;
    }>>;
    /**
     * @protected
     * @type {MediaContainerElement | undefined}
     */
    protected _mediaContainer: MediaContainerElement | undefined;
    /**
     * The current media container that belongs to this controller. Defaults to `undefined` if
     * there is none.
     *
     * @type {MediaContainerElement | undefined}
     */
    get mediaContainer(): MediaContainerElement | undefined;
    /**
     * @protected
     * @param {MediaContainerConnectEvent} event
     */
    protected handleMediaContainerConnect(event: MediaContainerConnectEvent): void;
    /**
     * @protected
     */
    protected handleMediaContainerDisconnect(): void;
    /**
     * Override this to allow media events to bubble up the DOM.
     *
     * @protected
     * @param {Event} event
     */
    protected mediaRequestEventGateway(event: Event): void;
    /**
     * @protected
     * @param {MuteRequestEvent} event
     */
    protected handleMuteRequest(event: MuteRequestEvent): void;
    /**
     * @protected
     * @param {UnmuteRequestEvent} event
     */
    protected handleUnmuteRequest(event: UnmuteRequestEvent): void;
    /**
     * @protected
     * @param {PlayRequestEvent} event
     */
    protected handlePlayRequest(event: PlayRequestEvent): void;
    /**
     * @protected
     * @param {PauseRequestEvent} event
     */
    protected handlePauseRequest(event: PauseRequestEvent): void;
    /**
     * @protected
     * @param {SeekRequestEvent} event
     */
    protected handleSeekingRequest(event: SeekRequestEvent): void;
    /**
     * @protected
     * @param {SeekRequestEvent} event
     */
    protected handleSeekRequest(event: SeekRequestEvent): void;
    /**
     * @protected
     * @param {VolumeChangeRequestEvent} event
     */
    protected handleVolumeChangeRequest(event: VolumeChangeRequestEvent): void;
    /**
     * @protected
     * @param {EnterFullscreenRequestEvent} event
     * @returns {Promise<void>}
     */
    protected handleEnterFullscreenRequest(event: EnterFullscreenRequestEvent): Promise<void>;
    /**
     * @protected
     * @param {ExitFullscreenRequestEvent} event
     * @returns {Promise<void>}
     */
    protected handleExitFullscreenRequest(event: ExitFullscreenRequestEvent): Promise<void>;
}
import { DiscoveryEvent } from "../../foundation/elements/discovery/events.js";
import { LitElement } from "lit-element/lit-element";
import { ElementDiscoveryController } from "../../foundation/elements/discovery/ElementDiscoveryController.js";
import { MediaContainerConnectEvent } from "../container/MediaContainerElement.js";
import { MuteRequestEvent } from "../request.events.js";
import { UnmuteRequestEvent } from "../request.events.js";
import { PlayRequestEvent } from "../request.events.js";
import { PauseRequestEvent } from "../request.events.js";
import { SeekRequestEvent } from "../request.events.js";
import { VolumeChangeRequestEvent } from "../request.events.js";
import { EnterFullscreenRequestEvent } from "../request.events.js";
import { ExitFullscreenRequestEvent } from "../request.events.js";
import { EventListenerController } from "../../foundation/events/EventListenerController.js";
import { ControlsManager } from "../controls/ControlsManager.js";
import { IdleObserver } from "../controls/IdleObserver.js";
import { MediaContainerElement } from "../container/MediaContainerElement.js";
export {};
