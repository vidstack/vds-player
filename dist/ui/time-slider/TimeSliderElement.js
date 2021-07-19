import { __decorate } from 'tslib';
import { property, state } from 'lit/decorators.js';
import { consumeContext } from '../../foundation/context/index.js';
import {
  EventListenerController,
  isPointerEvent
} from '../../foundation/events/index.js';
import { mediaContext, MediaRemoteControl } from '../../media/index.js';
import { clampNumber, round } from '../../utils/number.js';
import { formatSpokenTime } from '../../utils/time.js';
import { throttle } from '../../utils/timing.js';
import {
  SliderDragEndEvent,
  SliderDragStartEvent,
  SliderElement,
  SliderValueChangeEvent
} from '../slider/index.js';
export const TIME_SLIDER_ELEMENT_TAG_NAME = 'vds-time-slider';
/**
 * A slider that lets the user control the current media playback time.
 *
 * @tagname vds-time-slider
 * @example
 * ```html
 * <vds-time-slider label="Media time slider"></vds-time-slider>
 * ```
 * @example
 * ```css
 * vds-time-slider {
 *   --vds-slider-track-height: 2.5px;
 *   --vds-slider-thumb-width: 16px;
 *   --vds-slider-thumb-height: 16px;
 *   --vds-slider-active-color: #ff2a5d;
 * }
 * ```
 */
export class TimeSliderElement extends SliderElement {
  constructor() {
    // -------------------------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------------------------
    super(...arguments);
    this.label = 'Media time slider';
    this.shiftKeyMultiplier = 2;
    /**
     * Represents the current % of media playback.
     *
     * @internal
     */
    this.value = -1;
    // These properties are overriden in final render by methods below.
    /** @internal */
    this.min = 0;
    /** @internal */
    this.max = 100;
    /** @internal */
    this.valueMin = '0';
    /** @internal */
    this.valueNow = '0';
    /** @internal */
    this.valueMax = '0';
    /**
     * @protected
     * @type {number}
     */
    this._step = 0.25;
    /**
     * @protected
     * @type {number}
     */
    this._keyboardStep = 5;
    /**
     * ♿ **ARIA:** Human-readable text alternative for the current slider value. If you pass
     * in a string containing `{currentTime}` or `{duration}` templates they'll be replaced with
     * the spoken form such as `1 hour 30 minutes`.
     *
     * @type {string}
     */
    this.valueText = '{currentTime} out of {duration}';
    /**
     * Whether the scrubber should request playback to pause while the user is dragging the
     * thumb. If the media was playing before the dragging starts, the state will be restored by
     * dispatching a user play request once the dragging ends.
     *
     * @type {boolean}
     */
    this.pauseWhileDragging = false;
    /**
     * The amount of milliseconds to throttle media seeking request events being dispatched.
     *
     * @type {number}
     */
    this.seekingRequestThrottle = 100;
    /**
     * @protected
     * @type {number}
     */
    this.mediaCurrentTime = 0;
    /**
     * @protected
     * @type {number}
     */
    this.mediaDuration = 0;
    /**
     * @protected
     * @type {boolean}
     */
    this.mediaPaused = mediaContext.paused.initialValue;
    /**
     * @protected
     * @readonly
     */
    this.sliderEventListenerController = new EventListenerController(this, {
      [SliderDragStartEvent.TYPE]: this.handleSliderDragStart,
      [SliderValueChangeEvent.TYPE]: this.handleSliderValueChange,
      [SliderDragEndEvent.TYPE]: this.handleSliderDragEnd
    });
    /**
     * @protected
     * @readonly
     */
    this.remoteControl = new MediaRemoteControl(this);
    /**
     * @protected
     * @readonly
     * @type {import('../../utils/timing').ThrottledFunction<(event: Event) => void>}
     */
    this.dispatchSeekingRequest = throttle((event) => {
      this.remoteControl.seeking(this.currentTime, event);
    }, this.seekingRequestThrottle);
    /**
     * @protected
     * @type {boolean}
     */
    this.wasPlayingBeforeDragStart = false;
  }
  /**
   *  A number that specifies the granularity that the slider value must adhere to in seconds.
   * For example, a step with the value `1` indicates a granularity of 1 second increments.
   *
   * @type {number}
   * @default 0.25
   */
  get step() {
    return this.mediaDuration > 0
      ? round((this._step / this.mediaDuration) * 100, 2)
      : this._step;
  }
  set step(newStep) {
    this._step = newStep;
  }
  /**
   * ♿ **ARIA:** A number that specifies the number of seconds to step when interacting
   * with the slider via keyboard.
   *
   * @type {number}
   * @default 5
   */
  get keyboardStep() {
    return this.mediaDuration > 0
      ? round((this._keyboardStep / this.mediaDuration) * 100, 2)
      : this._keyboardStep;
  }
  set keyboardStep(newStep) {
    this._keyboardStep = newStep;
  }
  /**
   * The current media time.
   *
   * @type {number}
   */
  get currentTime() {
    return this.mediaDuration * (this.value / 100);
  }
  // -------------------------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------------------------
  /**
   * @protected
   * @param {import('lit').PropertyValues} changedProperties
   */
  update(changedProperties) {
    if (
      changedProperties.has('mediaCurrentTime') ||
      changedProperties.has('mediaDuration')
    ) {
      this.updateValueToCurrentTime();
    }
    if (changedProperties.has('seekingRequestThrottle')) {
      this.dispatchSeekingRequest.updateDelay(this.seekingRequestThrottle);
    }
    if (changedProperties.has('disabled') && this.disabled) {
      this.dispatchSeekingRequest.cancel();
    }
    super.update(changedProperties);
  }
  disconnectedCallback() {
    this.dispatchSeekingRequest.cancel();
    super.disconnectedCallback();
  }
  // -------------------------------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------------------------------
  /**
   * @protected
   * @returns {string}
   */
  getValueNow() {
    const valueNow = this.mediaDuration * (this.value / 100);
    return String(Math.round(valueNow));
  }
  /**
   * @protected
   * @returns {string}
   */
  getValueMax() {
    return String(Math.round(this.mediaDuration));
  }
  /**
   * @protected
   * @returns {string}
   */
  getValueText() {
    const currentTime = this.mediaDuration * (this.value / 100);
    return this.valueText
      .replace('{currentTime}', formatSpokenTime(currentTime))
      .replace('{duration}', formatSpokenTime(this.mediaDuration));
  }
  /**
   * @protected
   * @param {SliderDragStartEvent} event
   * @returns {Promise<void>}
   */
  async handleSliderDragStart(event) {
    this.togglePlaybackWhileDragging(event);
  }
  /**
   * @protected
   * @param {SliderValueChangeEvent} event
   * @returns {Promise<void>}
   */
  async handleSliderValueChange(event) {
    this.value = event.detail;
    if (this.isDragging) {
      this.dispatchSeekingRequest(event);
    }
    if (!isPointerEvent(event.originalEvent)) {
      this.dispatchSeekingRequest.cancel();
      this.remoteControl.seek(this.currentTime, event);
    }
  }
  /**
   * @protected
   * @param {SliderDragEndEvent} event
   * @returns {Promise<void>}
   */
  async handleSliderDragEnd(event) {
    this.dispatchSeekingRequest.cancel();
    this.remoteControl.seek(this.currentTime, event);
    this.togglePlaybackWhileDragging(event);
  }
  /**
   * @protected
   */
  updateValueToCurrentTime() {
    if (this.isDragging) return;
    const percentage =
      this.mediaDuration > 0
        ? (this.mediaCurrentTime / this.mediaDuration) * 100
        : 0;
    this.value = clampNumber(0, round(percentage, 5), 100);
  }
  /**
   * @protected
   * @param {Event} event
   */
  togglePlaybackWhileDragging(event) {
    if (!this.pauseWhileDragging) return;
    if (this.isDragging && !this.mediaPaused) {
      this.wasPlayingBeforeDragStart = true;
      this.remoteControl.pause(event);
    } else if (
      this.wasPlayingBeforeDragStart &&
      !this.isDragging &&
      this.mediaPaused
    ) {
      this.wasPlayingBeforeDragStart = false;
      this.remoteControl.play(event);
    }
  }
}
__decorate(
  [property({ attribute: false, state: true })],
  TimeSliderElement.prototype,
  'value',
  void 0
);
__decorate(
  [property({ attribute: false })],
  TimeSliderElement.prototype,
  'min',
  void 0
);
__decorate(
  [property({ attribute: false })],
  TimeSliderElement.prototype,
  'max',
  void 0
);
__decorate(
  [property({ attribute: false })],
  TimeSliderElement.prototype,
  'valueMin',
  void 0
);
__decorate(
  [property({ attribute: false })],
  TimeSliderElement.prototype,
  'valueNow',
  void 0
);
__decorate(
  [property({ attribute: false })],
  TimeSliderElement.prototype,
  'valueMax',
  void 0
);
__decorate(
  [property({ type: Number })],
  TimeSliderElement.prototype,
  'step',
  null
);
__decorate(
  [property({ attribute: 'keyboard-step', type: Number })],
  TimeSliderElement.prototype,
  'keyboardStep',
  null
);
__decorate(
  [property({ attribute: 'pause-while-dragging', type: Boolean })],
  TimeSliderElement.prototype,
  'pauseWhileDragging',
  void 0
);
__decorate(
  [property({ attribute: 'seeking-request-throttle', type: Number })],
  TimeSliderElement.prototype,
  'seekingRequestThrottle',
  void 0
);
__decorate(
  [state(), consumeContext(mediaContext.currentTime)],
  TimeSliderElement.prototype,
  'mediaCurrentTime',
  void 0
);
__decorate(
  [
    state(),
    consumeContext(mediaContext.duration, {
      transform: (d) => (d >= 0 ? d : 0)
    })
  ],
  TimeSliderElement.prototype,
  'mediaDuration',
  void 0
);
__decorate(
  [state(), consumeContext(mediaContext.paused)],
  TimeSliderElement.prototype,
  'mediaPaused',
  void 0
);
//# sourceMappingURL=TimeSliderElement.js.map
