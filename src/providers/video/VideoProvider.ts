import { listenTo } from '@wcom/events';
import {
  CSSResultArray,
  html,
  property,
  PropertyValues,
  TemplateResult,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { StyleInfo, styleMap } from 'lit-html/directives/style-map';

import {
  MediaType,
  VdsMediaTypeChangeEvent,
  VdsViewTypeChangeEvent,
  ViewType,
} from '../../core';
import { ifNonEmpty } from '../../shared/directives/if-non-empty';
import { ifNumber } from '../../shared/directives/if-number';
import { Unsubscribe } from '../../shared/types';
import { IS_IOS } from '../../utils/support';
import { isFunction, isUndefined, noop } from '../../utils/unit';
import { MediaFileProvider, MediaFileProviderEngine } from '../file';
import { videoStyles } from './video.css';
import { VideoProviderProps } from './video.types';
import { AUDIO_EXTENSIONS, VIDEO_EXTENSIONS } from './video.utils';

/**
 * Enables loading, playing and controlling videos via the HTML5 `<video>` element.
 *
 * ## Tag
 *
 * @tagname vds-video
 *
 * ## Slots
 *
 * @slot Used to pass in `<source>`/`<track>` elements to the underlying HTML5 media player.
 * @slot ui - Used to pass in `<vds-ui>` to customize the player user interface.
 *
 * ## CSS Parts
 *
 * @csspart root - The component's root element that wraps the video (`<div>`).
 * @csspart video - The video element (`<video>`).
 *
 * ## Examples
 *
 * @example
 * ```html
 * <vds-video src="/media/video.mp4" poster="/media/poster.png">
 *   <!-- ... -->
 * </vds-video>
 * ```
 *
 * @example
 * ```html
 *  <vds-video poster="/media/poster.png">
 *    <source src="/media/video.mp4" type="video/mp4" />
 *    <track default kind="subtitles" src="/media/subs/en.vtt" srclang="en" label="English" />
 *    <vds-ui slot="ui">
 *      <!-- ... -->
 *    </vds-ui>
 *  </vds-video>
 * ```
 */
export class VideoProvider<EngineType = MediaFileProviderEngine>
  extends MediaFileProvider<EngineType>
  implements VideoProviderProps {
  protected mediaEl?: HTMLVideoElement;

  static get styles(): CSSResultArray {
    return [videoStyles];
  }

  static get parts(): string[] {
    return ['root', 'video'];
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.context.viewType = ViewType.Video;
    this.dispatchEvent(
      new VdsViewTypeChangeEvent({
        detail: ViewType.Video,
      }),
    );
  }

  firstUpdated(changedProps: PropertyValues): void {
    this.mediaEl = this.shadowRoot?.querySelector('video') as HTMLVideoElement;
    super.firstUpdated(changedProps);
  }

  // -------------------------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------------------------

  render(): TemplateResult {
    return html`
      <div
        id="root"
        class="${this.getRootClassAttr()}"
        part="${this.getRootPartAttr()}"
        aria-busy="${this.getAriaBusy()}"
        style="${styleMap(this.getRootStyleMap())}"
      >
        ${this.renderVideo()}
        <slot name="ui" @slotchange="${this.handleUiSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * Override this to modify root provider CSS Classes.
   */
  protected getRootClassAttr(): string {
    return '';
  }

  /**
   * Override this to modify root provider CSS Parts.
   */
  protected getRootPartAttr(): string {
    return 'root';
  }

  /**
   * Override this to modify root provider styles.
   */
  protected getRootStyleMap(): StyleInfo {
    return {
      'padding-bottom': this.getAspectRatioPadding(),
    };
  }

  /**
   * Override this to modify video CSS Parts.
   */
  protected getVideoPartAttr(): string {
    return 'video';
  }

  /**
   * Can be used by attaching engine such as `hls.js` to prevent src attr being set on
   * `<video>` element.
   */
  protected shouldSetVideoSrcAttr(): boolean {
    return true;
  }

  protected renderVideo(): TemplateResult {
    return html`
      <video
        part="${this.getVideoPartAttr()}"
        src="${ifNonEmpty(this.shouldSetVideoSrcAttr() ? this.src : '')}"
        width="${ifNumber(this.width)}"
        height="${ifNumber(this.height)}"
        poster="${ifDefined(this.poster)}"
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
        .defaultMuted="${this.defaultMuted ?? this.muted}"
        .defaultPlaybackRate="${this.defaultPlaybackRate ?? 1}"
      >
        ${this.renderMediaContent()}
      </video>
    `;
  }

  // -------------------------------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------------------------------

  protected handleLoadedMetadata(originalEvent: Event): void {
    this.context.mediaType = this.getMediaType();
    this.dispatchEvent(
      new VdsMediaTypeChangeEvent({
        detail: this.context.mediaType,
        originalEvent,
      }),
    );

    super.handleLoadedMetadata(originalEvent);
  }

  /**
   * Override to listen to slot changes.
   */
  protected handleUiSlotChange(): void {
    // no-op
  }

  // -------------------------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------------------------

  @property()
  get poster(): string {
    return this.context.currentPoster;
  }

  set poster(newPoster: string) {
    this.context.currentPoster = newPoster;
  }

  @property({ type: Boolean, attribute: 'autopictureinpicture' })
  autoPiP?: boolean;

  @property({ type: Boolean, attribute: 'disablepictureinpicture' })
  disablePiP?: boolean;

  // -------------------------------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------------------------------

  protected getMediaType(): MediaType {
    if (AUDIO_EXTENSIONS.test(this.currentSrc)) {
      return MediaType.Audio;
    }

    if (VIDEO_EXTENSIONS.test(this.currentSrc)) {
      return MediaType.Video;
    }

    return MediaType.Unknown;
  }

  // -------------------------------------------------------------------------------------------
  // Fullscreen
  // -------------------------------------------------------------------------------------------

  get fullscreen(): boolean {
    return this.canRequestFullscreenNatively
      ? this.isNativeFullscreenActive
      : this.mediaEl?.webkitDisplayingFullscreen ?? false;
  }

  get canRequestFullscreen(): boolean {
    return this.canRequestFullscreenNatively || this.canRequestFullscreenOniOS;
  }

  /**
   * Whether the video fullscreen API is available on iOS Safari.
   *
   * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1628805-webkitsupportsfullscreen
   */
  get canRequestFullscreenOniOS(): boolean {
    return (
      IS_IOS &&
      isFunction(this.mediaEl?.webkitEnterFullscreen) &&
      (this.mediaEl?.webkitSupportsFullscreen ?? false)
    );
  }

  protected async requestFullscreenOniOS(): Promise<void> {
    return this.mediaEl?.webkitEnterFullscreen?.();
  }

  protected async exitFullscreenOniOS(): Promise<void> {
    return this.mediaEl?.webkitExitFullscreen?.();
  }

  async makeEnterFullscreenRequest(): Promise<void> {
    return this.canRequestFullscreenNatively
      ? super.makeEnterFullscreenRequest()
      : this.requestFullscreenOniOS();
  }

  protected async makeExitFullscreenRequest(): Promise<void> {
    return this.canRequestFullscreenNatively
      ? super.makeExitFullscreenRequest()
      : this.exitFullscreenOniOS();
  }

  protected addFullscreenChangeEventListener(
    handler: (this: HTMLElement, event: Event) => void,
  ): Unsubscribe {
    if (this.canRequestFullscreenNatively) {
      return super.addFullscreenChangeEventListener(handler);
    }

    if (this.canRequestFullscreenOniOS && !isUndefined(this.mediaEl)) {
      const listeners = [
        listenTo(
          this.mediaEl,
          'webkitbeginfullscreen',
          this.handleFullscreenChange.bind(this),
        ),
        listenTo(
          this.mediaEl,
          'webkitendfullscreen',
          this.handleFullscreenChange.bind(this),
        ),
      ];

      return () => {
        listeners.forEach(fn => fn());
      };
    }

    return noop;
  }

  protected addFullscreenErrorEventListener(
    handler: (this: HTMLElement, event: Event) => void,
  ): Unsubscribe {
    if (!this.canRequestFullscreenNatively) return noop;
    return super.addFullscreenErrorEventListener(handler);
  }

  protected throwIfNoFullscreenSupport(): void {
    if (this.canRequestFullscreen) {
      super.throwIfNoFullscreenSupport();
    } else if (!this.canRequestFullscreenOniOS) {
      throw Error('The fullscreen API is currently not available on iOS.');
    }
  }
}
