import { __decorate } from 'tslib';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { createRef } from 'lit/directives/ref.js';
import { listen, redispatchEvent } from '../../foundation/events/index.js';
import {
  AbortEvent,
  CanPlay,
  CanPlayThroughEvent,
  DurationChangeEvent,
  EmptiedEvent,
  EndedEvent,
  ErrorEvent,
  LoadedDataEvent,
  LoadedMetadataEvent,
  LoadStartEvent,
  MediaProviderElement,
  MediaType,
  MediaTypeChangeEvent,
  PauseEvent,
  PlayEvent,
  PlayingEvent,
  ProgressEvent,
  ReplayEvent,
  SeekedEvent,
  SeekingEvent,
  StalledEvent,
  StartedEvent,
  SuspendEvent,
  TimeUpdateEvent,
  VolumeChangeEvent,
  WaitingEvent
} from '../../media/index.js';
import { getSlottedChildren } from '../../utils/dom.js';
import { IS_SAFARI } from '../../utils/support.js';
import { isNil, isNumber, isUndefined } from '../../utils/unit.js';
export const AUDIO_EXTENSIONS =
  /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
export const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i;
/**
 * A DOMString` indicating the `CORS` setting for this media element.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
 * @typedef {'anonymous' | 'use-credentials'} MediaCrossOriginOption
 */
/**
 * Is a `DOMString` that reflects the `preload` HTML attribute, indicating what data should be
 * preloaded, if any.
 *
 * @typedef {'none' | 'metadata' | 'auto'} MediaPreloadOption
 */
/**
 * `DOMTokenList` that helps the user agent select what controls to show on the media element
 * whenever the user agent shows its own set of controls. The `DOMTokenList` takes one or more of
 * three possible values: `nodownload`, `nofullscreen`, and `noremoteplayback`.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList
 * @typedef {'nodownload'
 *  | 'nofullscreen'
 *  | 'noremoteplayback'
 *  | 'nodownload nofullscreen'
 *  | 'nodownload noremoteplayback'
 *  | 'nofullscreen noremoteplayback'
 *  | 'nodownload nofullscreen noremoteplayback'
 * } MediaControlsList
 */
/**
 * The object which serves as the source of the media associated with the `HTMLMediaElement`. The
 * object can be a `MediaStream`, `MediaSource`, `Blob`, or `File` (which inherits from `Blob`).
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaSource
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Blob
 * @link https://developer.mozilla.org/en-US/docs/Web/API/File
 * @typedef {MediaStream | MediaSource | Blob | File} MediaSrcObject
 */
/**
 * Enables loading, playing and controlling media files via the HTML5 MediaElement API. This is
 * used internally by the `vds-audio` and `vds-video` components. This provider only contains
 * glue code so don't bother using it on it's own.
 *
 * @slot Pass `<source>` and `<track>` elements to the underlying HTML5 media player.
 */
export class Html5MediaElement extends MediaProviderElement {
  constructor() {
    super(...arguments);
    // -------------------------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------------------------
    /**
     * Determines what controls to show on the media element whenever the browser shows its own set
     * of controls (e.g. when the controls attribute is specified).
     *
     * @example 'nodownload nofullscreen noremoteplayback'
     * @type {MediaControlsList | undefined}
     * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList
     */
    this.controlsList = undefined;
    /**
     * @protected
     * @type {string}
     */
    this._src = '';
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<HTMLMediaElement>}
     */
    this.mediaRef = createRef();
    // -------------------------------------------------------------------------------------------
    // Time Updates
    // The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
    // bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
    // resolve that :)
    // -------------------------------------------------------------------------------------------
    /**
     * @protected
     * @type {number}
     */
    this.timeRAF = -1;
  }
  /** @type {string[]} */
  static get events() {
    return [
      ...MediaProviderElement.events.map((event) =>
        // vds-can-play => canplay
        event.slice(4).replace('-', '')
      ),
      ...super.events
    ];
  }
  /**
   * The URL of a media resource to use.
   *
   * @type {string}
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src
   */
  get src() {
    return this._src;
  }
  set src(newSrc) {
    if (this._src !== newSrc) {
      this._src = newSrc;
      this.handleMediaSrcChange();
      // No other action requried as the `src` attribute should be updated on the underlying
      // `<audio>` or `<video>` element.
    }
  }
  /** @type {HTMLMediaElement} */
  get mediaElement() {
    return /** @type {HTMLMediaElement} */ (this.mediaRef.value);
  }
  /**
   * Sets or returns the object which serves as the source of the media associated with the
   * `HTMLMediaElement`.
   *
   * @type {MediaSrcObject | undefined}
   * @default undefined
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
   */
  get srcObject() {
    var _a;
    return (_a = this.mediaElement.srcObject) !== null && _a !== void 0
      ? _a
      : undefined;
  }
  set srcObject(newSrcObject) {
    if (this.mediaElement.srcObject !== newSrcObject) {
      this.mediaElement.srcObject =
        newSrcObject !== null && newSrcObject !== void 0 ? newSrcObject : null;
      if (!this.willAnotherEngineAttach()) this.mediaElement.load();
      this.handleMediaSrcChange();
    }
  }
  /**
   * Indicates the readiness state of the media.
   *
   * @type {MediaReadyState}
   * @default ReadyState.HaveNothing
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
   */
  get readyState() {
    return this.mediaElement.readyState;
  }
  /**
   * Indicates the current state of the fetching of media over the network.
   *
   * @type {MediaNetworkState}
   * @default NetworkState.Empty
   */
  get networkState() {
    return this.mediaElement.networkState;
  }
  // -------------------------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------------------------
  /**
   * @protected
   * @param {import('lit').PropertyValues} changedProps
   */
  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    this.bindMediaEventListeners();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.cancelTimeUpdates();
  }
  // -------------------------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------------------------
  /**
   * Override this to modify the content rendered inside `<audio>` and `<video>` elements.
   *
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderMediaChildren() {
    return html`
      <slot @slotchange="${this.handleDefaultSlotChange}"></slot>
      Your browser does not support the <code>audio</code> or
      <code>video</code> element.
    `;
  }
  /**
   * @protected
   */
  cancelTimeUpdates() {
    if (isNumber(this.timeRAF)) window.cancelAnimationFrame(this.timeRAF);
    this.timeRAF = -1;
  }
  /**
   * @protected
   */
  requestTimeUpdates() {
    const newTime = this.mediaElement.currentTime;
    if (this.context.currentTime !== newTime) {
      this.context.currentTime = newTime;
      this.dispatchEvent(new TimeUpdateEvent({ detail: newTime }));
    }
    this.timeRAF = window.requestAnimationFrame(() => {
      if (isUndefined(this.timeRAF)) return;
      this.requestTimeUpdates();
    });
  }
  // -------------------------------------------------------------------------------------------
  // Slots
  // -------------------------------------------------------------------------------------------
  /**
   * @protected
   */
  handleDefaultSlotChange() {
    if (isNil(this.mediaElement)) return;
    this.cancelTimeUpdates();
    this.cleanupOldSourceNodes();
    this.attachNewSourceNodes();
  }
  /**
   * @protected
   */
  cleanupOldSourceNodes() {
    var _a;
    const nodes =
      (_a = this.mediaElement) === null || _a === void 0
        ? void 0
        : _a.querySelectorAll('source,track');
    nodes === null || nodes === void 0
      ? void 0
      : nodes.forEach((node) => node.remove());
  }
  /**
   * @protected
   */
  attachNewSourceNodes() {
    const validTags = new Set(['source', 'track']);
    getSlottedChildren(this)
      .filter((node) => validTags.has(node.tagName.toLowerCase()))
      .forEach((node) => {
        var _a;
        return (_a = this.mediaElement) === null || _a === void 0
          ? void 0
          : _a.appendChild(node.cloneNode());
      });
    window.requestAnimationFrame(() => {
      var _a;
      this.handleMediaSrcChange();
      if (!this.willAnotherEngineAttach())
        (_a = this.mediaElement) === null || _a === void 0 ? void 0 : _a.load();
    });
  }
  // -------------------------------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------------------------------
  /**
   * @protected
   */
  bindMediaEventListeners() {
    if (isNil(this.mediaElement)) return;
    const events = {
      abort: this.handleAbort,
      canplay: this.handleCanPlay,
      canplaythrough: this.handleCanPlayThrough,
      durationchange: this.handleDurationChange,
      emptied: this.handleEmptied,
      ended: this.handleEnded,
      error: this.handleError,
      loadeddata: this.handleLoadedData,
      loadedmetadata: this.handleLoadedMetadata,
      loadstart: this.handleLoadStart,
      pause: this.handlePause,
      play: this.handlePlay,
      playing: this.handlePlaying,
      progress: this.handleProgress,
      ratechange: this.handleRateChange,
      seeked: this.handleSeeked,
      seeking: this.handleSeeking,
      stalled: this.handleStalled,
      suspend: this.handleSuspend,
      timeupdate: this.handleTimeUpdate,
      volumechange: this.handleVolumeChange,
      waiting: this.handleWaiting
    };
    Object.keys(events).forEach((type) => {
      const handler = events[type].bind(this);
      this.disconnectDisposal.add(
        listen(this.mediaElement, type, (e) => {
          handler(e);
          // re-dispatch native event for spec-compliance.
          redispatchEvent(this, e);
        })
      );
    });
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleAbort(event) {
    this.dispatchEvent(new AbortEvent({ originalEvent: event }));
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleCanPlay(event) {
    this.context.buffered = this.mediaElement.buffered;
    this.context.seekable = this.mediaElement.seekable;
    if (!this.willAnotherEngineAttach()) this.handleMediaReady(event);
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleCanPlayThrough(event) {
    this.context.canPlayThrough = true;
    this.dispatchEvent(new CanPlayThroughEvent({ originalEvent: event }));
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleLoadStart(event) {
    this.context.currentSrc = this.mediaElement.currentSrc;
    this.dispatchEvent(new LoadStartEvent({ originalEvent: event }));
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleEmptied(event) {
    this.dispatchEvent(new EmptiedEvent({ originalEvent: event }));
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleLoadedData(event) {
    this.dispatchEvent(new LoadedDataEvent({ originalEvent: event }));
  }
  /**
   * Can be used to indicate another engine such as `hls.js` will attach to the media element
   * so it can handle certain ready events.
   *
   * @protected
   * @returns {boolean}
   */
  willAnotherEngineAttach() {
    return false;
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleLoadedMetadata(event) {
    this.context.duration = this.mediaElement.duration;
    this.dispatchEvent(
      new DurationChangeEvent({
        detail: this.context.duration,
        originalEvent: event
      })
    );
    this.dispatchEvent(new LoadedMetadataEvent({ originalEvent: event }));
    this.determineMediaType(event);
  }
  /**
   * @protected
   * @param {Event} event
   */
  determineMediaType(event) {
    this.context.mediaType = this.getMediaType();
    this.dispatchEvent(
      new MediaTypeChangeEvent({
        detail: this.context.mediaType,
        originalEvent: event
      })
    );
  }
  /**
   * @protected
   * @param {Event} event
   */
  handlePlay(event) {
    this.requestTimeUpdates();
    this.context.paused = false;
    this.dispatchEvent(new PlayEvent({ originalEvent: event }));
    if (this.context.ended) this.dispatchEvent(new ReplayEvent());
    if (!this.context.started) {
      this.context.started = true;
      this.dispatchEvent(new StartedEvent({ originalEvent: event }));
    }
    this.validatePlaybackEndedState();
  }
  /**
   * @protected
   * @param {Event} event
   */
  handlePause(event) {
    this.cancelTimeUpdates();
    this.context.paused = true;
    this.context.playing = false;
    this.context.waiting = false;
    this.dispatchEvent(new PauseEvent({ originalEvent: event }));
  }
  /**
   * @protected
   * @param {Event} event
   */
  handlePlaying(event) {
    this.context.playing = true;
    this.context.waiting = false;
    this.dispatchEvent(new PlayingEvent({ originalEvent: event }));
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleDurationChange(event) {
    this.context.duration = this.mediaElement.duration;
    this.dispatchEvent(
      new DurationChangeEvent({
        detail: this.context.duration,
        originalEvent: event
      })
    );
    this.validatePlaybackEndedState();
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleProgress(event) {
    this.context.buffered = this.mediaElement.buffered;
    this.context.seekable = this.mediaElement.seekable;
    this.dispatchEvent(new ProgressEvent({ originalEvent: event }));
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleRateChange(event) {
    // TODO: no-op for now but we'll add playback rate support later.
    throw Error('Not implemented');
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleSeeked(event) {
    this.context.currentTime = this.mediaElement.currentTime;
    this.context.seeking = false;
    this.dispatchEvent(
      new SeekedEvent({
        detail: this.context.currentTime,
        originalEvent: event
      })
    );
    this.validatePlaybackEndedState();
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleSeeking(event) {
    this.context.currentTime = this.mediaElement.currentTime;
    this.context.seeking = true;
    this.dispatchEvent(
      new SeekingEvent({
        detail: this.context.currentTime,
        originalEvent: event
      })
    );
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleStalled(event) {
    this.dispatchEvent(new StalledEvent({ originalEvent: event }));
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleTimeUpdate(event) {
    // -- Time updates are performed in `requestTimeUpdates()`.
    this.context.waiting = false;
    this.validatePlaybackEndedState();
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleVolumeChange(event) {
    this.context.volume = this.mediaElement.volume;
    this.context.muted = this.mediaElement.muted;
    this.dispatchEvent(
      new VolumeChangeEvent({
        detail: {
          volume: this.context.volume,
          muted: this.context.muted
        },
        originalEvent: event
      })
    );
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleWaiting(event) {
    this.context.waiting = true;
    this.dispatchEvent(new WaitingEvent({ originalEvent: event }));
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleSuspend(event) {
    this.context.waiting = false;
    this.dispatchEvent(new SuspendEvent({ originalEvent: event }));
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleEnded(event) {
    // Check becuase might've been handled in `validatePlaybackEnded()`.
    if (!this.context.ended && !this.loop) {
      this.context.ended = true;
      this.context.waiting = false;
      this.dispatchEvent(new EndedEvent({ originalEvent: event }));
      this.cancelTimeUpdates();
    } else if (this.loop) {
      this.dispatchEvent(new ReplayEvent({ originalEvent: event }));
    }
  }
  /**
   * @protected
   * @param {Event} event
   */
  handleError(event) {
    this.context.error = this.mediaElement.error;
    this.dispatchEvent(
      new ErrorEvent({
        detail: this.mediaElement.error,
        originalEvent: event
      })
    );
  }
  // -------------------------------------------------------------------------------------------
  // Provider Methods
  // -------------------------------------------------------------------------------------------
  /**
   * @protected
   * @returns {boolean}
   */
  getPaused() {
    return this.mediaElement.paused;
  }
  /**
   * @protected
   * @returns {number}
   */
  getVolume() {
    return this.mediaElement.volume;
  }
  /**
   * @protected
   * @param {number} newVolume
   */
  setVolume(newVolume) {
    this.mediaElement.volume = newVolume;
  }
  /**
   * @protected
   * @returns {number}
   */
  getCurrentTime() {
    return this.mediaElement.currentTime;
  }
  /**
   * @protected
   * @param {number} newTime
   */
  setCurrentTime(newTime) {
    if (this.mediaElement.currentTime !== newTime) {
      this.mediaElement.currentTime = newTime;
      // Doesn't fire `seeked` near end.
      if (IS_SAFARI) this.validatePlaybackEndedState();
    }
  }
  /**
   * @protected
   * @returns {boolean}
   */
  getMuted() {
    return this.mediaElement.muted;
  }
  /**
   * @protected
   * @param {boolean} isMuted
   */
  setMuted(isMuted) {
    this.mediaElement.muted = isMuted;
  }
  // -------------------------------------------------------------------------------------------
  // Readonly Properties
  // -------------------------------------------------------------------------------------------
  get engine() {
    return this.mediaElement;
  }
  get buffered() {
    if (isNil(this.mediaElement)) return new TimeRanges();
    return this.mediaElement.buffered;
  }
  /**
   * Returns a `MediaError` object for the most recent error, or `undefined` if there has not been
   * an error.
   *
   * @type {unknown}
   * @default undefined
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error
   */
  get error() {
    var _a, _b;
    return (_b =
      (_a = this.mediaElement) === null || _a === void 0
        ? void 0
        : _a.error) !== null && _b !== void 0
      ? _b
      : undefined;
  }
  // -------------------------------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------------------------------
  /**
   * @param {string} type
   * @returns {CanPlay}
   */
  canPlayType(type) {
    if (isNil(this.mediaElement)) {
      return CanPlay.No;
    }
    return this.mediaElement.canPlayType(type);
  }
  async play() {
    this.throwIfNotReadyForPlayback();
    if (this.context.ended) this.dispatchEvent(new ReplayEvent());
    await this.resetPlaybackIfEnded();
    return this.mediaElement.play();
  }
  async pause() {
    this.throwIfNotReadyForPlayback();
    return this.mediaElement.pause();
  }
  /**
   * 🧑‍🔬 **EXPERIMENTAL:** Returns a `MediaStream` object which is streaming a real-time capture
   * of the content being rendered in the media element. This method will return `undefined`
   * if this API is not available.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/captureStream
   * @returns {MediaStream | undefined}
   */
  captureStream() {
    var _a, _b;
    this.throwIfNotReadyForPlayback();
    return (_b = (_a = this.mediaElement).captureStream) === null ||
      _b === void 0
      ? void 0
      : _b.call(_a);
  }
  /**
   * Resets the media element to its initial state and begins the process of selecting a media
   * source and loading the media in preparation for playback to begin at the beginning. The
   * amount of media data that is prefetched is determined by the value of the element's
   * `preload` attribute.
   *
   * 💡 You should generally not need to call this method as it's handled by the library.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/load
   */
  load() {
    var _a;
    (_a = this.mediaElement) === null || _a === void 0 ? void 0 : _a.load();
  }
  /**
   * @protected
   * @returns {MediaType}
   */
  getMediaType() {
    if (AUDIO_EXTENSIONS.test(this.currentSrc)) {
      return MediaType.Audio;
    }
    if (VIDEO_EXTENSIONS.test(this.currentSrc)) {
      return MediaType.Video;
    }
    return MediaType.Unknown;
  }
}
__decorate([property()], Html5MediaElement.prototype, 'controlsList', void 0);
__decorate([property()], Html5MediaElement.prototype, 'crossOrigin', void 0);
__decorate(
  [property({ type: Boolean })],
  Html5MediaElement.prototype,
  'defaultMuted',
  void 0
);
__decorate(
  [property({ type: Number })],
  Html5MediaElement.prototype,
  'defaultPlaybackRate',
  void 0
);
__decorate(
  [property({ type: Boolean })],
  Html5MediaElement.prototype,
  'disableRemotePlayback',
  void 0
);
__decorate([property()], Html5MediaElement.prototype, 'preload', void 0);
__decorate(
  [property({ type: Number })],
  Html5MediaElement.prototype,
  'width',
  void 0
);
__decorate(
  [property({ type: Number })],
  Html5MediaElement.prototype,
  'height',
  void 0
);
__decorate([state()], Html5MediaElement.prototype, '_src', void 0);
__decorate([property()], Html5MediaElement.prototype, 'src', null);
//# sourceMappingURL=Html5MediaElement.js.map
