/**
 * Walk object prototype chain and collect all property names of the given `object`.
 *
 * @template T
 * @param {T & object} obj
 * @param {object} [BaseConstructor] Stop collecting property names at this prototype.
 * @returns {Set<(keyof T)>}
 */
export function getAllObjectPropertyNames<T>(obj: any, BaseConstructor?: object): Set<keyof T>;
/**
 * Creates an object composed of the picked `object` properties.
 *
 * @template T
 * @template {(keyof T)[]} R
 * @param {T} obj
 * @param {R} keys
 * @returns {Pick<T, import("../utils").ArrayElement<R>>}
 */
export function pick<T, R extends (keyof T)[]>(obj: T, keys: R): Pick<T, import("../utils").ArrayElement<R>>;
/**
 * The opposite of `pick`; this method creates an `object` composed of the own and inherited
 * enumerable property paths of object that are not omitted.
 *
 * @template T
 * @template {(keyof T)[]} R
 * @param {T} obj
 * @param {R} keys
 * @returns {Omit<T, import("../utils").ArrayElement<R>>}
 */
export function omit<T, R extends (keyof T)[]>(obj: T, keys: R): Omit<T, import("../utils").ArrayElement<R>>;
