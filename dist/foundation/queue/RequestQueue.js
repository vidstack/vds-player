import { deferredPromise } from '../../utils/promise.js';
/**
 * @template {string|symbol} RequestKey
 * @template {() => void | Promise <void>} RequestCallback
 */
export class RequestQueue {
  constructor() {
    /**
     * @protected
     * @type {Map<RequestKey, RequestCallback>}
     */
    this.requestQueue = new Map();
    /**
     * @protected
     */
    this.pendingFlush = deferredPromise();
    /**
     * Whether callbacks should be called immediately or queued and flushed at a later time.
     */
    this.serveImmediately = false;
  }
  /**
   * The number of callbacks that are currently in queue.
   *
   * @type {number}
   */
  get size() {
    return this.requestQueue.size;
  }
  /**
   * Returns a clone of the current request queue.
   *
   * @returns {Map<RequestKey, RequestCallback>}
   */
  cloneQueue() {
    return new Map(this.requestQueue);
  }
  /**
   * Waits for the queue to be flushed.
   *
   * @returns {Promise<void>}
   */
  async waitForFlush() {
    if (this.serveImmediately) return;
    await this.pendingFlush.promise;
  }
  /**
   * @param {RequestKey} key
   * @param {RequestCallback} callback
   * @returns {Promise<void>}
   */
  async queue(key, callback) {
    this.requestQueue.set(key, callback);
    if (!this.serveImmediately) return;
    this.serve(key);
  }
  /**
   * @param {RequestKey} key
   * @returns {Promise<void>}
   */
  async serve(key) {
    var _a;
    await ((_a = this.requestQueue.get(key)) === null || _a === void 0
      ? void 0
      : _a());
    this.requestQueue.delete(key);
  }
  /**
   * @returns {Promise<void>}
   */
  async flush() {
    const requests = Array.from(this.requestQueue.keys());
    await Promise.all(requests.map((reqKey) => this.serve(reqKey)));
    this.reset();
  }
  /**
   */
  reset() {
    this.requestQueue.clear();
    // Release anyone waiting.
    this.pendingFlush.resolve();
    this.pendingFlush = deferredPromise();
  }
  /**
   */
  destroy() {
    this.serveImmediately = false;
    this.reset();
  }
}
//# sourceMappingURL=RequestQueue.js.map
