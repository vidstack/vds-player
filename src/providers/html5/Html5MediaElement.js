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
import { MediaNetworkState } from './MediaNetworkState.js';
import { MediaReadyState } from './MediaReadyState.js';

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
  @property()
  controlsList = undefined;

  /**
   * Whether to use CORS to fetch the related image. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) for more
   * information.
   *
   * @type {MediaCrossOriginOption | undefined}
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/crossOrigin
   */
  @property()
  crossOrigin;

  /**
   * Reflects the muted attribute, which indicates whether the audio output should be muted by
   * default.  This property has no dynamic effect. To mute and unmute the audio output, use
   * the `muted` property.
   *
   * @type {boolean | undefined}
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/defaultMuted
   */
  @property({ type: Boolean })
  defaultMuted;

  /**
   * A `double` indicating the default playback rate for the media.
   *
   * @type {number | undefined}
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/defaultPlaybackRate
   */
  @property({ type: Number })
  defaultPlaybackRate;

  /**
   *  Whether to disable the capability of remote playback in devices that are
   * attached using wired (HDMI, DVI, etc.) and wireless technologies (Miracast, Chromecast,
   * DLNA, AirPlay, etc).
   *
   * @type {boolean | undefined}
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/disableRemotePlayback
   * @see https://www.w3.org/TR/remote-playback/#the-disableremoteplayback-attribute
   */
  @property({ type: Boolean })
  disableRemotePlayback;

  /**
   * Provides a hint to the browser about what the author thinks will lead to the best user
   * experience with regards to what content is loaded before the video is played. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload) for more
   * information.
   *
   * @type {MediaPreloadOption | undefined}
   */
  @property()
  preload;

  /**
   * The width of the media player.
   *
   * @type {number | undefined}
   */
  @property({ type: Number })
  width;

  /**
   * The height of the media player.
   *
   * @type {number | undefined}
   */
  @property({ type: Number })
  height;

  /**
   * @protected
   * @type {string}
   */
  @state()
  _src = '';

  /**
   * The URL of a media resource to use.
   *
   * @type {string}
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src
   */
  @property()
  get src() {
    return this._src;
  }

  set src(newSrc) {
    if (this._src !== newSrc) {
      this._src = newSrc;
      this._handleMediaSrcChange();
      // No other action requried as the `src` attribute should be updated on the underlying
      // `<audio>` or `<video>` element.
    }
  }

  /**
   * @protected
   * @readonly
   * @type {import('lit/directives/ref').Ref<HTMLMediaElement>}
   */
  _mediaRef = createRef();

  /** @type {HTMLMediaElement} */
  get mediaElement() {
    return /** @type {HTMLMediaElement} */ (this._mediaRef.value);
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
    return this.mediaElement.srcObject ?? undefined;
  }

  set srcObject(newSrcObject) {
    if (this.mediaElement.srcObject !== newSrcObject) {
      this.mediaElement.srcObject = newSrcObject ?? null;
      if (!this._willAnotherEngineAttach()) this.mediaElement.load();
      this._handleMediaSrcChange();
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
    this._bindMediaEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cancelTimeUpdates();
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
  _renderMediaChildren() {
    return html`
      <slot @slotchange="${this._handleDefaultSlotChange}"></slot>
      Your browser does not support the <code>audio</code> or
      <code>video</code> element.
    `;
  }

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
  _timeRAF = -1;

  /**
   * @protected
   */
  _cancelTimeUpdates() {
    if (isNumber(this._timeRAF)) window.cancelAnimationFrame(this._timeRAF);
    this._timeRAF = -1;
  }

  /**
   * @protected
   */
  _requestTimeUpdates() {
    const newTime = this.mediaElement.currentTime;

    if (this.ctx.currentTime !== newTime) {
      this.ctx.currentTime = newTime;
      this.dispatchEvent(new TimeUpdateEvent({ detail: newTime }));
    }

    this._timeRAF = window.requestAnimationFrame(() => {
      if (isUndefined(this._timeRAF)) return;
      this._requestTimeUpdates();
    });
  }

  // -------------------------------------------------------------------------------------------
  // Slots
  // -------------------------------------------------------------------------------------------

  /**
   * @protected
   */
  _handleDefaultSlotChange() {
    if (isNil(this.mediaElement)) return;
    this._cancelTimeUpdates();
    this._cleanupOldSourceNodes();
    this._attachNewSourceNodes();
  }

  /**
   * @protected
   */
  _cleanupOldSourceNodes() {
    const nodes = this.mediaElement?.querySelectorAll('source,track');
    nodes?.forEach((node) => node.remove());
  }

  /**
   * @protected
   */
  _attachNewSourceNodes() {
    const validTags = new Set(['source', 'track']);

    getSlottedChildren(this)
      .filter((node) => validTags.has(node.tagName.toLowerCase()))
      .forEach((node) => this.mediaElement?.appendChild(node.cloneNode()));

    window.requestAnimationFrame(() => {
      this._handleMediaSrcChange();
      if (!this._willAnotherEngineAttach()) this.mediaElement?.load();
    });
  }

  // -------------------------------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------------------------------

  /**
   * @protected
   */
  _bindMediaEventListeners() {
    if (isNil(this.mediaElement)) return;

    const events = {
      abort: this._handleAbort,
      canplay: this._handleCanPlay,
      canplaythrough: this._handleCanPlayThrough,
      durationchange: this._handleDurationChange,
      emptied: this._handleEmptied,
      ended: this._handleEnded,
      error: this._handleError,
      loadeddata: this._handleLoadedData,
      loadedmetadata: this._handleLoadedMetadata,
      loadstart: this._handleLoadStart,
      pause: this._handlePause,
      play: this._handlePlay,
      playing: this._handlePlaying,
      progress: this._handleProgress,
      ratechange: this._handleRateChange,
      seeked: this._handleSeeked,
      seeking: this._handleSeeking,
      stalled: this._handleStalled,
      suspend: this._handleSuspend,
      timeupdate: this._handleTimeUpdate,
      volumechange: this._handleVolumeChange,
      waiting: this._handleWaiting
    };

    Object.keys(events).forEach((type) => {
      const handler = events[type].bind(this);
      this._disconnectDisposal.add(
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
  _handleAbort(event) {
    this.dispatchEvent(new AbortEvent({ originalEvent: event }));
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleCanPlay(event) {
    this.ctx.buffered = this.mediaElement.buffered;
    this.ctx.seekable = this.mediaElement.seekable;
    if (!this._willAnotherEngineAttach()) this._handleMediaReady(event);
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleCanPlayThrough(event) {
    this.ctx.canPlayThrough = true;
    this.dispatchEvent(new CanPlayThroughEvent({ originalEvent: event }));
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleLoadStart(event) {
    this.ctx.currentSrc = this.mediaElement.currentSrc;
    this.dispatchEvent(new LoadStartEvent({ originalEvent: event }));
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleEmptied(event) {
    this.dispatchEvent(new EmptiedEvent({ originalEvent: event }));
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleLoadedData(event) {
    this.dispatchEvent(new LoadedDataEvent({ originalEvent: event }));
  }

  /**
   * Can be used to indicate another engine such as `hls.js` will attach to the media element
   * so it can handle certain ready events.
   *
   * @protected
   * @returns {boolean}
   */
  _willAnotherEngineAttach() {
    return false;
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleLoadedMetadata(event) {
    this.ctx.duration = this.mediaElement.duration;
    this.dispatchEvent(
      new DurationChangeEvent({
        detail: this.ctx.duration,
        originalEvent: event
      })
    );
    this.dispatchEvent(new LoadedMetadataEvent({ originalEvent: event }));
    this._determineMediaType(event);
  }

  /**
   * @protected
   * @param {Event} event
   */
  _determineMediaType(event) {
    this.ctx.mediaType = this._getMediaType();
    this.dispatchEvent(
      new MediaTypeChangeEvent({
        detail: this.ctx.mediaType,
        originalEvent: event
      })
    );
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handlePlay(event) {
    this._requestTimeUpdates();
    this.ctx.paused = false;
    this.dispatchEvent(new PlayEvent({ originalEvent: event }));
    if (this.ctx.ended) this.dispatchEvent(new ReplayEvent());
    if (!this.ctx.started) {
      this.ctx.started = true;
      this.dispatchEvent(new StartedEvent({ originalEvent: event }));
    }
    this._validatePlaybackEndedState();
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handlePause(event) {
    this._cancelTimeUpdates();
    this.ctx.paused = true;
    this.ctx.playing = false;
    this.ctx.waiting = false;
    this.dispatchEvent(new PauseEvent({ originalEvent: event }));
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handlePlaying(event) {
    this.ctx.playing = true;
    this.ctx.waiting = false;
    this.dispatchEvent(new PlayingEvent({ originalEvent: event }));
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleDurationChange(event) {
    this.ctx.duration = this.mediaElement.duration;
    this.dispatchEvent(
      new DurationChangeEvent({
        detail: this.ctx.duration,
        originalEvent: event
      })
    );
    this._validatePlaybackEndedState();
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleProgress(event) {
    this.ctx.buffered = this.mediaElement.buffered;
    this.ctx.seekable = this.mediaElement.seekable;
    this.dispatchEvent(new ProgressEvent({ originalEvent: event }));
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleRateChange(event) {
    // TODO: no-op for now but we'll add playback rate support later.
    throw Error('Not implemented');
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleSeeked(event) {
    this.ctx.currentTime = this.mediaElement.currentTime;
    this.ctx.seeking = false;
    this.dispatchEvent(
      new SeekedEvent({
        detail: this.ctx.currentTime,
        originalEvent: event
      })
    );
    this._validatePlaybackEndedState();
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleSeeking(event) {
    this.ctx.currentTime = this.mediaElement.currentTime;
    this.ctx.seeking = true;
    this.dispatchEvent(
      new SeekingEvent({
        detail: this.ctx.currentTime,
        originalEvent: event
      })
    );
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleStalled(event) {
    this.dispatchEvent(new StalledEvent({ originalEvent: event }));
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleTimeUpdate(event) {
    // -- Time updates are performed in `requestTimeUpdates()`.
    this.ctx.waiting = false;
    this._validatePlaybackEndedState();
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleVolumeChange(event) {
    this.ctx.volume = this.mediaElement.volume;
    this.ctx.muted = this.mediaElement.muted;
    this.dispatchEvent(
      new VolumeChangeEvent({
        detail: {
          volume: this.ctx.volume,
          muted: this.ctx.muted
        },
        originalEvent: event
      })
    );
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleWaiting(event) {
    this.ctx.waiting = true;
    this.dispatchEvent(new WaitingEvent({ originalEvent: event }));
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleSuspend(event) {
    this.ctx.waiting = false;
    this.dispatchEvent(new SuspendEvent({ originalEvent: event }));
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleEnded(event) {
    // Check becuase might've been handled in `validatePlaybackEnded()`.
    if (!this.ctx.ended && !this.loop) {
      this.ctx.ended = true;
      this.ctx.waiting = false;
      this.dispatchEvent(new EndedEvent({ originalEvent: event }));
      this._cancelTimeUpdates();
    } else if (this.loop) {
      this.dispatchEvent(new ReplayEvent({ originalEvent: event }));
    }
  }

  /**
   * @protected
   * @param {Event} event
   */
  _handleError(event) {
    this.ctx.error = this.mediaElement.error;
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
  _getPaused() {
    return this.mediaElement.paused;
  }

  /**
   * @protected
   * @returns {number}
   */
  _getVolume() {
    return this.mediaElement.volume;
  }

  /**
   * @protected
   * @param {number} newVolume
   */
  _setVolume(newVolume) {
    this.mediaElement.volume = newVolume;
  }

  /**
   * @protected
   * @returns {number}
   */
  _getCurrentTime() {
    return this.mediaElement.currentTime;
  }

  /**
   * @protected
   * @param {number} newTime
   */
  _setCurrentTime(newTime) {
    if (this.mediaElement.currentTime !== newTime) {
      this.mediaElement.currentTime = newTime;
      // Doesn't fire `seeked` near end.
      if (IS_SAFARI) this._validatePlaybackEndedState();
    }
  }

  /**
   * @protected
   * @returns {boolean}
   */
  _getMuted() {
    return this.mediaElement.muted;
  }

  /**
   * @protected
   * @param {boolean} isMuted
   */
  _setMuted(isMuted) {
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
    return this.mediaElement?.error ?? undefined;
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
    this._throwIfNotReadyForPlayback();
    if (this.ctx.ended) this.dispatchEvent(new ReplayEvent());
    await this._resetPlaybackIfEnded();
    return this.mediaElement.play();
  }

  async pause() {
    this._throwIfNotReadyForPlayback();
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
    this._throwIfNotReadyForPlayback();
    return this.mediaElement.captureStream?.();
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
    this.mediaElement?.load();
  }

  /**
   * @protected
   * @returns {MediaType}
   */
  _getMediaType() {
    if (AUDIO_EXTENSIONS.test(this.currentSrc)) {
      return MediaType.Audio;
    }

    if (VIDEO_EXTENSIONS.test(this.currentSrc)) {
      return MediaType.Video;
    }

    return MediaType.Unknown;
  }
}
