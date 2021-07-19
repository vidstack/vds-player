import { __decorate } from 'tslib';
// ** Dependencies **
import '../slider/define.js';
import { property } from 'lit/decorators.js';
import { consumeContext } from '../../foundation/context/index.js';
import { EventListenerController } from '../../foundation/events/index.js';
import { mediaContext } from '../../media/context.js';
import { MediaRemoteControl } from '../../media/index.js';
import { round } from '../../utils/number.js';
import { SliderElement, SliderValueChangeEvent } from '../slider/index.js';
export const VOLUME_SLIDER_ELEMENT_TAG_NAME = 'vds-volume-slider';
/**
 * A slider control that lets the user specify their desired volume level.
 *
 * @tagname vds-volume-slider
 *  @example
 * ```html
 * <vds-volume-slider
 *   label="Media volume slider"
 * ></vds-volume-slider>
 * ```
 * @example
 * ```css
 * vds-volume-slider {
 *   --vds-slider-track-height: 2.5px;
 *   --vds-slider-thumb-width: 16px;
 *   --vds-slider-thumb-height: 16px;
 *   --vds-slider-active-color: #ff2a5d;
 * }
 * ```
 */
export class VolumeSliderElement extends SliderElement {
  constructor() {
    // -------------------------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------------------------
    super(...arguments);
    this.label = 'Media volume slider';
    this.step = 0.5;
    this.keyboardStep = 0.5;
    this.shiftKeyMultiplier = 10;
    /** @internal */
    this.min = 0;
    /** @internal */
    this.max = 100;
    /**
     * @protected
     * @type {number}
     */
    this.mediaVolume = mediaContext.volume.initialValue;
    /**
     * Represents the current volume out of 100.
     *
     * @internal
     */
    this.value = this.mediaVolume * 100;
    /**
     * @protected
     * @readonly
     */
    this.remoteControl = new MediaRemoteControl(this);
    /**
     * @protected
     * @readonly
     */
    this.sliderEventListenerController = new EventListenerController(this, {
      [SliderValueChangeEvent.TYPE]: this.handleSliderValueChange
    });
  }
  /**
   * The current media volume level (between 0 - 1).
   *
   * @type {number}
   */
  get volume() {
    return round(this.value / 100, 3);
  }
  // -------------------------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------------------------
  /**
   * @protected
   * @param {import('lit').PropertyValues} changedProperties
   */
  update(changedProperties) {
    if (changedProperties.has('mediaVolume')) {
      this.value = this.mediaVolume * 100;
    }
    super.update(changedProperties);
  }
  /**
   * @protected
   * @param {SliderValueChangeEvent} event
   */
  handleSliderValueChange(event) {
    const newVolume = event.detail;
    this.currentVolume = newVolume;
    const mediaVolume = round(newVolume / 100, 3);
    this.remoteControl.changeVolume(mediaVolume, event);
  }
}
__decorate(
  [property({ attribute: false })],
  VolumeSliderElement.prototype,
  'min',
  void 0
);
__decorate(
  [property({ attribute: false })],
  VolumeSliderElement.prototype,
  'max',
  void 0
);
__decorate(
  [consumeContext(mediaContext.volume)],
  VolumeSliderElement.prototype,
  'mediaVolume',
  void 0
);
__decorate(
  [property({ attribute: false, state: true })],
  VolumeSliderElement.prototype,
  'value',
  void 0
);
//# sourceMappingURL=VolumeSliderElement.js.map
