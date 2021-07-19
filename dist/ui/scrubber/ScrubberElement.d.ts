export const SCRUBBER_ELEMENT_TAG_NAME: "vds-scrubber";
/**
 * A control that displays the progression of playback and the amount seekable on a slider. This
 * control can be used to update the current playback time by interacting with the slider.
 *
 * 💡 See the `<vds-scrubber-preview>` element if you'd like to include previews.
 *
 * @tagname vds-scrubber
 * @csspart time-slider - The time slider (`<vds-time-slider>`).
 * @csspart time-slider-* - All `vds-time-slider` parts re-exported with the `time-slider` prefix.
 * @csspart progress-bar - The progress bar (`<vds-seekable-progress-bar>`).
 * @csspart progress-bar-* - All `vds-seekable-progress-bar` parts re-exported with the `progress-bar` prefix.
 * @slot Used to pass content into the slider.
 * @slot progress-bar - Used to pass content into the progress bar.
 */
export class ScrubberElement extends LitElement {
    /**
     * @type {import('lit').CSSResultGroup}
     */
    static get styles(): import("lit").CSSResultGroup;
    /**
     * @type {string[]}
     */
    static get parts(): string[];
    /**
     * @protected
     * @readonly
     */
    protected readonly context: import("../../foundation/context/types.js").ExtractContextRecordTypes<import("../../utils.js").ReadonlyIfType<import("../../foundation/context/types.js").DerivedContext<any>, {
        dragging: import("../../foundation/context/types.js").Context<boolean>;
        pointing: import("../../foundation/context/types.js").Context<boolean>;
        interacting: import("../../foundation/context/types.js").DerivedContext<boolean>;
    }>>;
    /**
     * Whether the scrubber should be disabled (not-interactable).
     *
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * ♿ **ARIA:** The `aria-label` for the time slider.
     *
     * @type {string}
     */
    label: string;
    /**
     * The time slider orientation.
     *
     * @type {'horizontal' | 'vertical'}
     */
    orientation: 'horizontal' | 'vertical';
    /**
     * ♿ **ARIA:** The `aria-label` for the progress bar.
     *
     * @type {string}
     */
    progressLabel: string;
    /**
     * ♿ **ARIA:** Human-readable text alternative for the progress bar value. If you pass
     * in a string containing `{seekableAmount}` or `{duration}` templates they'll be replaced with
     * the spoken form such as `1 hour 30 minutes`.
     *
     * @type {string}
     */
    progressValueText: string;
    /**
     * Whether the scrubber should request playback to pause while the user is dragging the
     * thumb. If the media was playing before the dragging starts, the state will be restored by
     * dispatching a user play request once the dragging ends.
     *
     * @type {boolean}
     */
    pauseWhileDragging: boolean;
    /**
     * A number that specifies the granularity that the time slider value must adhere to in seconds.
     * For example, a step with the value `1` indicates a granularity of 1 second increments.
     *
     * @type {number}
     */
    step: number;
    /**
     * ♿ **ARIA:** A number that specifies the number of steps taken when interacting with
     * the time slider via keyboard. Think of it as `step * keyboardStep`.
     *
     * @type {number}
     */
    keyboardStep: number;
    /**
     * ♿ **ARIA:** A number that will be used to multiply the `keyboardStep` when the `Shift` key
     * is held down and the slider value is changed by pressing `LeftArrow` or `RightArrow`. Think
     * of it as `keyboardStep * shiftKeyMultiplier`.
     *
     * @type {number}
     */
    shiftKeyMultiplier: number;
    /**
     * The amount of milliseconds to throttle media seeking request events being dispatched.
     *
     * @type {number}
     */
    seekingRequestThrottle: number;
    /**
     * ♿ **ARIA:** Human-readable text alternative for the time slider value. If you pass
     * in a string containing `{currentTime}` or `{duration}` templates they'll be replaced with
     * the spoken form such as `1 hour 30 minutes`.
     *
     * @type {string}
     */
    valueText: string;
    /**
     * @protected
     * @readonly
     */
    protected readonly pointerEventListenerController: EventListenerController<{
        pointerenter: (event: PointerEvent) => void;
        pointermove: (event: PointerEvent) => void;
        pointerleave: (event: PointerEvent) => void;
    }>;
    /**
     * @protected
     * @param {PointerEvent} event
     */
    protected handlePointerEnter(event: PointerEvent): void;
    /**
     * @protected
     * @param {PointerEvent} event
     */
    protected handlePointerMove(event: PointerEvent): void;
    /**
     * @protected
     * @param {PointerEvent} event
     */
    protected handlePointerLeave(event: PointerEvent): void;
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<TimeSliderElement>}
     */
    protected readonly timeSliderRef: import('lit/directives/ref').Ref<TimeSliderElement>;
    /**
     * Returns the underlying `vds-time-slider` component.
     *
     * @type {TimeSliderElement}
     */
    get timeSliderElement(): TimeSliderElement;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderTimeSlider(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getTimeSliderPartAttr(): string;
    /**
     * @protected
     * @returns {string}
     */
    protected getTimeSliderExportPartsAttr(): string;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderTimeSliderChildren(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderDefaultSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @param {SliderDragStartEvent} event
     */
    protected handleSliderDragStart(event: SliderDragStartEvent): void;
    /**
     * @protected
     * @param {SliderValueChangeEvent} event
     */
    protected handleSliderValueChange(event: SliderValueChangeEvent): void;
    /**
     * @protected
     * @param {SliderDragEndEvent} event
     */
    protected handleSliderDragEnd(event: SliderDragEndEvent): void;
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<SeekableProgressBarElement>}
     */
    protected readonly progressBarRef: import('lit/directives/ref').Ref<SeekableProgressBarElement>;
    /**
     * Returns the underlying `<vds-seekable-progress-bar>` component.
     *
     * @type {SeekableProgressBarElement}
     */
    get progressBarElement(): SeekableProgressBarElement;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderProgressBar(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getProgressBarPartAttr(): string;
    /**
     * @protected
     * @returns {string}
     */
    protected getProgressBarExportPartsAttr(): string;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderProgressBarChildren(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderProgressBarSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getProgressBarSlotName(): string;
    /**
     * @protected
     * @readonly
     */
    protected readonly previewEventListenerController: EventListenerController<{
        "vds-scrubber-preview-connect": (event: ScrubberPreviewConnectEvent) => void;
        "vds-scrubber-preview-show": (event: ScrubberPreviewShowEvent) => void;
        "vds-scrubber-preview-time-update": (event: ScrubberPreviewTimeUpdateEvent) => void;
        "vds-scrubber-preview-hide": (event: ScrubberPreviewHideEvent) => void;
    }>;
    /**
     * @protected
     * @type {ScrubberPreviewElement | undefined}
     */
    protected _scrubberPreviewElement: ScrubberPreviewElement | undefined;
    /**
     * The scrubber preview element `<vds-scrubber-preview>` (if given).
     *
     * @type {ScrubberPreviewElement | undefined}
     */
    get scrubberPreviewElement(): ScrubberPreviewElement | undefined;
    /**
     * @protected
     * @param {ScrubberPreviewConnectEvent} event
     */
    protected handlePreviewConnect(event: ScrubberPreviewConnectEvent): void;
    /**
     * @protected
     * @param {ScrubberPreviewShowEvent} event
     */
    protected handlePreviewShow(event: ScrubberPreviewShowEvent): void;
    /**
     * @protected
     * @param {ScrubberPreviewTimeUpdateEvent} event
     */
    protected handlePreviewTimeUpdate(event: ScrubberPreviewTimeUpdateEvent): void;
    /**
     * @protected
     * @param {ScrubberPreviewHideEvent} event
     */
    protected handlePreviewHide(event: ScrubberPreviewHideEvent): void;
}
import { LitElement } from "lit-element/lit-element";
import { EventListenerController } from "../../foundation/events/EventListenerController.js";
import { TimeSliderElement } from "../time-slider/TimeSliderElement.js";
import { SliderDragStartEvent } from "../slider/events.js";
import { SliderValueChangeEvent } from "../slider/events.js";
import { SliderDragEndEvent } from "../slider/events.js";
import { SeekableProgressBarElement } from "../seekable-progress-bar/SeekableProgressBarElement.js";
import { ScrubberPreviewConnectEvent } from "../scrubber-preview/ScrubberPreviewElement.js";
import { ScrubberPreviewShowEvent } from "../scrubber-preview/events.js";
import { ScrubberPreviewTimeUpdateEvent } from "../scrubber-preview/events.js";
import { ScrubberPreviewHideEvent } from "../scrubber-preview/events.js";
import { ScrubberPreviewElement } from "../scrubber-preview/ScrubberPreviewElement.js";
