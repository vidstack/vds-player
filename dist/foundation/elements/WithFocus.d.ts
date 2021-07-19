/**
 * Mixes in a `focus()` method that focuses the first focusable element in the shadow DOM.
 * Technically a polyfill for `shadowRoot.delegatesFocus`.
 *
 * @mixin
 * @template {import('../../utils').Constructor<LitElement>} T
 * @param {T} Base - The constructor to mix into.
 * @returns {T}
 * @see https://github.com/carbon-design-system/carbon-web-components
 */
export function WithFocus<T extends import("../../utils").Constructor<LitElement>>(Base: T): T;
/**
 * A selector selecting focusable nodes.
 *
 * @see https://github.com/carbon-design-system/carbon-web-components
 */
export const focusableSelector: string;
import { LitElement } from "lit-element/lit-element";
