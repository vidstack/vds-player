import { __decorate } from 'tslib';
// ** Dependencies **
import '../time-slider/define.js';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { provideContextRecord } from '../../foundation/context/index.js';
import {
  forwardEvent,
  ifNonEmpty,
  on
} from '../../foundation/directives/index.js';
import { WithFocus } from '../../foundation/elements/index.js';
import { EventListenerController } from '../../foundation/events/index.js';
import { buildExportPartsAttr } from '../../utils/dom.js';
import { isNil } from '../../utils/unit.js';
import {
  ScrubberPreviewConnectEvent,
  ScrubberPreviewHideEvent,
  ScrubberPreviewShowEvent,
  ScrubberPreviewTimeUpdateEvent
} from '../scrubber-preview/index.js';
import { SeekableProgressBarElement } from '../seekable-progress-bar/index.js';
import {
  SliderDragEndEvent,
  SliderDragStartEvent,
  SliderValueChangeEvent
} from '../slider/index.js';
import { TimeSliderElement } from '../time-slider/index.js';
import { scrubberContext } from './context.js';
import { scrubberElementStyles } from './styles.js';
export const SCRUBBER_ELEMENT_TAG_NAME = 'vds-scrubber';
/**
 * A control that displays the progression of playback and the amount seekable on a slider. This
 * control can be used to update the current playback time by interacting with the slider.
 *
 * 💡 See the `<vds-scrubber-preview>` element if you'd like to include previews.
 *
 * @tagname vds-scrubber
 * @csspart time-slider - The time slider (`<vds-time-slider>`).
 * @csspart time-slider-* - All `vds-time-slider` parts re-exported with the `time-slider` prefix.
 * @csspart progress-bar - The progress bar (`<vds-seekable-progress-bar>`).
 * @csspart progress-bar-* - All `vds-seekable-progress-bar` parts re-exported with the `progress-bar` prefix.
 * @slot Used to pass content into the slider.
 * @slot progress-bar - Used to pass content into the progress bar.
 */
export class ScrubberElement extends WithFocus(LitElement) {
  constructor() {
    super(...arguments);
    // -------------------------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------------------------
    /**
     * @protected
     * @readonly
     */
    this.context = provideContextRecord(this, scrubberContext);
    /**
     * Whether the scrubber should be disabled (not-interactable).
     *
     * @type {boolean}
     */
    this.disabled = false;
    /**
     * Whether the scrubber should be hidden.
     *
     * @type {boolean}
     */
    this.hidden = false;
    /**
     * ♿ **ARIA:** The `aria-label` for the time slider.
     *
     * @type {string}
     */
    this.label = 'Media time slider';
    /**
     * The time slider orientation.
     *
     * @type {'horizontal' | 'vertical'}
     */
    this.orientation = 'horizontal';
    /**
     * ♿ **ARIA:** The `aria-label` for the progress bar.
     *
     * @type {string}
     */
    this.progressLabel = 'Amount of seekable media';
    /**
     * ♿ **ARIA:** Human-readable text alternative for the progress bar value. If you pass
     * in a string containing `{seekableAmount}` or `{duration}` templates they'll be replaced with
     * the spoken form such as `1 hour 30 minutes`.
     *
     * @type {string}
     */
    this.progressValueText = '{seekableAmount} out of {duration}';
    /**
     * Whether the scrubber should request playback to pause while the user is dragging the
     * thumb. If the media was playing before the dragging starts, the state will be restored by
     * dispatching a user play request once the dragging ends.
     *
     * @type {boolean}
     */
    this.pauseWhileDragging = false;
    /**
     * A number that specifies the granularity that the time slider value must adhere to in seconds.
     * For example, a step with the value `1` indicates a granularity of 1 second increments.
     *
     * @type {number}
     */
    this.step = 0.25;
    /**
     * ♿ **ARIA:** A number that specifies the number of steps taken when interacting with
     * the time slider via keyboard. Think of it as `step * keyboardStep`.
     *
     * @type {number}
     */
    this.keyboardStep = 20;
    /**
     * ♿ **ARIA:** A number that will be used to multiply the `keyboardStep` when the `Shift` key
     * is held down and the slider value is changed by pressing `LeftArrow` or `RightArrow`. Think
     * of it as `keyboardStep * shiftKeyMultiplier`.
     *
     * @type {number}
     */
    this.shiftKeyMultiplier = 2;
    /**
     * The amount of milliseconds to throttle media seeking request events being dispatched.
     *
     * @type {number}
     */
    this.seekingRequestThrottle = 100;
    /**
     * ♿ **ARIA:** Human-readable text alternative for the time slider value. If you pass
     * in a string containing `{currentTime}` or `{duration}` templates they'll be replaced with
     * the spoken form such as `1 hour 30 minutes`.
     *
     * @type {string}
     */
    this.valueText = '{currentTime} out of {duration}';
    // -------------------------------------------------------------------------------------------
    // Pointer Events
    // -------------------------------------------------------------------------------------------
    /**
     * @protected
     * @readonly
     */
    this.pointerEventListenerController = new EventListenerController(this, {
      pointerenter: this.handlePointerEnter,
      pointermove: this.handlePointerMove,
      pointerleave: this.handlePointerLeave
    });
    // -------------------------------------------------------------------------------------------
    // Time Slider
    // -------------------------------------------------------------------------------------------
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<TimeSliderElement>}
     */
    this.timeSliderRef = createRef();
    // -------------------------------------------------------------------------------------------
    // Seekable Progress Bar
    // -------------------------------------------------------------------------------------------
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<SeekableProgressBarElement>}
     */
    this.progressBarRef = createRef();
    // -------------------------------------------------------------------------------------------
    // Scrubber Preview
    // -------------------------------------------------------------------------------------------
    /**
     * @protected
     * @readonly
     */
    this.previewEventListenerController = new EventListenerController(this, {
      [ScrubberPreviewConnectEvent.TYPE]: this.handlePreviewConnect,
      [ScrubberPreviewShowEvent.TYPE]: this.handlePreviewShow,
      [ScrubberPreviewTimeUpdateEvent.TYPE]: this.handlePreviewTimeUpdate,
      [ScrubberPreviewHideEvent.TYPE]: this.handlePreviewHide
    });
  }
  /**
   * @type {import('lit').CSSResultGroup}
   */
  static get styles() {
    return [scrubberElementStyles];
  }
  /**
   * @type {string[]}
   */
  static get parts() {
    const timeSliderExports = TimeSliderElement.parts.map(
      (part) => `time-slider-${part}`
    );
    const seekableProgressBarExports = SeekableProgressBarElement.parts.map(
      (part) => `progress-bar-${part}`
    );
    return [
      'time-slider',
      'progress-bar',
      ...timeSliderExports,
      ...seekableProgressBarExports
    ];
  }
  // -------------------------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------------------------
  /**
   * @param {import('lit').PropertyValues} changedProperties
   */
  update(changedProperties) {
    var _a;
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        (_a = this.scrubberPreviewElement) === null || _a === void 0
          ? void 0
          : _a.hidePreview();
      }
      if (!isNil(this.scrubberPreviewElement)) {
        this.scrubberPreviewElement.disabled = this.disabled;
      }
    }
    if (changedProperties.has('hidden')) {
      if (!isNil(this.scrubberPreviewElement)) {
        this.scrubberPreviewElement.hidden = this.hidden;
      }
    }
    super.update(changedProperties);
  }
  render() {
    return html`${this.renderTimeSlider()}`;
  }
  /**
   * @protected
   * @param {PointerEvent} event
   */
  handlePointerEnter(event) {
    var _a;
    if (this.disabled) return;
    this.context.pointing = true;
    this.setAttribute('pointing', '');
    (_a = this.scrubberPreviewElement) === null || _a === void 0
      ? void 0
      : _a.showPreview(event);
  }
  /**
   * @protected
   * @param {PointerEvent} event
   */
  handlePointerMove(event) {
    var _a;
    if (this.disabled || this.context.dragging) return;
    (_a = this.scrubberPreviewElement) === null || _a === void 0
      ? void 0
      : _a.updatePreviewPosition(event);
  }
  /**
   * @protected
   * @param {PointerEvent} event
   */
  handlePointerLeave(event) {
    var _a;
    if (this.disabled) return;
    this.context.pointing = false;
    this.removeAttribute('pointing');
    if (!this.context.dragging) {
      (_a = this.scrubberPreviewElement) === null || _a === void 0
        ? void 0
        : _a.hidePreview(event);
    }
  }
  /**
   * Returns the underlying `vds-time-slider` component.
   *
   * @type {TimeSliderElement}
   */
  get timeSliderElement() {
    return /** @type {TimeSliderElement} */ (this.timeSliderRef.value);
  }
  /**
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderTimeSlider() {
    return html`
      <vds-time-slider
        id="time-slider"
        exportparts=${this.getTimeSliderExportPartsAttr()}
        label=${ifNonEmpty(this.label)}
        orientation=${this.orientation}
        part=${this.getTimeSliderPartAttr()}
        step=${this.step}
        keyboard-step=${this.keyboardStep}
        shift-key-multiplier=${this.shiftKeyMultiplier}
        value-text=${this.valueText}
        ?disabled=${this.disabled}
        ?hidden=${this.hidden}
        ${on(SliderDragStartEvent.TYPE, this.handleSliderDragStart)}
        ${on(SliderValueChangeEvent.TYPE, this.handleSliderValueChange)}
        ${on(SliderDragEndEvent.TYPE, this.handleSliderDragEnd)}
        ${forwardEvent(SliderDragStartEvent.TYPE)}
        ${forwardEvent(SliderValueChangeEvent.TYPE)}
        ${forwardEvent(SliderDragEndEvent.TYPE)}
        ${ref(this.timeSliderRef)}
      >
        ${this.renderTimeSliderChildren()}
      </vds-time-slider>
    `;
  }
  /**
   * @protected
   * @returns {string}
   */
  getTimeSliderPartAttr() {
    return 'time-slider';
  }
  /**
   * @protected
   * @returns {string}
   */
  getTimeSliderExportPartsAttr() {
    return buildExportPartsAttr(TimeSliderElement.parts, 'time-slider');
  }
  /**
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderTimeSliderChildren() {
    return html`${this.renderDefaultSlot()}${this.renderProgressBar()}`;
  }
  /**
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderDefaultSlot() {
    return html`<slot></slot>`;
  }
  /**
   * @protected
   * @param {SliderDragStartEvent} event
   */
  handleSliderDragStart(event) {
    var _a;
    if (this.disabled) return;
    this.context.dragging = true;
    this.setAttribute('dragging', '');
    (_a = this.scrubberPreviewElement) === null || _a === void 0
      ? void 0
      : _a.showPreview(event);
  }
  /**
   * @protected
   * @param {SliderValueChangeEvent} event
   */
  handleSliderValueChange(event) {
    var _a;
    if (this.disabled) return;
    (_a = this.scrubberPreviewElement) === null || _a === void 0
      ? void 0
      : _a.updatePreviewPosition(event);
  }
  /**
   * @protected
   * @param {SliderDragEndEvent} event
   */
  handleSliderDragEnd(event) {
    var _a;
    if (this.disabled) return;
    this.context.dragging = false;
    this.removeAttribute('dragging');
    (_a = this.scrubberPreviewElement) === null || _a === void 0
      ? void 0
      : _a.hidePreview(event);
  }
  /**
   * Returns the underlying `<vds-seekable-progress-bar>` component.
   *
   * @type {SeekableProgressBarElement}
   */
  get progressBarElement() {
    return /** @type {SeekableProgressBarElement} */ (
      this.progressBarRef.value
    );
  }
  /**
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderProgressBar() {
    return html`
      <vds-seekable-progress-bar
        id="progress-bar"
        part=${this.getProgressBarPartAttr()}
        exportparts=${this.getProgressBarExportPartsAttr()}
        label=${this.progressLabel}
        value-text=${this.progressValueText}
        ${ref(this.progressBarRef)}
      >
        ${this.renderProgressBarChildren()}
      </vds-seekable-progress-bar>
    `;
  }
  /**
   * @protected
   * @returns {string}
   */
  getProgressBarPartAttr() {
    return 'progress-bar';
  }
  /**
   * @protected
   * @returns {string}
   */
  getProgressBarExportPartsAttr() {
    return buildExportPartsAttr(
      SeekableProgressBarElement.parts,
      'progress-bar'
    );
  }
  /**
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderProgressBarChildren() {
    return this.renderProgressBarSlot();
  }
  /**
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  renderProgressBarSlot() {
    return html`<slot name=${this.getProgressBarSlotName()}></slot>`;
  }
  /**
   * @protected
   * @returns {string}
   */
  getProgressBarSlotName() {
    return 'progress-bar';
  }
  /**
   * The scrubber preview element `<vds-scrubber-preview>` (if given).
   *
   * @type {ScrubberPreviewElement | undefined}
   */
  get scrubberPreviewElement() {
    return this._scrubberPreviewElement;
  }
  /**
   * @protected
   * @param {ScrubberPreviewConnectEvent} event
   */
  handlePreviewConnect(event) {
    event.stopPropagation();
    const { element, onDisconnect } = event.detail;
    this._scrubberPreviewElement = element;
    this.setAttribute('previewable', '');
    onDisconnect(() => {
      this._scrubberPreviewElement = undefined;
      this.removeAttribute('previewable');
    });
  }
  /**
   * @protected
   * @param {ScrubberPreviewShowEvent} event
   */
  handlePreviewShow(event) {
    event.stopPropagation();
    this.setAttribute('previewing', '');
  }
  /**
   * @protected
   * @param {ScrubberPreviewTimeUpdateEvent} event
   */
  handlePreviewTimeUpdate(event) {
    event.stopPropagation();
  }
  /**
   * @protected
   * @param {ScrubberPreviewHideEvent} event
   */
  handlePreviewHide(event) {
    event.stopPropagation();
    this.removeAttribute('previewing');
  }
}
__decorate(
  [property({ type: Boolean, reflect: true })],
  ScrubberElement.prototype,
  'disabled',
  void 0
);
__decorate(
  [property({ type: Boolean, reflect: true })],
  ScrubberElement.prototype,
  'hidden',
  void 0
);
__decorate(
  [property({ reflect: true })],
  ScrubberElement.prototype,
  'label',
  void 0
);
__decorate(
  [property({ reflect: true })],
  ScrubberElement.prototype,
  'orientation',
  void 0
);
__decorate(
  [property({ attribute: 'progress-label', reflect: true })],
  ScrubberElement.prototype,
  'progressLabel',
  void 0
);
__decorate(
  [property({ attribute: 'progress-value-text' })],
  ScrubberElement.prototype,
  'progressValueText',
  void 0
);
__decorate(
  [property({ attribute: 'pause-while-dragging', type: Boolean })],
  ScrubberElement.prototype,
  'pauseWhileDragging',
  void 0
);
__decorate(
  [property({ type: Number })],
  ScrubberElement.prototype,
  'step',
  void 0
);
__decorate(
  [property({ attribute: 'keyboard-step', type: Number })],
  ScrubberElement.prototype,
  'keyboardStep',
  void 0
);
__decorate(
  [property({ attribute: 'shift-key-multiplier', type: Number })],
  ScrubberElement.prototype,
  'shiftKeyMultiplier',
  void 0
);
__decorate(
  [property({ attribute: 'seeking-request-throttle', type: Number })],
  ScrubberElement.prototype,
  'seekingRequestThrottle',
  void 0
);
__decorate(
  [property({ attribute: 'value-tex' })],
  ScrubberElement.prototype,
  'valueText',
  void 0
);
//# sourceMappingURL=ScrubberElement.js.map
