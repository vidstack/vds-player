import { elementUpdated, expect } from '@open-wc/testing';
import { html } from 'lit';

import { buildMediaFixture } from '../../../media/test-utils/index.js';
import {
  TOGGLE_BUTTON_ELEMENT_TAG_NAME,
  ToggleButtonElement
} from '../ToggleButtonElement.js';

window.customElements.define(
  TOGGLE_BUTTON_ELEMENT_TAG_NAME,
  ToggleButtonElement
);

describe(TOGGLE_BUTTON_ELEMENT_TAG_NAME, function () {
  // eslint-disable-next-line jsdoc/require-jsdoc
  async function buildFixture() {
    const { container } = await buildMediaFixture(html`
      <vds-toggle-button>
        <div class="pressed"></div>
        <div class="not-pressed"></div>
      </vds-toggle-button>
    `);

    const toggle = /** @type {ToggleButtonElement} */ (
      container.querySelector(TOGGLE_BUTTON_ELEMENT_TAG_NAME)
    );

    return { toggle };
  }

  it('should render DOM correctly', async function () {
    const { toggle } = await buildFixture();
    expect(toggle).dom.to.equal(`
      <vds-toggle-button>
        <div class="pressed"></div>
        <div class="not-pressed"></div>
      </vds-toggle-button>
    `);
  });

  it('should render shadow DOM correctly', async function () {
    const { toggle } = await buildFixture();
    expect(toggle).shadowDom.to.equal(`
      <button
        id="button"
        part="button"
        aria-pressed="false"
      >
        <slot></slot>
      </button>
    `);
  });

  it('should toggle pressed state on click', async function () {
    const { toggle } = await buildFixture();

    toggle.click();
    await elementUpdated(toggle);

    expect(toggle).to.have.attribute('pressed');

    toggle.click();
    await elementUpdated(toggle);

    expect(toggle).to.not.have.attribute('pressed');
  });

  it('should prevent clicking when disabled', async function () {
    const { toggle } = await buildFixture();

    toggle.disabled = true;
    toggle.click();

    await elementUpdated(toggle);

    expect(toggle).to.have.attribute('disabled');
    expect(toggle).to.not.have.attribute('pressed');
  });
});
