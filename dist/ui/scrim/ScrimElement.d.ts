export const SCRIM_ELEMENT_TAG_NAME: "vds-scrim";
/**
 * A darkened overlay (gradient) that covers the video to enable controls placed on it to be more
 * visible. The gradient is a base64 pre-defined image for the best possible gradient transition.
 * One caveat is it has a fixed height of 258px. Change the background-image to your liking or use
 * CSS to override the `gradient` part.
 *
 * @tagname vds-scrim
 * @csspart gradient - The gradient element.
 * @slot - Used to pass content inside the gradient.
 */
export class ScrimElement extends LitElement {
    /**
     * @type {import('lit').CSSResultGroup}
     */
    static get styles(): import("lit").CSSResultGroup;
    /**
     * The direction of the gradient.
     *
     * @type {'up' | 'down'}
     */
    direction: 'up' | 'down';
    /**
     * @protected
     * @returns {string}
     */
    protected getGradientPartAttr(): string;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderGradientSlot(): import('lit').TemplateResult;
}
import { LitElement } from "lit-element/lit-element";
