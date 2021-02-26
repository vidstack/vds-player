import { listen } from '@wcom/events';
import { Constructor, UpdatingElement } from 'lit-element';
import {
  ProviderSrcChangeEvent,
  ProviderDisconnectEvent,
  ProviderMediaTypeChangeEvent,
} from '..';
import { MediaType, PlayerState } from '../player.types';

export type MediaTypeMixinBase = Constructor<UpdatingElement>;

export type MediaTypeCocktail<T extends MediaTypeMixinBase> = T &
  Constructor<Pick<PlayerState, 'mediaType' | 'isAudio' | 'isVideo'>>;

/**
 * Mixes in properties for checking the current view type, and handles updating the media
 * type when certain provider events are emitted.
 *
 * @param Base - The constructor to mix into.
 */
export function MediaTypeMixin<T extends MediaTypeMixinBase>(
  Base: T,
): MediaTypeCocktail<T> {
  class MediaTypeMixin extends Base {
    protected _mediaType = MediaType.Unknown;

    @listen(ProviderMediaTypeChangeEvent.TYPE)
    protected handleMediaTypeChange(e: ProviderMediaTypeChangeEvent) {
      this._mediaType = e.detail;
    }

    @listen(ProviderSrcChangeEvent.TYPE)
    @listen(ProviderDisconnectEvent.TYPE)
    protected handleMediaTypeReset() {
      this._mediaType = MediaType.Unknown;
    }

    get mediaType(): PlayerState['mediaType'] {
      return this._mediaType;
    }

    get isAudio(): PlayerState['isAudio'] {
      return this.mediaType === MediaType.Audio;
    }

    get isVideo(): PlayerState['isVideo'] {
      return this.mediaType === MediaType.Video;
    }
  }

  return MediaTypeMixin;
}
