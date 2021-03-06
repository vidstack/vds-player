import './define.js';

import { html } from 'lit';

import { ifNonEmpty } from '../../foundation/directives/index.js';
import { StorybookControl } from '../../foundation/storybook/index.js';
import { TIME_ELEMENT_TAG_NAME } from './TimeElement.js';

export const TIME_ELEMENT_STORYBOOK_ARG_TYPES = {
  alwaysShowHours: {
    control: StorybookControl.Boolean,
    defaultValue: false
  },
  label: { control: StorybookControl.Text },
  padHours: { control: StorybookControl.Boolean, defaultValue: false },
  seconds: { control: StorybookControl.Number, defaultValue: 0 }
};

export default {
  title: 'UI/Time/Time',
  component: TIME_ELEMENT_TAG_NAME,
  argTypes: TIME_ELEMENT_STORYBOOK_ARG_TYPES,
  excludeStories: /.*STORYBOOK_ARG_TYPES$/
};

/**
 * @param {any} args
 * @returns {import('lit').TemplateResult}
 */
function Template({
  // Properties
  label,
  seconds,
  alwaysShowHours,
  padHours
}) {
  return html`
    <vds-time
      label=${ifNonEmpty(label)}
      seconds=${seconds}
      ?always-show-hours=${alwaysShowHours}
      ?pad-hours=${padHours}
    ></vds-time>
  `;
}

export const Time = Template.bind({});
