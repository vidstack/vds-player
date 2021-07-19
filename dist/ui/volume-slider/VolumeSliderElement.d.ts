export const VOLUME_SLIDER_ELEMENT_TAG_NAME: "vds-volume-slider";
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
    /**
     * @protected
     * @type {number}
     */
    protected mediaVolume: number;
    /**
     * The current media volume level (between 0 - 1).
     *
     * @type {number}
     */
    get volume(): number;
    /**
     * @protected
     * @readonly
     */
    protected readonly remoteControl: MediaRemoteControl;
    /**
     * @protected
     * @readonly
     */
    protected readonly sliderEventListenerController: EventListenerController<{
        "vds-slider-value-change": (event: SliderValueChangeEvent) => void;
    }>;
    /**
     * @protected
     * @param {SliderValueChangeEvent} event
     */
    protected handleSliderValueChange(event: SliderValueChangeEvent): void;
    currentVolume: number | undefined;
}
import { SliderElement } from "../slider/SliderElement.js";
import { MediaRemoteControl } from "../../media/controller/MediaRemoteControl.js";
import { SliderValueChangeEvent } from "../slider/events.js";
import { EventListenerController } from "../../foundation/events/EventListenerController.js";
