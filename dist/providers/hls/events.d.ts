/**
 * @typedef {{
 *  [HlsLoadEvent.TYPE]: HlsLoadEvent;
 *  [HlsLoadErrorEvent.TYPE]: HlsLoadErrorEvent;
 *  [HlsBuildEvent.TYPE]: HlsBuildEvent;
 *  [HlsDetachEvent.TYPE]: HlsDetachEvent;
 *  [HlsAttachEvent.TYPE]: HlsAttachEvent;
 *  [HlsNoSupportEvent.TYPE]: HlsNoSupportEvent;
 * }} HlsEvents
 */
/**
 * @template DetailType
 * @augments {VdsCustomEvent<DetailType>}
 */
export class HlsEvent<DetailType> extends VdsCustomEvent<DetailType> {
}
/**
 * Fired when the `hls.js` library has been loaded. This will not fire if you're bundling it
 * locally OR if it's been cached already.
 *
 * @augments {HlsEvent<typeof import('hls.js')>}
 */
export class HlsLoadEvent extends HlsEvent<typeof import("hls.js")> {
    /** @readonly */
    static readonly TYPE: "vds-hls-load";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<typeof import("hls.js")> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Fired when the `hls.js` library fails to load from a remote source given via `hlsLibrary`.
 *
 * @augments {HlsEvent<Error>}
 */
export class HlsLoadErrorEvent extends HlsEvent<Error> {
    /** @readonly */
    static readonly TYPE: "vds-hls-load-error";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<Error> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Fired when the `hls.js` instance is built. This will not fire if the browser natively
 * supports HLS.
 *
 * @augments {HlsEvent<import('hls.js')>}
 */
export class HlsBuildEvent extends HlsEvent<import("hls.js")> {
    /** @readonly */
    static readonly TYPE: "vds-hls-build";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<import("hls.js")> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Fired when the `hls.js` instance has attached itself to the media element. This will not
 * fire if the browser natively supports HLS.
 *
 * @augments {HlsEvent<import('hls.js')>}
 */
export class HlsAttachEvent extends HlsEvent<import("hls.js")> {
    /** @readonly */
    static readonly TYPE: "vds-hls-attach";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<import("hls.js")> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Fired when the `hls.js` instance has detached itself from the media element.
 *
 * @augments {HlsEvent<import('hls.js')>}
 */
export class HlsDetachEvent extends HlsEvent<import("hls.js")> {
    /** @readonly */
    static readonly TYPE: "vds-hls-detach";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<import("hls.js")> | undefined, type?: string | undefined, final?: boolean | undefined);
}
/**
 * Fired when the browser doesn't support HLS natively and `hls.js` doesn't support
 * this enviroment either, most likely due to missing Media Extensions.
 *
 * @augments {HlsEvent<void>}
 */
export class HlsNoSupportEvent extends HlsEvent<void> {
    /** @readonly */
    static readonly TYPE: "vds-hls-no-support";
    constructor(eventInit?: import("../../foundation/events/events.js").VdsEventInit<void> | undefined, type?: string | undefined, final?: boolean | undefined);
}
export type HlsEvents = {
    [HlsLoadEvent.TYPE]: HlsLoadEvent;
    [HlsLoadErrorEvent.TYPE]: HlsLoadErrorEvent;
    [HlsBuildEvent.TYPE]: HlsBuildEvent;
    [HlsDetachEvent.TYPE]: HlsDetachEvent;
    [HlsAttachEvent.TYPE]: HlsAttachEvent;
    [HlsNoSupportEvent.TYPE]: HlsNoSupportEvent;
};
import { VdsCustomEvent } from "../../foundation/events/events.js";
