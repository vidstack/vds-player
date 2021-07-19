import { __decorate } from 'tslib';
import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { consumeContext } from '../../foundation/context/index.js';
import { mediaContext } from '../../media/index.js';
import { setAttribute } from '../../utils/dom.js';
import { bufferingIndicatorElementStyles } from './styles.js';
export const BUFFERING_INDICATOR_ELEMENT_TAG_NAME = 'vds-buffering-indicator';
/**
 * Display an indicator when either the provider/media is booting or media playback has
 * stopped because of a lack of temporary data.
 *
 * 💡 The styling is left to you, it will only apply the following attributes:
 *
 * - `media-can-play`: Applied when media can begin playback.
 * - `media-waiting`: Applied when playback has stopped because of a lack of temporary data.
 *
 * @tagname vds-buffering-indicator
 * @slot Used to pass in the content to be displayed while buffering.
 * @example
 * ```html
 * <vds-buffering-indicator>
 *   <!-- ... -->
 * </vds-buffering-indicator>
 * ```
 * @example
 * ```css
 * vds-buffering-indicator {
 *   opacity: 0;
 *   transition: opacity 0.3s ease-out;
 *   transition-delay: 500ms;
 * }
 *
 * vds-buffering-indicator[media-waiting],
 * vds-buffering-indicator:not([media-can-play]) {
 *   opacity: 1;
 * }
 * ```
 */
export class BufferingIndicatorElement extends LitElement {
  constructor() {
    super(...arguments);
    /**
     * @protected
     * @type {boolean}
     */
    this.mediaCanPlay = false;
    /**
     * @protected
     * @type {boolean}
     */
    this.mediaWaiting = false;
  }
  /** @type {import('lit').CSSResultGroup} */
  static get styles() {
    return [bufferingIndicatorElementStyles];
  }
  /**
   * @protected
   * @param {import('lit').PropertyValues} changedProperties
   */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has('mediaCanPlay')) {
      setAttribute(this, 'media-can-play', this.mediaCanPlay);
    }
    if (changedProperties.has('mediaWaiting')) {
      setAttribute(this, 'media-waiting', this.mediaWaiting);
    }
  }
  /** @returns {import('lit').TemplateResult} */
  render() {
    return html`<slot></slot>`;
  }
}
__decorate(
  [state(), consumeContext(mediaContext.canPlay)],
  BufferingIndicatorElement.prototype,
  'mediaCanPlay',
  void 0
);
__decorate(
  [state(), consumeContext(mediaContext.waiting)],
  BufferingIndicatorElement.prototype,
  'mediaWaiting',
  void 0
);
//# sourceMappingURL=BufferingIndicatorElement.js.map
