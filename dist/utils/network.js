import { deferredPromise } from './promise.js';
import { IS_CLIENT } from './support.js';
import {
  isArray,
  isNil,
  isNull,
  isObject,
  isString,
  isUndefined
} from './unit.js';
/**
 * Attempt to parse json into a POJO.
 *
 * @template T
 * @param {unknown} json - The JSON object to parse.
 * @returns {T | undefined}
 */
export function tryParseJSON(json) {
  if (!isString(json)) return undefined;
  try {
    return JSON.parse(json);
  } catch (error) {
    return undefined;
  }
}
/**
 * Check if the given `value` is JSON or a POJO.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean}
 */
export function isObjOrJSON(value) {
  return (isString(value) && value.startsWith('{')) || isObject(value);
}
/**
 * If an object return otherwise try to parse it as json.
 *
 * @template T
 * @param {unknown} value
 * @returns {T | undefined}
 */
export function objOrParseJSON(value) {
  return /** @type {any} */ (isObject(value) ? value : tryParseJSON(value));
}
/**
 * Load image avoiding xhr/fetch CORS issues. Server status can't be obtained this way
 * unfortunately, so this uses "naturalWidth" to determine if the image has been loaded. By
 * default it checks if it is at least 1px.
 *
 * @param {string} src - The URL of where the image resource is located.
 * @param {number} minWidth - The minimum width for a valid image to be loaded.
 * @returns {Promise<HTMLImageElement>}
 */
/* c8 ignore next 10 */
/**
 * @param {string} src
 * @param {number} minWidth
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(src, minWidth = 1) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const handler = () => {
      image.naturalWidth >= minWidth ? resolve(image) : reject(image);
    };
    Object.assign(image, { onload: handler, onerror: handler, src });
  });
}
/**
 * Loads a script into the DOM.
 *
 * @param {string} src - The URL of where the script is located.
 * @param {() => void} onLoad - Callback invoked when the script is loaded.
 * @param {(error: unknown) => void} onError - Callback invoked when the script loading fails.
 */
/* c8 ignore next 22 */
/**
 * @param {string} src
 * @returns {Promise<void>}
 */
export async function loadScript(src) {
  const hasLoaded = document.querySelector(`script[src="${src}"]`);
  if (!isNull(hasLoaded)) return;
  const script = document.createElement('script');
  const load = deferredPromise();
  script.src = src;
  script.onload = load.resolve;
  script.onerror = load.reject;
  const firstScriptTag = document.getElementsByTagName('script')[0];
  if (!isNil(firstScriptTag.parentNode)) {
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
  }
  return load.promise;
}
/**
 * Tries to parse json and return a object.
 *
 * @template T
 * @param {unknown} data
 * @returns {T | undefined}
 */
export function decodeJSON(data) {
  if (!isObjOrJSON(data)) return undefined;
  return objOrParseJSON(data);
}
/**
 * Attempts to safely decode a URI component, on failure it returns the given fallback.
 *
 * @param {string} component
 * @param {string} fallback
 * @param {boolean} isClient
 * @returns {string}
 */
export function tryDecodeURIComponent(
  component,
  fallback = '',
  isClient = IS_CLIENT
) {
  if (!isClient) return fallback;
  try {
    return window.decodeURIComponent(component);
  } catch (error) {
    return fallback;
  }
}
/**
 * Returns a simple key/value map and duplicate keys are merged into an array.
 *
 * @template T
 * @param {string} [qs] - The query string to parse.
 * @returns {T}
 * @link https://github.com/ampproject/amphtml/blob/c7c46cec71bac92f5c5da31dcc6366c18577f566/src/url-parse-query-string.js#L31
 */
const QUERY_STRING_REGEX = /(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;
/**
 * @param {string} qs
 * @returns {Params}
 */
export function parseQueryString(qs) {
  const params = Object.create(null);
  if (isUndefined(qs)) return params;
  /** @type {RegExpExecArray} */
  let match;
  while (
    (match = /** @type {RegExpExecArray} */ (QUERY_STRING_REGEX.exec(qs)))
  ) {
    const name = tryDecodeURIComponent(match[1], match[1]).replace('[]', '');
    const value = isString(match[2])
      ? tryDecodeURIComponent(match[2].replace(/\+/g, ' '), match[2])
      : '';
    const currValue = params[name];
    if (currValue && !isArray(currValue)) params[name] = [currValue];
    currValue ? params[name].push(value) : (params[name] = value);
  }
  return params;
}
/**
 * @typedef {Record<string, unknown>} Params
 */
/**
 * Serializes the given params into a query string.
 *
 * @param {Params} params
 * @returns {string}
 */
export function serializeQueryString(params) {
  /** @type {string[]} */
  const qs = [];
  /**
   * @param {string} param
   * @param {string} v
   */
  const appendQueryParam = (param, v) => {
    qs.push(`${encodeURIComponent(param)}=${encodeURIComponent(v)}`);
  };
  Object.keys(params).forEach((param) => {
    const value = params[param];
    if (isNil(value)) return;
    if (isArray(value)) {
      /** @type {string[]} */ (value).forEach((v) =>
        appendQueryParam(param, v)
      );
    } else {
      appendQueryParam(param, /** @type {string} */ (value));
    }
  });
  return qs.join('&');
}
/**
 * Notifies the browser to start establishing a connection with the given URL.
 *
 * @param {string} url
 * @param {'preconnect' | 'prefetch' | 'preload'} rel
 * @param {boolean} isClient
 * @returns {boolean}
 */
export function preconnect(url, rel = 'preconnect', isClient = IS_CLIENT) {
  if (!isClient) return false;
  const hasLink = document.querySelector(`link[href="${url}"]`);
  if (!isNull(hasLink)) return true;
  const link = document.createElement('link');
  link.rel = rel;
  link.href = url;
  link.crossOrigin = 'true';
  document.head.append(link);
  return true;
}
/**
 * Safely appends the given query string to the given URL.
 *
 * @param {string} url
 * @param {string} [qs]
 * @returns {string}
 */
export function appendQueryStringToURL(url, qs) {
  if (isUndefined(qs) || qs.length === 0) return url;
  const mainAndQuery = url.split('?', 2);
  return (
    mainAndQuery[0] +
    (!isUndefined(mainAndQuery[1]) ? `?${mainAndQuery[1]}&${qs}` : `?${qs}`)
  );
}
/**
 * Serializes the given params into a query string and appends them to the given URL.
 *
 * @param {string} url
 * @param {string | Params} params
 * @returns {string}
 */
export function appendParamsToURL(url, params) {
  return appendQueryStringToURL(
    url,
    isObject(params)
      ? serializeQueryString(/** @type {Params} */ (params))
      : /** @type {string} */ (params)
  );
}
/**
 * Tries to convert a query string into a object.
 *
 * @template T
 * @param {string} qs
 * @returns {T | undefined}
 */
export function decodeQueryString(qs) {
  if (!isString(qs)) return undefined;
  return /** @type {T} */ (parseQueryString(qs));
}
export class ScriptLoader {
  /**
   * @param {string} src
   * @returns {Promise<void>}
   */
  static async load(src) {
    return new Promise((resolve, reject) => {
      if (this.pendingRequests[src]) {
        this.pendingRequests[src].push({ resolve, reject });
        return;
      }
      this.pendingRequests[src] = [{ resolve, reject }];
      loadScript(src)
        .then(() => {
          this.pendingRequests[src].forEach((request) => request.resolve());
          delete this.pendingRequests[src];
        })
        .catch((err) => {
          this.pendingRequests[src].forEach((request) => request.reject(err));
          delete this.pendingRequests[src];
        });
    });
  }
}
/**
 * @private
 * @type {Record<string, {
 *  resolve: () => void;
 *  reject: (error: unknown) => void;
 * }[]>}
 */
ScriptLoader.pendingRequests = {};
//# sourceMappingURL=network.js.map
