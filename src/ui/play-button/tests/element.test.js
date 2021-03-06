import { elementUpdated, expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';

import { PauseRequestEvent, PlayRequestEvent } from '../../../media/index.js';
import { buildMediaFixture } from '../../../media/test-utils/index.js';
import {
  PLAY_BUTTON_ELEMENT_TAG_NAME,
  PlayButtonElement
} from '../PlayButtonElement.js';

window.customElements.define(PLAY_BUTTON_ELEMENT_TAG_NAME, PlayButtonElement);

describe(PLAY_BUTTON_ELEMENT_TAG_NAME, function () {
  // eslint-disable-next-line jsdoc/require-jsdoc
  async function buildFixture() {
    const { container, provider } = await buildMediaFixture(html`
      <vds-play-button>
        <div class="play"></div>
        <div class="pause"></div>
      </vds-play-button>
    `);

    provider.forceMediaReady();

    const button = /** @type {PlayButtonElement} */ (
      container.querySelector(PLAY_BUTTON_ELEMENT_TAG_NAME)
    );

    return { provider, button };
  }

  it('should render DOM correctly', async function () {
    const { button } = await buildFixture();
    expect(button).dom.to.equal(`
      <vds-play-button>
        <div class="play"></div>
        <div class="pause"></div>
      </vds-play-button>
    `);
  });

  it('should render shadow DOM correctly', async function () {
    const { button } = await buildFixture();
    expect(button).shadowDom.to.equal(`
      <button
        id="button"
        aria-label="Play"
        aria-pressed="false"
        part="button"
      >
        <slot></slot>
      </button>
    `);
  });

  it(`should emit ${PlayRequestEvent.TYPE} when clicked while paused`, async function () {
    const { provider, button } = await buildFixture();
    provider.paused = true;
    await elementUpdated(button);
    setTimeout(() => button.click());
    await oneEvent(button, PlayRequestEvent.TYPE);
  });

  it(`should emit ${PauseRequestEvent.TYPE} when clicked while not paused`, async function () {
    const { provider, button } = await buildFixture();
    provider.paused = false;
    await elementUpdated(button);
    setTimeout(() => button.click());
    await oneEvent(button, PauseRequestEvent.TYPE);
  });

  it('should receive transformed paused context updates', async function () {
    const { provider, button } = await buildFixture();
    provider.ctx.paused = false;
    await elementUpdated(button);
    expect(button.isPressed).to.be.true;
    expect(button).to.have.attribute('pressed');
    provider.ctx.paused = true;
    await elementUpdated(button);
    expect(button.isPressed).to.be.false;
    expect(button).to.not.have.attribute('pressed');
  });
});
