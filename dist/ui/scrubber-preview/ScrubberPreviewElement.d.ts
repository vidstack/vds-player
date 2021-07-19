export const SCRUBBER_PREVIEW_ELEMENT_TAG_NAME: "vds-scrubber-preview";
/**
 * Fired when the scrubber preview element connects to the DOM.
 *
 * @bubbles
 * @composed
 * @augments {DiscoveryEvent<ScrubberPreviewElement>}
 */
export class ScrubberPreviewConnectEvent extends DiscoveryEvent<ScrubberPreviewElement> {
    /** @readonly */
    static readonly TYPE: "vds-scrubber-preview-connect";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<import("../../foundation/elements/index.js").DiscoveryEventDetail<ScrubberPreviewElement>> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Plugs in to the `<vds-scrubber>` component to enable media previews. A preview is essentially
 * a sneak peek of a certain time the user is interacting with on the time slider. You might
 * be familiar with this on YouTube when hovering over the scrubber, and seeing a square preview
 * above the timeline displaying an frame/image of the video at that hovered time.
 *
 * This element renders a track for the preview element to run along. There's a track fill
 * element that will fill the track up to the part of the track being interacted with. You can
 * turn this off by setting the `noTrackFill` property or `no-track-fill` attribute.
 *
 * ## Previews
 *
 * You can pass in a preview to be shown while the user is interacting (hover/drag) with the
 * scrubber by passing an element into the `preview` slot, such as `<div slot="preview"></div>`.
 *
 * You need to do the following on your root preview element:
 *
 * - Expect that your root preview element will be positioned absolutely.
 * - Set the `bottom` CSS property on it to adjust it to the desired position above the slider.
 * - Create CSS styles for when it has a hidden attribute (`.preview[hidden] {}`).
 *
 * The Scrubber will automatically do the following to the root preview element passed in:
 *
 * - Set the `position` to `absolute`.
 * - Set a `hidden` attribute when it should be hidden (it's left to you to hide it with CSS).
 * - Update the `translateX()` CSS property to position the preview accordingly.
 *
 * ### How do I get the current preview time?
 *
 * You can either listen to `vds-scrubber-preview-time-update` event on this component, or you can
 * use the `scrubberPreviewContext`.
 *
 * For styling you have access to the `--vds-scrubber-preview-time` CSS property which contains
 * the current time in seconds the user is previewing. There's also the `--vds-media-duration`
 * property if needed.
 *
 * @tagname vds-scrubber-preview
 * @cssprop --vds-scrubber-preview-track-height - The height of the preview track (defaults to `--vds-slider-track-height`).
 * @cssprop --vds-scrubber-preview-track-fill-bg - The background color of the track fill (defaults to `#212121`).
 * @csspart track - The element that acts as a path that the preview travels along.
 * @csspart track-fill - The element that fills the track up to the point being previewed.
 * @slot Used to pass in the element that will be displayed on preview.
 * @slot track - Used to pass content into the track element.
 * @slot track-fill - Used to pass content into the track fill element.
 * @example
 * ```html
 * <vds-scrubber>
 *   <vds-scrubber-preview>
 *     <div class="preview"></div>
 *   </vds-scrubber-preview>
 * </vds-scrubber>
 * ```
 * @example
 * ```css
 * .preview {
 *   bottom: 24px;
 *   opacity: 1;
 *   transition: opacity 0.2s ease-in;
 * }
 *
 * .preview[hidden] {
 *   display: block;
 *   opacity: 0;
 * }
 * ```
 */
export class ScrubberPreviewElement extends LitElement {
    /**
     * @type {import('lit').CSSResultGroup}
     */
    static get styles(): import("lit").CSSResultGroup;
    /**
     * @type {string[]}
     */
    static get parts(): string[];
    /**
     * @type {string[]}
     */
    static get events(): string[];
    /**
     * @protected
     * @readonly
     */
    protected readonly context: import("../../foundation/context/types.js").ExtractContextRecordTypes<import("../../utils.js").ReadonlyIfType<import("../../foundation/context/types.js").DerivedContext<any>, {
        time: import("../../foundation/context/types.js").Context<number>;
        showing: import("../../foundation/context/types.js").Context<boolean>;
    }>>;
    /**
     * Whether the preview is disabled.
     *
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * Whether the preview track fill should be NOT be rendered.
     *
     * @type {boolean}
     */
    noTrackFill: boolean;
    /**
     * Whether the preview passed in should NOT be clamped to the host element edges.
     *
     * @type {boolean}
     */
    noClamp: boolean;
    /**
     * @protected
     * @type {number}
     */
    protected mediaDuration: number;
    /**
     * @protected
     * @type {boolean}
     */
    protected isDragging: boolean;
    /**
     * @protected
     * @type {boolean}
     */
    protected isInteracting: boolean;
    /**
     * @protected
     * @readonly
     */
    protected readonly discoveryController: ElementDiscoveryController<ScrubberPreviewElement>;
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<HTMLDivElement>}
     */
    protected readonly trackRef: import('lit/directives/ref').Ref<HTMLDivElement>;
    /**
     * Returns the underlying track element (`<div>`).
     *
     * @type {HTMLDivElement}
     */
    get trackElement(): HTMLDivElement;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderTrack(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getTrackPartAttr(): string;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderTrackSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getTrackSlotName(): string;
    /**
     * @protected
     * @readonly
     * @type {import('lit/directives/ref').Ref<HTMLDivElement>}
     */
    protected readonly trackFillRef: import('lit/directives/ref').Ref<HTMLDivElement>;
    /**
     * Returns the underlying track fill element (`<div>`). This will be `undefined` if the
     * `noTrackFill` property or `no-track-fill` attribute is `true`.
     *
     * @type {HTMLDivElement | undefined}
     */
    get trackFillElement(): HTMLDivElement | undefined;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderTrackFill(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getTrackFillPartAttr(): string;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderTrackFillSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string}
     */
    protected getTrackFillSlotName(): string;
    /**
     * @protected
     * @type {HTMLElement | undefined}
     */
    protected _previewSlotElement: HTMLElement | undefined;
    /**
     * The element passed in to the `preview` slot.
     *
     * @type {HTMLElement | undefined}
     */
    get previewSlotElement(): HTMLElement | undefined;
    /**
     * Whether the current slotted preview element is hidden.
     *
     * @type {boolean}
     */
    get isPreviewHidden(): boolean;
    /**
     * @protected
     * @returns {import('lit').TemplateResult}
     */
    protected renderPreviewSlot(): import('lit').TemplateResult;
    /**
     * @protected
     * @returns {string | undefined}
     */
    protected getPreviewSlotName(): string | undefined;
    /**
     * @protected
     */
    protected handlePreviewSlotChange(): void;
    /**
     * @protected
     * @type {number | undefined}
     */
    protected showPreviewTimeout: number | undefined;
    /**
     * Show the slotted preview element.
     *
     * @param {Event | undefined} [event] - Original event that triggered this action (if any).
     */
    showPreview(event?: Event | undefined): void;
    /**
     * Hide the slotted preview element.
     *
     * @param {Event | undefined} [event] - Original event that triggered this action (if any).
     * @returns {Promise<void>}
     */
    hidePreview(event?: Event | undefined): Promise<void>;
    /**
     * @protected
     * @type {import('../../utils/timing').RafThrottledFunction<(originalEvent: Event) => void>}
     */
    protected dispatchPreviewTimeUpdate: import("../../utils/timing.js").RafThrottledFunction<(originalEvent: Event) => void>;
    /**
     * @protected
     * @param {number} time
     * @param {Event} event
     */
    protected updatePreviewTime(time: number, event: Event): void;
    /**
     * @protected
     * @param {number} thumbPosition - `pointerEvent.clientX`
     * @returns {number}
     */
    protected calcPercentageOfTrackAtThumbPosition(thumbPosition: number): number;
    /**
     * @protected
     * @param {number} percentage - the percentage of the track to position the preview at.
     * @returns {number}
     */
    protected calcPreviewXPosition(percentage: number): number;
    /**
     * @protected
     * @type {number}
     */
    protected previewPositionRafId: number;
    /**
     * Updates the slotted preview element position given a `PointerEvent`, or `VdsCustomEvent` with
     * an `originalEvent` property referencing a `PointerEvent`.
     *
     * @param {PointerEvent | VdsCustomEvent} event
     * @returns {Promise<void>}
     */
    updatePreviewPosition(event: PointerEvent | VdsCustomEvent<any>): Promise<void>;
}
import { DiscoveryEvent } from "../../foundation/elements/discovery/events.js";
import { LitElement } from "lit-element/lit-element";
import { ElementDiscoveryController } from "../../foundation/elements/discovery/ElementDiscoveryController.js";
import { VdsCustomEvent } from "../../foundation/events/events.js";
