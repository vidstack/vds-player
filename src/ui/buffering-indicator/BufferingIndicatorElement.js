import { html } from 'lit';

import { mediaContext } from '../../media';
import { LIB_PREFIX } from '../../shared/constants';
import { VdsElement } from '../../shared/elements';
import { getSlottedChildren, setAttribute } from '../../utils/dom';
import { isNil } from '../../utils/unit';
import { bufferingIndicatorElementStyles } from './css';
import {
	VdsBufferingIndicatorHideEvent,
	VdsBufferingIndicatorShowEvent
} from './events';

/** @typedef {import('./types').BufferingIndicator} IBufferingIndicator */

export const BUFFERING_INDICATOR_ELEMENT_TAG_NAME = 'buffering-indicator';

export const VDS_BUFFERING_INDICATOR_ELEMENT_TAG_NAME =
	/** @type {`${LIB_PREFIX}-${BUFFERING_INDICATOR_ELEMENT_TAG_NAME}`} */ (
		`${LIB_PREFIX}-${BUFFERING_INDICATOR_ELEMENT_TAG_NAME}`
	);

/**
 * Display an indicator when either the provider/media is booting or media playback has
 * stopped because of a lack of temporary data. This component will always render the default
 * `<slot>`, however, a `hidden` attribute will be applied to the slot when it shoud not be visible.
 *
 * ⚠️ **IMPORTANT:** The styling is left to you, it will only apply the `hidden` attribute.
 *
 * @implements {IBufferingIndicator}
 *
 * @tagname vds-buffering-indicator
 *
 * @slot Used to pass in the content to be displayed while buffering.
 *
 * @example
 * ```html
 * <vds-buffering-indicator show-while-booting delay="500">
 *   <!-- `hidden` attribute will automatically be applied/removed -->
 *   <div hidden>
 *     <!-- ... -->
 *   </div>
 * </vds-buffering-indicator>
 * ```
 */
export class BufferingIndicatorElement extends VdsElement {
	/** @type {import('lit').CSSResultGroup} */
	static get styles() {
		return [bufferingIndicatorElementStyles];
	}

	constructor() {
		super();

		// Properties
		/** @type {number} */
		this.delay = 0;
		/** @type {boolean} */
		this.showWhileBooting = false;

		// Context
		/** @protected @readonly @type {boolean} */
		this.canPlay = mediaContext.canPlay.initialValue;
		/** @protected @readonly @type {boolean} */
		this.isWaiting = mediaContext.waiting.initialValue;
	}

	// -------------------------------------------------------------------------------------------
	// Properties
	// -------------------------------------------------------------------------------------------

	/**
	 * @protected
	 * @type {HTMLElement | undefined}
	 */
	defaultSlotEl;

	/** @type {import('lit').PropertyDeclarations} */
	static get properties() {
		return {
			delay: { type: Number },
			showWhileBooting: { type: Boolean, attribute: 'show-while-booting' }
		};
	}

	/** @type {import('../../shared/context').ContextConsumerDeclarations} */
	static get contextConsumers() {
		return {
			canPlay: mediaContext.canPlay,
			isWaiting: mediaContext.waiting
		};
	}

	// -------------------------------------------------------------------------------------------
	// Lifecycle
	// -------------------------------------------------------------------------------------------

	updated(changedProps) {
		this.handleTogglingHiddenAttr();
		super.updated(changedProps);
	}

	disconnectedCallback() {
		this.clearDelay();
		super.disconnectedCallback();
		this.wasPrevHidden = true;
	}

	// -------------------------------------------------------------------------------------------
	// Render
	// -------------------------------------------------------------------------------------------

	/** @returns {import('lit').TemplateResult} */
	render() {
		return html`<slot @slotchange=${this.handleDefaultSlotChange}></slot>`;
	}

	/**
	 * @protected
	 * @returns {void}
	 */
	handleDefaultSlotChange() {
		this.defaultSlotEl = /** @type {HTMLElement} */ (
			getSlottedChildren(this)[0]
		);
		this.handleTogglingHiddenAttr();
	}

	/**
	 * @protected
	 * @returns {boolean}
	 */
	isIndicatorHidden() {
		return (!this.showWhileBooting || this.canPlay) && !this.isWaiting;
	}

	/**
	 * @protected
	 * @type {unknown | undefined}
	 */
	delayTimeout;

	/**
	 * @protected
	 * @returns {void}
	 */
	clearDelay() {
		window.clearTimeout(/** @type {number} */ (this.delayTimeout));
		this.delayTimeout = undefined;
	}

	/**
	 * @protected
	 * @returns {void}
	 */
	handleTogglingHiddenAttr() {
		this.clearDelay();

		const shouldBeHidden = this.isIndicatorHidden();

		if (shouldBeHidden || this.delay === 0) {
			this.toggleHiddenAttr();
			return;
		}

		this.delayTimeout = setTimeout(() => {
			this.toggleHiddenAttr();
		}, this.delay);
	}

	/**
	 * @protected
	 * @type {boolean}
	 */
	wasPrevHidden = true;

	/**
	 * @protected
	 * @returns {void}
	 */
	toggleHiddenAttr() {
		if (isNil(this.defaultSlotEl)) return;

		const shouldBeHidden = this.isIndicatorHidden();
		setAttribute(this.defaultSlotEl, 'hidden', shouldBeHidden ? '' : undefined);

		const didChange = this.wasPrevHidden !== shouldBeHidden;
		if (didChange) {
			this.dispatchIndicatorChangeEvent();
			this.wasPrevHidden = shouldBeHidden;
		}
	}

	// -------------------------------------------------------------------------------------------
	// Events
	// -------------------------------------------------------------------------------------------

	/**
	 * @protected
	 * @returns {void}
	 */
	dispatchIndicatorChangeEvent() {
		const Event = !this.wasPrevHidden
			? VdsBufferingIndicatorHideEvent
			: VdsBufferingIndicatorShowEvent;

		this.dispatchEvent(new Event());
	}
}
