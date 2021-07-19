/**
 * @typedef {{
 *  [ScrubberPreviewShowEvent.TYPE]: ScrubberPreviewShowEvent;
 *  [ScrubberPreviewHideEvent.TYPE]: ScrubberPreviewHideEvent;
 *  [ScrubberPreviewTimeUpdateEvent.TYPE]: ScrubberPreviewTimeUpdateEvent;
 * }} ScrubberPreviewEvents
 */
/**
 * @template DetailType
 * @augments {VdsCustomEvent<DetailType>}
 */
export class ScrubberPreviewEvent<DetailType> extends VdsCustomEvent<DetailType> {
    static DEFAULT_BUBBLES: boolean;
    static DEFAULT_COMPOSED: boolean;
}
/**
 * Emitted when the preview transitions from hidden to showing.
 *
 * @augments {ScrubberPreviewEvent<void>}
 */
export class ScrubberPreviewShowEvent extends ScrubberPreviewEvent<void> {
    /** @readonly */
    static readonly TYPE: "vds-scrubber-preview-show";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<void> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Emitted when the preview transitions from showing to hidden.
 *
 * @augments {ScrubberPreviewEvent<void>}
 */
export class ScrubberPreviewHideEvent extends ScrubberPreviewEvent<void> {
    /** @readonly */
    static readonly TYPE: "vds-scrubber-preview-hide";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<void> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Emitted when the time being previewed changes.
 *
 * @augments {ScrubberPreviewEvent<number>}
 */
export class ScrubberPreviewTimeUpdateEvent extends ScrubberPreviewEvent<number> {
    /** @readonly */
    static readonly TYPE: "vds-scrubber-preview-time-update";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<number> | undefined, type?: string | undefined, final?: boolean | undefined);
}
export type ScrubberPreviewEvents = {
    [ScrubberPreviewShowEvent.TYPE]: ScrubberPreviewShowEvent;
    [ScrubberPreviewHideEvent.TYPE]: ScrubberPreviewHideEvent;
    [ScrubberPreviewTimeUpdateEvent.TYPE]: ScrubberPreviewTimeUpdateEvent;
};
import { VdsCustomEvent } from "../../foundation/events/events.js";
