export const SLIDER_ELEMENT_TAG_NAME: "vds-slider";
/**
 * The direction to move the thumb, associated with key symbols.
 */
export type SliderKeyDirection = number;
export namespace SliderKeyDirection {
    const Left: number;
    const ArrowLeft: number;
    const Up: number;
    const ArrowUp: number;
    const Right: number;
    const ArrowRight: number;
    const Down: number;
    const ArrowDown: number;
}
/**
 * A custom built `input[type="range"]` that is cross-browser friendly, ARIA friendly, mouse/touch
 * friendly and easily styleable. This component allows users to input numeric values between a
 * minimum and maxmimum value. Generally used in the player for volume or scrubber controls.
 *
 * @see https://github.com/carbon-design-system/carbon-web-components
 * @tagname vds-slider
 * @slot Used to pass in additional content inside the slider.
 * @slot thumb-container - Used to pass content into the thumb container.
 * @slot thumb - Used to pass content inside the thumb.
 * @slot track - Used to pass content inside the track.
 * @slot track-fill - Used to pass content inside the track fill.
 * @csspart root - The component's root element, in this case the slider container (`<div>`).
 * @csspart thumb-container - The container for the slider's handle.
 * @csspart thumb - The slider's handle the user drags left/right (`<div>`).
 * @csspart track - The path in which the thumb slides along (`<div>`).
 * @csspart track-fill - The part of the track that is currently filled which fills left-to-right (`<div>`).
 * @cssprop --vds-slider-fill-rate - The ratio of the slider that is filled such as `0.3`.
 * @cssprop --vds-slider-fill-value - The current amount the slider is filled such as `30`.
 * @cssprop --vds-slider-fill-percentage - The fill rate expressed as a precetange such as `30%`.
 * @cssprop --vds-slider-thumb-width - The slider handle width.
 * @cssprop --vds-slider-thumb-height - The slider handle height.
 * @cssprop --vds-slider-thumb-bg - The background color of the slider handle.
 * @cssprop --vds-slider-thumb-border-radius - The border radius of the slider handle.
 * @cssprop --vds-slider-thumb-scale - The base scale of thumb when it is inactive, it'll scale to 1 when active.
 * @cssprop --vds-slider-thumb-transition - The CSS transitions to use for the thumb, defaults to `transform 100ms ease-out 0s`.
 * @cssprop --vds-slider-track-height - The height of the slider track.
 * @cssprop --vds-slider-track-bg - The background color of the slider track.
 * @cssprop --vds-slider-track-fill-bg - The background color of the slider track fill.
 * @cssprop --vds-slider-active-color - The slider thumb and track fill background color when focused, active or being dragged.
 * @cssprop --vds-slider-disabled-color - The slider thumb, track, and track fill background color when disabled.
 * @example
 * ```html
 * <vds-slider
 *   min="0"
 *   max="100"
 *   value="50"
 * ></vds-slider>
 * ```
 * @example
 * ```css
 * vds-slider {
 *   --vds-slider-active-color: #ff2a5d;
 * }
 *
 * vds-slider::part(thumb) {
 *   box-shadow: transparent 0px 0px 0px 1px inset;
 * }
 *
 * vds-slider::part(track),
 * vds-slider::part(track-fill) {
 *   border-radius: 3px;
 * }
 * ```
 */
export class SliderElement extends LitElement {
    /** @type {import('lit').CSSResultGroup} */
    static get styles(): import("lit").CSSResultGroup;
    /** @type {string[]} */
    static get parts(): string[];
    /** @type {string[]} */
    static get events(): string[];
    /**
     * ♿ **ARIA:** The `aria-label` property of the slider.
     *
     * @type {string | undefined}
     */
    label: string | undefined;
    /**
     * The lowest slider value in the range of permitted values.
     *
     * @type {number}
     */
    min: number;
    /**
     * The greatest slider value in the range of permitted values.
     *
     * @type {number}
     */
    max: number;
    /**
     * Whether the slider should be disabled (not-interactable).
     *
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * The current slider value.
     *
     * @type {number}
     */
    value: number;
    /**
     * ♿ **ARIA:** Alternative value for minimum value (defaults to `min`). This can
     * be used when expressing slider as a percentage (0-100), and wishing to detail more
     * information for better accessibility.
     *
     * @type {string | undefined}
     */
    valueMin: string | undefined;
    /**
     * ♿ **ARIA:** Alternative value for current value (defaults to `value`). This can
     * be used when expressing slider as a percentage (0-100), and wishing to detail more
     * information for better accessibility.
     *
     * @type {string | undefined}
     */
    valueNow: string | undefined;
    /**
     * ♿ **ARIA:** Alternative value for maximum value (defaults to `max`). This can
     * be used when expressing slider as a percentage (0-100), and wishing to detail more
     * information for better accessibility.
     *
     * @type {string | undefined}
     */
    valueMax: string | undefined;
    /**
     * ♿ **ARIA:** Human-readable text alternative for the current value. Defaults to
     * `value:max` ratio as a percentage.
     *
     * @type {string | undefined}
     */
    valueText: string | undefined;
    /**
     * ♿ **ARIA:** Indicates the orientation of the slider.
     *
     * @type {'horizontal' | 'vertical'}
     */
    orientation: 'horizontal' | 'vertical';
    /**
     * A number that specifies the granularity that the slider value must adhere to.
     *
     * @type {number}
     */
    step: number;
    /**
     * ♿ **ARIA:** A number that specifies the number of steps taken when interacting with
     * the slider via keyboard.
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
     * @protected
     * @type {boolean}
     */
    protected _isDragging: boolean;
    /**
     * Whether the slider thumb is currently being dragged.
     *
     * @type {boolean}
     * @default false
     */
    get isDragging(): boolean;
    /**
     * The current value to range ratio.
     *
     * @type {number}
     * @default 0.5
     * @example
     * `min` = 0
     * `max` = 10
     * `value` = 5
     * `range` = 10 (max - min)
     * `fillRate` = 0.5 (result)
     */
    get fillRate(): number;
    /**
     * The fill rate expressed as a percentage (`fillRate * 100`).
     *
     * @type {number}
     * @default 50
     */
    get fillPercent(): number;
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<HTMLDivElement>}
     */
    protected readonly rootRef: import('lit/directives/ref').Ref<HTMLDivElement>;
    /**
     * The component's root element.
     *
     * @type {HTMLDivElement}
     */
    get rootElement(): HTMLDivElement;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderSlider(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderSliderChildren(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderDefaultSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getSliderClassAttr(): string;
    /**
     * @protected
     * @returns {string}
     */
    protected getSliderPartAttr(): string;
    /**
     * @protected
     * @returns {import('lit/directives/style-map').StyleInfo}
     */
    protected getSliderStyleMap(): import('lit/directives/style-map').StyleInfo;
    /**
     * @protected
     * @param {PointerEvent} event
     */
    protected handleSliderPointerMove(event: PointerEvent): void;
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<HTMLDivElement>}
     */
    protected readonly thumbContainerRef: import('lit/directives/ref').Ref<HTMLDivElement>;
    /**
     * The thumb container element.
     *
     * @type {HTMLDivElement}
     */
    get thumbContainerElement(): HTMLDivElement;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderThumbContainer(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getValueMin(): string;
    /**
     * @protected
     * @returns {string}
     */
    protected getValueNow(): string;
    /**
     * @protected
     * @returns {string}
     */
    protected getValueMax(): string;
    /**
     * @protected
     * @returns {string}
     */
    protected getValueText(): string;
    /**
     * @protected
     * @returns {string}
     */
    protected getValueTextFallback(): string;
    /**
     * @protected
     * @returns {string}
     */
    protected getThumbContainerPartAttr(): string;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderThumbContainerSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @param {KeyboardEvent} event
     */
    protected handleThumbContainerKeydown(event: KeyboardEvent): void;
    /**
     * @protected
     * @param {PointerEvent} event
     */
    protected handleThumbContainerPointerDown(event: PointerEvent): void;
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<HTMLDivElement>}
     */
    protected readonly thumbRef: import('lit/directives/ref').Ref<HTMLDivElement>;
    /**
     * The thumb element.
     *
     * @type {HTMLDivElement}
     */
    get thumbElement(): HTMLDivElement;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderThumb(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getThumbPartAttr(): string;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderThumbSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<HTMLDivElement>}
     */
    protected readonly trackRef: import('lit/directives/ref').Ref<HTMLDivElement>;
    /**
     * The track element.
     *
     * @type {HTMLDivElement}
     */
    get trackElement(): HTMLDivElement;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderTrack(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderTrackSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getTrackPartAttr(): string;
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<HTMLDivElement>}
     */
    protected readonly trackFillRef: import('lit/directives/ref').Ref<HTMLDivElement>;
    /**
     * The track fill element.
     *
     * @type {HTMLDivElement}
     */
    get trackFillElement(): HTMLDivElement;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderTrackFill(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderTrackFillSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getTrackFillPartAttr(): string;
    /**
     * Why? Used to emit native `input` events.
     *
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderInput(): import('lit').TemplateResult;
    /**
     * @protected
     * @param {PointerEvent} event
     */
    protected startDragging(event: PointerEvent): void;
    /**
     * @protected
     * @param {PointerEvent} event
     */
    protected stopDragging(event: PointerEvent): void;
    /**
     * @protected
     * @readonly
     */
    protected readonly documentEventListeners: EventListenerController<{
        pointerup: (event: PointerEvent) => void;
        pointermove: (event: PointerEvent) => void;
    }>;
    /**
     * @protected
     * @param {PointerEvent} event
     */
    protected handleDocumentPointerUp(event: PointerEvent): void;
    /**
     * @protected
     * @param {PointerEvent} event
     */
    protected handleDocumentPointerMove(event: PointerEvent): void;
    /**
     * @protected
     * @readonly
     * @type {import('../../utils/timing').RafThrottledFunction<(event: PointerEvent) => void>}
     */
    protected readonly handlePointerMove: import("../../utils/timing.js").RafThrottledFunction<(event: PointerEvent) => void>;
    /**
     * @protected
     * @param {number} value
     */
    protected updateValue(value: number): void;
    /**
     * @protected
     * @param {number} rate
     */
    protected updateValueByRate(rate: number): void;
    /**
     * @protected
     * @param {PointerEvent} event
     */
    protected updateValueBasedOnThumbPosition(event: PointerEvent): void;
    /**
     * @protected
     * @type {number}
     */
    protected lastDispatchedValue: number;
    /**
     * @protected
     * @readonly
     * @type {import('../../utils/timing').RafThrottledFunction<(event: Event | undefined) => void>}
     */
    protected readonly dispatchValueChange: import("../../utils/timing.js").RafThrottledFunction<(event: Event | undefined) => void>;
}
import { LitElement } from "lit-element/lit-element";
import { EventListenerController } from "../../foundation/events/EventListenerController.js";
