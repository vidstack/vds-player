/**
 * Sets up a disposal bin that is emptied once the given `host` element disconnects from the DOM.
 */
export class ElementDisposalController {
    /**
     * @param {import('lit').ReactiveElement} host
     */
    constructor(host: import('lit').ReactiveElement);
    /**
     * @protected
     * @readonly
     */
    protected readonly disconnectDisposal: DisposalBin;
    /**
     * Add callback to be called when `host` element disconnects from DOM.
     *
     * @param {() => void} [callback]
     */
    add(callback?: (() => void) | undefined): void;
}
import { DisposalBin } from "../events/events.js";
