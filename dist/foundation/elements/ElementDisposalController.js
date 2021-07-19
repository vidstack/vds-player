import { DisposalBin } from '../events/index.js';
/**
 * Sets up a disposal bin that is emptied once the given `host` element disconnects from the DOM.
 */
export class ElementDisposalController {
  /**
   * @param {import('lit').ReactiveElement} host
   */
  constructor(host) {
    /**
     * @protected
     * @readonly
     */
    this.disconnectDisposal = new DisposalBin();
    host.addController({
      hostDisconnected: () => {
        this.disconnectDisposal.empty();
      }
    });
  }
  /**
   * Add callback to be called when `host` element disconnects from DOM.
   *
   * @param {() => void} [callback]
   */
  add(callback) {
    this.disconnectDisposal.add(callback);
  }
}
//# sourceMappingURL=ElementDisposalController.js.map
