import { __decorate } from 'tslib';
import { state } from 'lit/decorators.js';
import { consumeContext } from '../../foundation/context/index.js';
import { mediaContext, MediaRemoteControl } from '../../media/index.js';
import { ToggleButtonElement } from '../toggle-button/index.js';
export const PLAY_BUTTON_ELEMENT_TAG_NAME = 'vds-play-button';
/**
 * A button for toggling the playback state (play/pause) of the current media.
 *
 *
 * @tagname vds-play-button
 * @slot play - The content to show when the `paused` state is `true`.
 * @slot pause - The content to show when the `paused` state is `false`.
 * @csspart button - The root button (`<vds-button>`).
 * @csspart button-* - All `vds-button` parts re-exported with the `button` prefix.
 * @example
 * ```html
 * <vds-play-button>
 *   <!-- Showing -->
 *   <div slot="play"></div>
 *   <!-- Hidden - `hidden` attribute will automatically be applied/removed -->
 *   <div slot="pause" hidden></div>
 * </vds-play-button>
 * ```
 */
export class PlayButtonElement extends ToggleButtonElement {
  constructor() {
    super(...arguments);
    /**
     * @protected
     * @readonly
     */
    this.remoteControl = new MediaRemoteControl(this);
    this.label = 'Play';
    /**
     * @internal
     * @type {boolean}
     */
    // Transforming `paused` to `!paused` to indicate whether playback has initiated/resumed. Can't
    // use `playing` because there could be a buffering delay (we want immediate feedback).
    this.pressed = false;
  }
  /**
   * The `play` slotted element.
   *
   * @type {HTMLElement | undefined}
   */
  get playSlotElement() {
    return this.currentNotPressedSlotElement;
  }
  /**
   * The `pause` slotted element.
   *
   * @type {HTMLElement | undefined}
   */
  get pauseSlotElement() {
    return this.currentPressedSlotElement;
  }
  getPressedSlotName() {
    return 'pause';
  }
  getNotPressedSlotName() {
    return 'play';
  }
  handleButtonClick(event) {
    if (this.pressed) {
      this.remoteControl.pause(event);
    } else {
      this.remoteControl.play(event);
    }
  }
}
__decorate(
  [state(), consumeContext(mediaContext.paused, { transform: (p) => !p })],
  PlayButtonElement.prototype,
  'pressed',
  void 0
);
//# sourceMappingURL=PlayButtonElement.js.map
