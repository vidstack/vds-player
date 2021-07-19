export const SEEKABLE_PROGRESS_BAR_ELEMENT_TAG_NAME: "vds-seekable-progress-bar";
/**
 * Displays a progress bar from 0 to media duration with the amount of media that is seekable.
 * Seekable media is parts of the media that been downloaded and seeking to it won't result
 * in any delay or any additional loading.
 *
 * @tagname vds-seekable-progress-bar
 * @slot Used to pass content into the progress element.
 * @csspart root - The progress bar element (`<div>`).
 * @cssprop --vds-seekable-progress-bar-bg - The background color of the amount that is seekable (defaults to `#616161`).
 * @cssprop --vds-seekable-progress-bar-height - The height of the progress bar (defaults to `--vds-slider-track-height`).
 * @example
 * ```html
 * <vds-seekable-progress-bar
 *   label="Amount of seekable media"
 * ></vds-seekable-progress-bar>
 * ```
 */
export class SeekableProgressBarElement extends LitElement {
    /**
     * @type {import('lit').CSSResultGroup}
     */
    static get styles(): import("lit").CSSResultGroup;
    /**
     * @type {string[]}
     */
    static get parts(): string[];
    /**
     * ♿ **ARIA:** The `aria-label` for the progress bar.
     *
     * @type {string}
     */
    label: string;
    /**
     * ♿ **ARIA:** Human-readable text alternative for the seekable amount. If you pass
     * in a string containing `{seekableAmount}` or `{duration}` templates they'll be replaced with
     * the spoken form such as `1 hour 30 minutes`.
     *
     * @type {string}
     */
    valueText: string;
    /**
     * @protected
     * @type {number}
     */
    protected mediaSeekableAmount: number;
    /**
     * @protected
     * @type {number}
     */
    protected mediaDuration: number;
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<HTMLProgressElement>}
     */
    protected readonly progressBarRef: import('lit/directives/ref').Ref<HTMLProgressElement>;
    /**
     * Returns the underlying `<progress>` element.
     *
     * @type {HTMLProgressElement}
     */
    get progressBarElement(): HTMLProgressElement;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderProgressBar(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getProgressBarPartAttr(): string;
    /**
     * @protected
     * @returns {import('lit/directives/style-map').StyleInfo}
     */
    protected getProgressBarStyleMap(): import('lit/directives/style-map').StyleInfo;
    /**
     * @protected
     * @returns {string}
     */
    protected getProgressBarValueText(): string;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderProgressBarChildren(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderProgressBarSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string | undefined}
     */
    protected getProgressBarSlotName(): string | undefined;
}
import { LitElement } from "lit-element/lit-element";
