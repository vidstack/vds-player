import {
  buildVdsEvent,
  ExtractEventDetailType,
  VdsCustomEvent,
  VdsCustomEventConstructor,
  VdsEvents,
} from '../../shared/events';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface GlobalEventHandlersEventMap extends VdsBufferingIndicatorEvents {}
}

export interface BufferingIndicatorEvents {
  'buffering-show': VdsCustomEvent<void>;
  'buffering-hide': VdsCustomEvent<void>;
}

export type VdsBufferingIndicatorEvents = VdsEvents<BufferingIndicatorEvents>;

export function buildVdsBufferingIndicatorEvent<
  P extends keyof BufferingIndicatorEvents,
  DetailType = ExtractEventDetailType<BufferingIndicatorEvents[P]>
>(type: P): VdsCustomEventConstructor<DetailType> {
  return class VdsBufferingIndicatorEvent extends buildVdsEvent<DetailType>(
    type,
  ) {};
}

/**
 * Emitted when the buffering indicator is shown.
 */
export class VdsBufferingIndicatorShowEvent extends buildVdsBufferingIndicatorEvent(
  'buffering-show',
) {}

/**
 * Emitted when the buffering indicator is hidden.
 */
export class VdsBufferingIndicatorHideEvent extends buildVdsBufferingIndicatorEvent(
  'buffering-hide',
) {}