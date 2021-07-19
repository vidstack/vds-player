import { StorybookControl } from '../../foundation/storybook/index.js';
import { MEDIA_PROVIDER_ELEMENT_STORYBOOK_ARG_TYPES } from '../../media/provider/storybook.js';
export const HTML5_MEDIA_ELEMENT_STORYBOOK_ARG_TYPES = Object.assign(
  Object.assign({}, MEDIA_PROVIDER_ELEMENT_STORYBOOK_ARG_TYPES),
  {
    controlsList: { control: StorybookControl.Text },
    crossOrigin: { control: StorybookControl.Text },
    defaultMuted: { control: StorybookControl.Boolean },
    defaultPlaybackRate: { control: StorybookControl.Number },
    disableRemotePlayback: { control: StorybookControl.Boolean },
    height: { control: StorybookControl.Number },
    preload: { control: StorybookControl.Text },
    srcObject: { control: StorybookControl.Text },
    width: { control: StorybookControl.Number }
  }
);
//# sourceMappingURL=storybook.js.map
