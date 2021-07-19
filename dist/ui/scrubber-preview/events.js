import { VdsCustomEvent } from '../../foundation/events/index.js';
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
export class ScrubberPreviewEvent extends VdsCustomEvent {}
ScrubberPreviewEvent.DEFAULT_BUBBLES = true;
ScrubberPreviewEvent.DEFAULT_COMPOSED = true;
/**
 * Emitted when the preview transitions from hidden to showing.
 *
 * @augments {ScrubberPreviewEvent<void>}
 */
export class ScrubberPreviewShowEvent extends ScrubberPreviewEvent {}
/** @readonly */
ScrubberPreviewShowEvent.TYPE = 'vds-scrubber-preview-show';
/**
 * Emitted when the preview transitions from showing to hidden.
 *
 * @augments {ScrubberPreviewEvent<void>}
 */
export class ScrubberPreviewHideEvent extends ScrubberPreviewEvent {}
/** @readonly */
ScrubberPreviewHideEvent.TYPE = 'vds-scrubber-preview-hide';
/**
 * Emitted when the time being previewed changes.
 *
 * @augments {ScrubberPreviewEvent<number>}
 */
export class ScrubberPreviewTimeUpdateEvent extends ScrubberPreviewEvent {}
/** @readonly */
ScrubberPreviewTimeUpdateEvent.TYPE = 'vds-scrubber-preview-time-update';
//# sourceMappingURL=events.js.map
