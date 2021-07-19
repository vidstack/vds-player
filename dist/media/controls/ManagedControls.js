import {
  ManagedElement,
  ManagedElementConnectEvent
} from '../../foundation/elements/index.js';
/**
 * @typedef {import('lit').ReactiveElement} ManagedControlsHost
 */
/**
 * Fired when connecting a new controls manager with the `MediaControllerElement`.
 *
 * @bubbles
 * @composed
 * @augments ManagedElementConnectEvent<ManagedControlsHost>
 */
export class ManagedControlsConnectEvent extends ManagedElementConnectEvent {}
/** @readonly */
ManagedControlsConnectEvent.TYPE = 'vds-managed-controls-connect';
/**
 * @augments {ManagedElement<ManagedControlsHost>}
 */
export class ManagedControls extends ManagedElement {
  /**
   * @protected
   * @type {import('../../foundation/elements').ScopedDiscoveryEvent<any>}
   */
  static get ScopedDiscoveryEvent() {
    return ManagedControlsConnectEvent;
  }
}
//# sourceMappingURL=ManagedControls.js.map
