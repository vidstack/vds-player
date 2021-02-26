import {
  LIB_PREFIX,
  buildVdsEvent,
  VdsCustomEvent,
  VdsCustomEventConstructor,
} from '../shared';
import { PlayerState } from './player.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface GlobalEventHandlersEventMap extends VdsPlayerEvents {}
}

export type RawPlayerEventType =
  | 'play'
  | 'pause'
  | 'playing'
  | 'poster-change'
  | 'src-change'
  | 'muted-change'
  | 'volume-change'
  | 'time-change'
  | 'duration-change'
  | 'buffered-change'
  | 'buffering-change'
  | 'view-type-change'
  | 'media-type-change'
  | 'boot-start'
  | 'boot-end'
  | 'playback-ready'
  | 'playback-start'
  | 'playback-end'
  | 'error';

export type RawPlayerEventDetailType = {
  play: void;
  pause: void;
  playing: void;
  'poster-change': PlayerState['currentPoster'];
  'src-change': PlayerState['currentSrc'];
  'muted-change': PlayerState['muted'];
  'volume-change': PlayerState['volume'];
  'time-change': PlayerState['currentTime'];
  'duration-change': PlayerState['duration'];
  'buffered-change': PlayerState['buffered'];
  'buffering-change': PlayerState['isBuffering'];
  'view-type-change': PlayerState['viewType'];
  'media-type-change': PlayerState['mediaType'];
  'boot-start': void;
  'boot-end': void;
  'playback-ready': void;
  'playback-start': void;
  'playback-end': void;
  error: unknown;
};

export type GenericVdsPlayerEventType<
  T extends string
> = `${typeof LIB_PREFIX}-${T}`;

export type PlayerEventConstructor<
  T extends RawPlayerEventType
> = VdsCustomEventConstructor<
  RawPlayerEventDetailType[T],
  GenericVdsPlayerEventType<T>
>;

export type VdsPlayerEventConstructors = {
  [P in RawPlayerEventType as GenericVdsPlayerEventType<P>]: PlayerEventConstructor<P>;
};

export type VdsPlayerEvents = {
  [P in RawPlayerEventType as GenericVdsPlayerEventType<P>]: VdsCustomEvent<
    RawPlayerEventDetailType[P],
    GenericVdsPlayerEventType<P>
  >;
};

export type VdsPlayerEventType = keyof VdsPlayerEvents;

export function buildsVdsPlayerEvent<T extends RawPlayerEventType>(
  type: T,
): PlayerEventConstructor<T> {
  return buildVdsEvent(type) as PlayerEventConstructor<T>;
}

export class PlayEvent extends buildsVdsPlayerEvent('play') {}

export class PauseEvent extends buildsVdsPlayerEvent('pause') {}

export class PlayingEvent extends buildsVdsPlayerEvent('playing') {}

export class CurrentSrcChangeEvent extends buildsVdsPlayerEvent('src-change') {}

export class PosterChangeEvent extends buildsVdsPlayerEvent('poster-change') {}

export class MutedChangeEvent extends buildsVdsPlayerEvent('muted-change') {}

export class VolumeChangeEvent extends buildsVdsPlayerEvent('volume-change') {}

export class TimeChangeEvent extends buildsVdsPlayerEvent('time-change') {}

export class DurationChangeEvent extends buildsVdsPlayerEvent(
  'duration-change',
) {}

export class BufferedChangeEvent extends buildsVdsPlayerEvent(
  'buffered-change',
) {}

export class BufferingChangeEvent extends buildsVdsPlayerEvent(
  'buffered-change',
) {}

export class ViewTypeChangeEvent extends buildsVdsPlayerEvent(
  'view-type-change',
) {}

export class MediaTypeChangeEvent extends buildsVdsPlayerEvent(
  'media-type-change',
) {}

export class PlaybackReadyEvent extends buildsVdsPlayerEvent(
  'playback-ready',
) {}

export class PlaybackStartEvent extends buildsVdsPlayerEvent(
  'playback-start',
) {}

export class PlaybackEndEvent extends buildsVdsPlayerEvent('playback-end') {}

export class ErrorEvent extends buildsVdsPlayerEvent('error') {}
