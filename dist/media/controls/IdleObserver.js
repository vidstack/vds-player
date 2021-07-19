import { EventListenerController } from '../../foundation/events/index.js';
import { controlsContext } from './context.js';
import {
  IdleChangeEvent,
  PauseIdleTrackingRequestEvent,
  ResumeIdleTrackingRequestEvent
} from './events.js';
/**
 * @typedef {import('lit').ReactiveElement} IdleObserverHost
 */
/**
 * Tracks user activity and determines when they are idle/inactive. Elements can dispatch requests
 * to pause/resume tracking idle state.
 */
export class IdleObserver {
  /**
   * @param {IdleObserverHost} host
   */
  constructor(host) {
    /**
     * Prevent an `idle` state occurring.
     *
     * @protected
     * @type {boolean}
     */
    this.preventIdling = false;
    /**
     * The amount of time in `ms` to pass before considering the user to be idle.
     *
     * @type {number}
     */
    this.timeout = 3000;
    /**
     * @protected
     * @type {number}
     */
    this.timeoutId = -1;
    /**
     * @private
     * @type {boolean}
     */
    this.prevIdleValue = controlsContext.idle.initialValue;
    /**
     * @protected
     * @readonly
     * @type {IdleObserverHost}
     */
    this.host = host;
    /**
     * @protected
     * @readonly
     */
    this.idle = controlsContext.idle.provide(host);
    /**
     * @protected
     * @readonly
     * @type {EventListenerController}
     */
    this[Symbol(EventListenerController.name)] = new EventListenerController(
      this.host,
      {
        focus: this.pause,
        blur: this.resume,
        keydown: this.handleUserInteraction,
        click: this.handleUserInteraction,
        pointermove: this.handleUserInteraction,
        [PauseIdleTrackingRequestEvent.TYPE]: this.handlePauseIdleTracking,
        [ResumeIdleTrackingRequestEvent.TYPE]: this.handleResumeIdleTracking
      },
      { receiver: this }
    );
  }
  /**
   * Whether there has been no user activity for the given `timeout` period or greater.
   *
   * @type {boolean}
   */
  get isIdle() {
    return this.idle.value;
  }
  /**
   * @protected
   * @param {Event} [request]
   */
  handleUserInteraction(request) {
    this.start(request);
  }
  /**
   * Start tracking idle state. If `pause` is called this method will do nothing until `resume`
   * is called.
   *
   * @param {Event} [request]
   */
  start(request) {
    this.stop(request);
    if (this.preventIdling) return;
    this.timeoutId = window.setTimeout(() => {
      this.idle.value = true;
      this.handleIdleChange(request);
    }, this.timeout);
  }
  /**
   * Enables tracking idle state to resume.
   *
   * @param {Event} [request]
   */
  resume(request) {
    this.preventIdling = false;
    this.start(request);
  }
  /**
   * Pause tracking idle state. Prevents further idle states to occur until `resume` is called.
   *
   * @param {Event} [request]
   */
  pause(request) {
    this.preventIdling = true;
    this.stop(request);
  }
  /**
   * Stop idling.
   *
   * @param {Event} [request]
   */
  stop(request) {
    window.clearTimeout(this.timeoutId);
    this.idle.value = false;
    this.handleIdleChange(request);
  }
  /**
   * @protected
   * @param {Event} [request]
   */
  handleIdleChange(request) {
    if (this.idle.value === this.prevIdleValue) return;
    this.host.dispatchEvent(
      new IdleChangeEvent({
        originalEvent: request,
        detail: this.isIdle
      })
    );
    this.prevIdleValue = this.idle.value;
  }
  /**
   * @protected
   * @param {Event} request
   */
  handlePauseIdleTracking(request) {
    request.stopPropagation();
    this.pause();
  }
  /**
   * @protected
   * @param {Event} request
   */
  handleResumeIdleTracking(request) {
    request.stopPropagation();
    this.resume();
  }
}
//# sourceMappingURL=IdleObserver.js.map
