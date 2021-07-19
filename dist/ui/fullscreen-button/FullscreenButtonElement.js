import { __decorate } from 'tslib';
import { state } from 'lit/decorators.js';
import { consumeContext } from '../../foundation/context/index.js';
import { mediaContext, MediaRemoteControl } from '../../media/index.js';
import { ToggleButtonElement } from '../toggle-button/index.js';
export const FULLSCREEN_BUTTON_ELEMENT_TAG_NAME = 'vds-fullscreen-button';
/**
 * A button for toggling the fullscreen mode of the player.
 *
 *
 * @tagname vds-fullscreen-button
 * @slot enter - The content to show when the `fullscreen` state is `false`.
 * @slot exit - The content to show when the `fullscreen` state is `true`.
 * @csspart button - The root button (`<vds-button>`).
 * @csspart button-* - All `vds-button` parts re-exported with the `button` prefix.
 * @example
 * ```html
 * <vds-fullscreen-button>
 *   <!-- Showing -->
 *   <div slot="enter"></div>
 *   <!-- Hidden - `hidden` attribute will automatically be applied/removed -->
 *   <div slot="exit" hidden></div>
 * </vds-fullscreen-button>
 * ```
 */
export class FullscreenButtonElement extends ToggleButtonElement {
  constructor() {
    super(...arguments);
    /**
     * @protected
     * @readonly
     */
    this.remoteControl = new MediaRemoteControl(this);
    this.label = 'Fullscreen';
    /**
     * @internal
     * @type {boolean}
     */
    this.pressed = mediaContext.fullscreen.initialValue;
  }
  /**
   * The `enter` slotted element.
   *
   * @type {HTMLElement | undefined}
   */
  get enterSlotElement() {
    return this.currentNotPressedSlotElement;
  }
  /**
   * The `exit` slotted element.
   *
   * @type {HTMLElement | undefined}
   */
  get exitSlotElement() {
    return this.currentPressedSlotElement;
  }
  getPressedSlotName() {
    return 'exit';
  }
  getNotPressedSlotName() {
    return 'enter';
  }
  handleButtonClick(event) {
    if (this.pressed) {
      this.remoteControl.exitFullscreen(event);
    } else {
      this.remoteControl.enterFullscreen(event);
    }
  }
}
__decorate(
  [state(), consumeContext(mediaContext.fullscreen)],
  FullscreenButtonElement.prototype,
  'pressed',
  void 0
);
//# sourceMappingURL=FullscreenButtonElement.js.map
