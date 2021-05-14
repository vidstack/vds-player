import { html, TemplateResult } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { VdsMediaEvents, VdsMediaProviderEvents } from '../../core';
import {
  buildStorybookControlsFromManifest,
  DOMEventsToStorybookActions,
} from '../../shared/storybook';
import { VdsHlsEvents } from './hls.events';
import { HlsElementProps } from './hls.types';
import { VDS_HLS_ELEMENT_TAG_NAME } from './vds-hls';

export default {
  title: 'UI/Providers/HLS',
  component: VDS_HLS_ELEMENT_TAG_NAME,
  argTypes: {
    ...buildStorybookControlsFromManifest(VDS_HLS_ELEMENT_TAG_NAME),
    src: {
      defaultValue:
        'https://stream.mux.com/dGTf2M5TBA5ZhXvwEIOziAHBhF2Rn00jk79SZ4gAFPn8.m3u8',
    },
    poster: {
      defaultValue: 'https://media-files.vidstack.io/poster.png',
    },
  },
};

type Args = HlsElementProps &
  DOMEventsToStorybookActions<VdsMediaEvents> &
  DOMEventsToStorybookActions<VdsHlsEvents> &
  DOMEventsToStorybookActions<VdsMediaProviderEvents>;

function Template({
  // Props
  width,
  height,
  src,
  poster,
  paused,
  volume,
  currentTime = 0,
  muted,
  playsinline,
  loop,
  controls,
  crossOrigin,
  preload,
  controlsList,
  autoPiP,
  disablePiP,
  disableRemotePlayback,
  // HLS Events
  onVdsHlsEngineAttach,
  onVdsHlsEngineBuilt,
  onVdsHlsEngineDetach,
  onVdsHlsEngineNoSupport,
  // Media Provider Events
  onVdsMediaProviderConnect,
  // Media Events
  onVdsAbort,
  onVdsCanPlay,
  onVdsCanPlayThrough,
  onVdsDurationChange,
  onVdsEmptied,
  onVdsEnded,
  onVdsError,
  onVdsFullscreenChange,
  onVdsLoadedData,
  onVdsLoadedMetadata,
  onVdsLoadStart,
  onVdsMediaTypeChange,
  onVdsPause,
  onVdsPlay,
  onVdsPlaying,
  onVdsProgress,
  onVdsSeeked,
  onVdsSeeking,
  onVdsStalled,
  onVdsStarted,
  onVdsSuspend,
  onVdsReplay,
  onVdsTimeUpdate,
  onVdsViewTypeChange,
  onVdsVolumeChange,
  onVdsWaiting,
}: Args): TemplateResult {
  return html`
    <vds-hls
      src=${src}
      width=${ifDefined(width)}
      height=${ifDefined(height)}
      poster=${ifDefined(poster)}
      ?paused=${paused}
      volume=${volume}
      current-time=${currentTime}
      ?muted=${muted}
      ?playsinline=${playsinline}
      ?loop=${loop}
      ?controls=${controls}
      cross-origin=${ifDefined(crossOrigin)}
      preload=${ifDefined(preload)}
      controls-list=${ifDefined(controlsList)}
      ?auto-pip=${autoPiP}
      ?disable-pip=${disablePiP}
      ?disable-remote-playback=${disableRemotePlayback}
      @vds-media-provider-connect=${onVdsMediaProviderConnect}
      @vds-abort=${onVdsAbort}
      @vds-can-play=${onVdsCanPlay}
      @vds-can-play-through=${onVdsCanPlayThrough}
      @vds-duration-change=${onVdsDurationChange}
      @vds-emptied=${onVdsEmptied}
      @vds-ended=${onVdsEnded}
      @vds-error=${onVdsError}
      @vds-fullscreen-change=${onVdsFullscreenChange}
      @vds-loaded-data=${onVdsLoadedData}
      @vds-load-start=${onVdsLoadStart}
      @vds-loaded-metadata=${onVdsLoadedMetadata}
      @vds-media-type-change=${onVdsMediaTypeChange}
      @vds-pause=${onVdsPause}
      @vds-play=${onVdsPlay}
      @vds-playing=${onVdsPlaying}
      @vds-progress=${onVdsProgress}
      @vds-seeked=${onVdsSeeked}
      @vds-seeking=${onVdsSeeking}
      @vds-stalled=${onVdsStalled}
      @vds-started=${onVdsStarted}
      @vds-suspend=${onVdsSuspend}
      @vds-replay=${onVdsReplay}
      @vds-time-update=${onVdsTimeUpdate}
      @vds-view-type-change=${onVdsViewTypeChange}
      @vds-volume-change=${onVdsVolumeChange}
      @vds-waiting=${onVdsWaiting}
      @vds-hls-engine-built=${onVdsHlsEngineBuilt}
      @vds-hls-engine-attach=${onVdsHlsEngineAttach}
      @vds-hls-engine-detach=${onVdsHlsEngineDetach}
      @vds-hls-engine-no-support=${onVdsHlsEngineNoSupport}
    ></vds-hls>
  `;
}

export const HLS = Template.bind({});
