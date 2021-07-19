export const TIME_SLIDER_ELEMENT_TAG_NAME: "vds-time-slider";
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
    /**
     * @protected
     * @type {number}
     */
    protected _step: number;
    /**
     * @protected
     * @type {number}
     */
    protected _keyboardStep: number;
    /**
     * Whether the scrubber should request playback to pause while the user is dragging the
     * thumb. If the media was playing before the dragging starts, the state will be restored by
     * dispatching a user play request once the dragging ends.
     *
     * @type {boolean}
     */
    pauseWhileDragging: boolean;
    /**
     * The amount of milliseconds to throttle media seeking request events being dispatched.
     *
     * @type {number}
     */
    seekingRequestThrottle: number;
    /**
     * @protected
     * @type {number}
     */
    protected mediaCurrentTime: number;
    /**
     * @protected
     * @type {number}
     */
    protected mediaDuration: number;
    /**
     * @protected
     * @type {boolean}
     */
    protected mediaPaused: boolean;
    /**
     * The current media time.
     *
     * @type {number}
     */
    get currentTime(): number;
    /**
     * @protected
     * @readonly
     */
    protected readonly sliderEventListenerController: EventListenerController<{
        "vds-slider-drag-start": (event: SliderDragStartEvent) => Promise<void>;
        "vds-slider-value-change": (event: SliderValueChangeEvent) => Promise<void>;
        "vds-slider-drag-end": (event: SliderDragEndEvent) => Promise<void>;
    }>;
    /**
     * @protected
     * @param {SliderDragStartEvent} event
     * @returns {Promise<void>}
     */
    protected handleSliderDragStart(event: SliderDragStartEvent): Promise<void>;
    /**
     * @protected
     * @readonly
     */
    protected readonly remoteControl: MediaRemoteControl;
    /**
     * @protected
     * @param {SliderValueChangeEvent} event
     * @returns {Promise<void>}
     */
    protected handleSliderValueChange(event: SliderValueChangeEvent): Promise<void>;
    /**
     * @protected
     * @param {SliderDragEndEvent} event
     * @returns {Promise<void>}
     */
    protected handleSliderDragEnd(event: SliderDragEndEvent): Promise<void>;
    /**
     * @protected
     * @readonly
     * @type {import('../../utils/timing').ThrottledFunction<(event: Event) => void>}
     */
    protected readonly dispatchSeekingRequest: import("../../utils/timing.js").ThrottledFunction<(event: Event) => void>;
    /**
     * @protected
     */
    protected updateValueToCurrentTime(): void;
    /**
     * @protected
     * @type {boolean}
     */
    protected wasPlayingBeforeDragStart: boolean;
    /**
     * @protected
     * @param {Event} event
     */
    protected togglePlaybackWhileDragging(event: Event): void;
}
import { SliderElement } from "../slider/SliderElement.js";
import { SliderDragStartEvent } from "../slider/events.js";
import { SliderValueChangeEvent } from "../slider/events.js";
import { SliderDragEndEvent } from "../slider/events.js";
import { EventListenerController } from "../../foundation/events/EventListenerController.js";
import { MediaRemoteControl } from "../../media/controller/MediaRemoteControl.js";
