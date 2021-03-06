import { isDerviedContext } from './context.js';

const PROVIDERS = Symbol('Vidstack.providers');
const CONSUMERS = Symbol('Vidstack.consumers');

/**
 * @template {any} T
 * @param {typeof import('lit').ReactiveElement} ctor
 * @param {string|symbol} name
 * @param {import('./types').Context<T>} context
 * @param {import('./types').ContextProvideOptions<T>} [options]
 */
export function defineContextProvider(ctor, name, context, options = {}) {
  // Might be called by decorator.
  /** @type {any} */ (ctor).finalizeContext?.();

  ctor.addInitializer((element) => {
    if (!element[PROVIDERS]) element[PROVIDERS] = new Map();
    const provider = context.provide(element, options);
    element[PROVIDERS].set(name, provider);
  });

  Object.defineProperty(ctor.prototype, name, {
    enumerable: true,
    configurable: true,
    get() {
      return this[PROVIDERS].get(name).value;
    },
    set: isDerviedContext(context)
      ? function () {
          // console.warn(`Context provider property [${name}] is derived, thus it's readonly.`);
        }
      : function (newValue) {
          // @ts-ignore
          this[PROVIDERS].get(name).value = newValue;
        }
  });
}

/**
 * @template {any} T
 * @param {import('lit').ReactiveElement} element
 * @param {string|symbol} name
 * @param {import('./types').Context<T>} context
 * @param {import('./types').ContextConsumeOptions<T>} [options]
 */
function initConsumer(element, name, context, options = {}) {
  let initialized = false;
  let oldValue =
    options.transform?.(context.initialValue) ?? context.initialValue;

  const consumer = context.consume(element, {
    ...options,
    onUpdate: (newValue) => {
      if (!initialized) return;

      // Trigger setters.
      element[name] = newValue;

      // TODO: REMOVE
      element.requestUpdate(name, oldValue);
      oldValue = newValue;

      options.onUpdate?.call(element, newValue);
    }
  });

  element[CONSUMERS].set(name, consumer);
  initialized = true;
}

/**
 * @template {any} T
 * @param {typeof import('lit').ReactiveElement} ctor
 * @param {string|symbol} name
 * @param {import('./types').Context<T>} context
 * @param {import('./types').ContextConsumeOptions<T>} [options]
 */
export function defineContextConsumer(ctor, name, context, options = {}) {
  // Might be called by decorator.
  /** @type {any} */ (ctor).finalizeContext?.();

  ctor.addInitializer((element) => {
    if (!element[CONSUMERS]) element[CONSUMERS] = new Map();
    initConsumer(element, name, context, options);
  });

  Object.defineProperty(ctor.prototype, name, {
    enumerable: true,
    configurable: true,
    get() {
      return this[CONSUMERS].get(name).value;
    },
    set() {
      // console.warn(`Context consumer property [${name}] is readonly.`);
    }
  });
}
