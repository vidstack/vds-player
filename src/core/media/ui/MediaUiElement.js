import clsx from 'clsx';
import { html, TemplateResult } from 'lit-element';

import { consumeContextRecord } from '../../../shared/context';
import { VdsElement } from '../../../shared/elements';
import { IS_IOS } from '../../../utils/support';
import { mediaContext } from '../media.context';
import { mediaUiElementStyles } from './media-ui.css';

/**
 * Simple container that holds a collection of user interface components.
 *
 * This is a general container to hold your UI components but it also enables you to show/hide
 * the player UI when media is not ready for playback by applying styles to the `root/root-hidden`
 * CSS parts. It also handles showing/hiding UI depending on whether native UI can't be
 * hidden (*cough* iOS).
 *
 * ⚠️ **IMPORTANT:** The styling is left to you, it will only apply the `root-hidden` CSS part.
 *
 * @tagname vds-media-ui
 *
 * @slot Used to pass in UI components.
 *
 * @csspart root - The component's root element (`<div>`).
 * @csspart root-hidden - Applied when the media is NOT ready for playback and the UI should be hidden.
 */
export class MediaUiElement extends VdsElement {
	/** @type {import('lit-element').CSSResultArray} */
	static get styles() {
		return [mediaUiElementStyles];
	}

	/** @type {string[]} */
	static get parts() {
		return ['root', 'root-hidden'];
	}

	/** @protected @readonly */
	mediaCtx = consumeContextRecord(this, {
		canPlay: mediaContext.canPlay,
		fullscreen: mediaContext.fullscreen,
		isVideoView: mediaContext.isVideoView,
		playsinline: mediaContext.playsinline
	});

	/**
	 * @protected
	 * @returns {HTMLDivElement}
	 */
	rootEl;

	/**
	 * The component's root element.
	 *
	 * @type {HTMLDivElement}
	 */
	get rootElement() {
		return this.rootEl;
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		/** @type {HTMLDivElement} */
		this.rootEl = this.shadowRoot.querySelector('#root');
	}

	render() {
		return html`
			<div
				id="root"
				class="${this.getRootClassAttr()}"
				part="${this.getRootPartAttr()}"
			>
				${this.renderRootContent()}
			</div>
		`;
	}

	/**
	 * Override this to modify the content rendered inside the root UI container.
	 *
	 * @protected
	 */
	renderRootContent() {
		return html`${this.renderDefaultSlot()}`;
	}

	/**
	 * Override this to modify rendering of default slot.
	 *
	 * @protected
	 * @returns {TemplateResult}
	 */
	renderDefaultSlot() {
		return html`<slot></slot>`;
	}

	/**
	 * Override this to modify root CSS Classes.
	 *
	 * @protected
	 * @returns {string}
	 */
	getRootClassAttr() {
		return '';
	}

	/**
	 * Override this to modify root CSS parts.
	 *
	 * @protected
	 * @returns {string}
	 */
	getRootPartAttr() {
		return clsx('root', this.isUiHidden() && 'root-hidden');
	}

	/**
	 * Whether the UI should be hidden.
	 *
	 * @protected
	 * @returns {boolean}
	 */
	isUiHidden() {
		return (
			!this.mediaCtx.canPlay ||
			// If iOS Safari and the view type is currently video then we hide the custom UI depending
			// on whether playsinline is set and fullscreen is not active, or if fullscreen is active
			// we should always hide.
			(IS_IOS &&
				this.mediaCtx.isVideoView &&
				(!this.mediaCtx.playsinline || this.mediaCtx.fullscreen))
		);
	}
}