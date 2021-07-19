/**
 * Whether two numbers are roughly equal up to a certain precision.
 *
 * @param {number} numA
 * @param {number} numB
 * @param {number} precision
 * @returns {boolean}
 */
export function areNumbersRoughlyEqual(numA: number, numB: number, precision?: number): boolean;
/**
 * Round a number to the given number of `decimalPlaces`.
 *
 * @param {number} num
 * @param {number} decimalPlaces
 * @returns {number}
 */
export function round(num: number, decimalPlaces?: number): number;
/**
 * Clamp a given `value` between a minimum and maximum value.
 *
 * @param {number} min
 * @param {number} value
 * @param {number} max
 * @returns {number}
 */
export function clampNumber(min: number, value: number, max: number): number;
/**
 * Get the number of decimal places in the given `num`.
 *
 * @param {number} num
 * @returns {number}
 * @example `1` -> `0`
 * @example `1.0` -> `0`
 * @example `1.1` -> `1`
 * @example `1.12` -> `2`
 */
export function getNumberOfDecimalPlaces(num: number): number;
