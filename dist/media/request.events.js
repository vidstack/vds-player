import { VdsCustomEvent } from '../foundation/events/index.js';
/**
 * @typedef {{
 *  [MuteRequestEvent.TYPE]: MuteRequestEvent;
 *  [UnmuteRequestEvent.TYPE]: UnmuteRequestEvent;
 *  [EnterFullscreenRequestEvent.TYPE]: EnterFullscreenRequestEvent;
 *  [ExitFullscreenRequestEvent.TYPE]: ExitFullscreenRequestEvent;
 *  [PlayRequestEvent.TYPE]: PlayRequestEvent;
 *  [PauseRequestEvent.TYPE]: PauseRequestEvent;
 *  [SeekRequestEvent.TYPE]: SeekRequestEvent;
 *  [SeekingRequestEvent.TYPE]: SeekingRequestEvent;
 *  [VolumeChangeRequestEvent.TYPE]: VolumeChangeRequestEvent;
 * }} MediaRequestEvents
 */
/**
 * @template DetailType
 * @augments {VdsCustomEvent<DetailType>}
 */
export class MediaRequestEvent extends VdsCustomEvent {}
MediaRequestEvent.DEFAULT_BUBBLES = true;
MediaRequestEvent.DEFAULT_COMPOSED = true;
/**
 * Fired when requesting the media to be muted.
 *
 * @bubbles
 * @composed
 * @augments {MediaRequestEvent<void>}
 */
export class MuteRequestEvent extends MediaRequestEvent {}
/** @readonly */
MuteRequestEvent.TYPE = 'vds-mute-request';
/**
 * Fired when requesting the media to be unmuted.
 *
 * @bubbles
 * @composed
 * @augments {MediaRequestEvent<void>}
 */
export class UnmuteRequestEvent extends MediaRequestEvent {}
/** @readonly */
UnmuteRequestEvent.TYPE = 'vds-unmute-request';
/**
 * Fired when requesting media to enter fullscreen.
 *
 * @bubbles
 * @composed
 * @augments {MediaRequestEvent<void>}
 */
export class EnterFullscreenRequestEvent extends MediaRequestEvent {}
/** @readonly */
EnterFullscreenRequestEvent.TYPE = 'vds-enter-fullscreen-request';
/**
 * Fired when requesting media to exit fullscreen.
 *
 * @bubbles
 * @composed
 * @augments {MediaRequestEvent<void>}
 */
export class ExitFullscreenRequestEvent extends MediaRequestEvent {}
/** @readonly */
ExitFullscreenRequestEvent.TYPE = 'vds-exit-fullscreen-request';
/**
 * Fired when requesting media playback to begin/resume.
 *
 * @bubbles
 * @composed
 * @augments {MediaRequestEvent<void>}
 */
export class PlayRequestEvent extends MediaRequestEvent {}
/** @readonly */
PlayRequestEvent.TYPE = 'vds-play-request';
/**
 * Fired when requesting media playback to temporarily stop.
 *
 * @bubbles
 * @composed
 * @augments {MediaRequestEvent<void>}
 */
export class PauseRequestEvent extends MediaRequestEvent {}
/** @readonly */
PauseRequestEvent.TYPE = 'vds-pause-request';
/**
 * Fired when requesting a time change. In other words, moving the playhead to a new position.
 *
 * @bubbles
 * @composed
 * @augments {MediaRequestEvent<number>}
 */
export class SeekRequestEvent extends MediaRequestEvent {}
/** @readonly */
SeekRequestEvent.TYPE = 'vds-seek-request';
/**
 * Fired when seeking/scrubbing to a new playback position.
 *
 * @bubbles
 * @composed
 * @augments {MediaRequestEvent<number>}
 */
export class SeekingRequestEvent extends MediaRequestEvent {}
/** @readonly */
SeekingRequestEvent.TYPE = 'vds-seeking-request';
/**
 * Fired when requesting the media volume to be set to a new level.
 *
 * @bubbles
 * @composed
 * @augments {MediaRequestEvent<number>}
 */
export class VolumeChangeRequestEvent extends MediaRequestEvent {}
/** @readonly */
VolumeChangeRequestEvent.TYPE = 'vds-volume-change-request';
//# sourceMappingURL=request.events.js.map
