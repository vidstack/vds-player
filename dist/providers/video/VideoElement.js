import { __decorate } from 'tslib';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { ifNonEmpty, ifNumber } from '../../foundation/directives/index.js';
import { ViewType, ViewTypeChangeEvent } from '../../media/index.js';
import { Html5MediaElement } from '../html5/index.js';
import { VideoFullscreenController } from './fullscreen/index.js';
import { VideoPresentationController } from './presentation/index.js';
import { videoElementStyles } from './styles.js';
export const VIDEO_ELEMENT_TAG_NAME = 'vds-video';
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
  constructor() {
    super(...arguments);
    // -------------------------------------------------------------------------------------------
    // Fullscreen
    // -------------------------------------------------------------------------------------------
    this.presentationController = new VideoPresentationController(this);
    this.fullscreenController = new VideoFullscreenController(
      this,
      this.screenOrientationController,
      this.presentationController
    );
  }
  /** @type {import('lit').CSSResultGroup} */
  static get styles() {
    return [videoElementStyles];
  }
  /** @type {string[]} */
  static get parts() {
    return ['root', 'video'];
  }
  /**
   * A URL for an image to be shown while the video is downloading. If this attribute isn't
   * specified, nothing is displayed until the first frame is available, then the first frame is
   * shown as the poster frame.
   *
   * @type {string}
   */
  get poster() {
    return this.context.currentPoster;
  }
  set poster(newPoster) {
    this.connectedQueue.queue('currentPoster', () => {
      this.context.currentPoster = newPoster;
      this.requestUpdate();
    });
  }
  /** @type {HTMLVideoElement} */
  get mediaElement() {
    return /** @type {HTMLVideoElement} */ (this.mediaRef.value);
  }
  get videoElement() {
    return /** @type {HTMLVideoElement} */ (this.mediaRef.value);
  }
  get engine() {
    return this.mediaElement;
  }
  get videoEngine() {
    return this.videoElement;
  }
  // -------------------------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------------------------
  connectedCallback() {
    super.connectedCallback();
    this.context.viewType = ViewType.Video;
    this.dispatchEvent(
      new ViewTypeChangeEvent({
        detail: ViewType.Video
      })
    );
  }
  // -------------------------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------------------------
  /** @returns {import('lit').TemplateResult} */
  render() {
    return this.renderVideo();
  }
  /**
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderVideo() {
    var _a, _b;
    return html`
      <video
        part="${this.getVideoPartAttr()}"
        src="${ifNonEmpty(this.shouldSetVideoSrcAttr() ? this.src : '')}"
        width="${ifNumber(this.width)}"
        height="${ifNumber(this.height)}"
        poster="${ifNonEmpty(this.poster)}"
        preload="${ifNonEmpty(this.preload)}"
        crossorigin="${ifNonEmpty(this.crossOrigin)}"
        controlslist="${ifNonEmpty(this.controlsList)}"
        ?autoplay="${this.autoplay}"
        ?loop="${this.loop}"
        ?playsinline="${this.playsinline}"
        ?controls="${this.controls}"
        ?autopictureinpicture="${this.autoPiP}"
        ?disablepictureinpicture="${this.disablePiP}"
        ?disableremoteplayback="${this.disableRemotePlayback}"
        .defaultMuted="${(_a = this.defaultMuted) !== null && _a !== void 0
          ? _a
          : this.muted}"
        .defaultPlaybackRate="${(_b = this.defaultPlaybackRate) !== null &&
        _b !== void 0
          ? _b
          : 1}"
        ${ref(this.mediaRef)}
      >
        ${this.renderMediaChildren()}
      </video>
    `;
  }
  /**
   * Override this to modify video CSS Parts.
   *
   * @protected
   * @returns {string}
   */
  getVideoPartAttr() {
    return 'media video';
  }
  /**
   * Can be used by attaching engine such as `hls.js` to prevent src attr being set on
   * `<video>` element.
   *
   * @protected
   * @returns {boolean}
   */
  shouldSetVideoSrcAttr() {
    return true;
  }
  // -------------------------------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------------------------------
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
  async requestPictureInPicture() {
    return this.videoElement.requestPictureInPicture();
  }
}
__decorate(
  [property({ type: Boolean, attribute: 'autopictureinpicture' })],
  VideoElement.prototype,
  'autoPiP',
  void 0
);
__decorate(
  [property({ type: Boolean, attribute: 'disablepictureinpicture' })],
  VideoElement.prototype,
  'disablePiP',
  void 0
);
__decorate([property()], VideoElement.prototype, 'poster', null);
//# sourceMappingURL=VideoElement.js.map
