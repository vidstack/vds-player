/**
 * @typedef {{
 *  [SliderDragStartEvent.TYPE]: SliderDragStartEvent;
 *  [SliderDragEndEvent.TYPE]: SliderDragEndEvent;
 *  [SliderValueChangeEvent.TYPE]: SliderValueChangeEvent;
 * }} SliderEvents
 */
/**
 * @template DetailType
 * @augments {VdsCustomEvent<DetailType>}
 */
export class SliderEvent<DetailType> extends VdsCustomEvent<DetailType> {
}
/**
 * Fired when the user begins interacting with the slider and dragging the thumb. The event
 * detail contains the current value the drag is starting at.
 *
 * @augments {SliderEvent<number>}
 */
export class SliderDragStartEvent extends SliderEvent<number> {
    /** @readonly */
    static readonly TYPE: "vds-slider-drag-start";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<number> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Fired when the user stops dragging the slider thumb. The event detail contains the value
 * the drag is ending at.
 *
 * @augments {SliderEvent<number>}
 */
export class SliderDragEndEvent extends SliderEvent<number> {
    /** @readonly */
    static readonly TYPE: "vds-slider-drag-end";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<number> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Fired when the slider value changes. The event detail contains the current value.
 *
 * @augments {SliderEvent<number>}
 */
export class SliderValueChangeEvent extends SliderEvent<number> {
    /** @readonly */
    static readonly TYPE: "vds-slider-value-change";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<number> | undefined, type?: string | undefined, final?: boolean | undefined);
}
export type SliderEvents = {
    [SliderDragStartEvent.TYPE]: SliderDragStartEvent;
    [SliderDragEndEvent.TYPE]: SliderDragEndEvent;
    [SliderValueChangeEvent.TYPE]: SliderValueChangeEvent;
};
import { VdsCustomEvent } from "../../foundation/events/events.js";
