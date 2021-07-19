/**
 * @template {(...args: any) => void} Fn
 * @typedef {Fn & {
 *  cancel: () => void;
 *  pending: () => boolean;
 * }} DebouncedFunction
 */
/**
 * Creates a debounced function that delays invoking `func` until after `delay` milliseconds have
 * elapsed since the last time the debounced function was invoked.
 *
 * @template {(...args: any) => void} Fn
 * @param {Fn} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @param {boolean} immediate - Whether the function should be triggered at the start of a sequence of calls instead of end.
 * @returns {DebouncedFunction<Fn>}
 * @link https://github.com/jashkenas/underscore/blob/master/modules/debounce.js
 */
export function debounce<Fn extends (...args: any) => void>(func: Fn, delay: number, immediate?: boolean): DebouncedFunction<Fn>;
/**
 * @typedef {{
 *  leading: boolean;
 *  trailing: boolean;
 * }} ThorttleOptions
 */
/**
 * @template {(...args: any) => void} Fn
 * @typedef {Fn & {
 *  cancel: () => void;
 *  pending: () => boolean;
 *  updateDelay: (delay: number) => void;
 * }} ThrottledFunction
 */
/**
 * Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.
 *
 * @template {(...args: any) => void} Fn
 * @param {Fn} func - The function to throttle.
 * @param {number} delay - The number of milliseconds to throttle invocations by.
 * @param {ThorttleOptions} options - The throttle options.
 * @returns {ThrottledFunction<Fn>}
 * @link https://github.com/jashkenas/underscore/blob/master/modules/throttle.js
 */
export function throttle<Fn extends (...args: any) => void>(func: Fn, delay: number, options?: ThorttleOptions): ThrottledFunction<Fn>;
/**
 * @template {(...args: any) => void} Fn
 * @typedef {Fn & {
 *  cancel: () => void;
 *  pending: () => boolean;
 * }} RafThrottledFunction
 */
/**
 * Creates a throttled function that only invokes `func` at most once per animation frame.
 *
 * @template {(...args: any) => void} Fn
 * @param {Fn} func - The function to throttle.
 * @returns {RafThrottledFunction<Fn>}
 * @link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
export function rafThrottle<Fn extends (...args: any) => void>(func: Fn): RafThrottledFunction<Fn>;
export type DebouncedFunction<Fn extends (...args: any) => void> = Fn & {
    cancel: () => void;
    pending: () => boolean;
};
export type ThorttleOptions = {
    leading: boolean;
    trailing: boolean;
};
export type ThrottledFunction<Fn extends (...args: any) => void> = Fn & {
    cancel: () => void;
    pending: () => boolean;
    updateDelay: (delay: number) => void;
};
export type RafThrottledFunction<Fn extends (...args: any) => void> = Fn & {
    cancel: () => void;
    pending: () => boolean;
};
