/**
 * @returns {import('../foundation/context').ContextProviderRecord<typeof mediaContext>}
 */
export function createMediaContextRecord(): import('../foundation/context').ContextProviderRecord<typeof mediaContext>;
/**
 * @template {import('../foundation/context').ContextProviderRecord<typeof mediaContext>} T
 * @param {T} context
 * @returns {T}
 */
export function cloneMediaContextRecord<T extends import("../foundation/context/types.js").ExtractContextRecordTypes<import("../utils.js").ReadonlyIfType<import("../foundation/context/types.js").DerivedContext<any>, {
    autoplay: import("../foundation/context/types.js").Context<boolean>;
    buffered: import("../foundation/context/types.js").Context<TimeRanges>;
    duration: import("../foundation/context/types.js").Context<number>;
    bufferedAmount: import("../foundation/context/types.js").DerivedContext<number>;
    canRequestFullscreen: import("../foundation/context/types.js").Context<boolean>;
    canPlay: import("../foundation/context/types.js").Context<boolean>;
    canPlayThrough: import("../foundation/context/types.js").Context<boolean>;
    controls: import("../foundation/context/types.js").Context<boolean>;
    currentPoster: import("../foundation/context/types.js").Context<string>;
    currentSrc: import("../foundation/context/types.js").Context<string>;
    currentTime: import("../foundation/context/types.js").Context<number>;
    ended: import("../foundation/context/types.js").Context<boolean>;
    error: import('../foundation/context').Context<unknown | undefined>;
    fullscreen: import("../foundation/context/types.js").Context<boolean>;
    loop: import("../foundation/context/types.js").Context<boolean>;
    live: import("../foundation/context/types.js").DerivedContext<boolean>;
    mediaType: import("../foundation/context/types.js").Context<string>;
    isAudio: import("../foundation/context/types.js").DerivedContext<boolean>;
    isVideo: import("../foundation/context/types.js").DerivedContext<boolean>;
    isLiveVideo: import("../foundation/context/types.js").DerivedContext<boolean>;
    muted: import("../foundation/context/types.js").Context<boolean>;
    paused: import("../foundation/context/types.js").Context<boolean>;
    played: import("../foundation/context/types.js").Context<TimeRanges>;
    playing: import("../foundation/context/types.js").Context<boolean>;
    playsinline: import("../foundation/context/types.js").Context<boolean>;
    seekable: import("../foundation/context/types.js").Context<TimeRanges>;
    seekableAmount: import("../foundation/context/types.js").DerivedContext<number>;
    seeking: import("../foundation/context/types.js").Context<boolean>;
    started: import("../foundation/context/types.js").Context<boolean>;
    viewType: import("../foundation/context/types.js").Context<string>;
    isAudioView: import("../foundation/context/types.js").DerivedContext<boolean>;
    isVideoView: import("../foundation/context/types.js").DerivedContext<boolean>;
    volume: import("../foundation/context/types.js").Context<number>;
    waiting: import("../foundation/context/types.js").Context<boolean>;
}>>>(context: T): T;
export namespace mediaContext {
    export const autoplay: import("../foundation/context/types.js").Context<boolean>;
    export { buffered };
    export { duration };
    export const bufferedAmount: import("../foundation/context/types.js").DerivedContext<number>;
    export const canRequestFullscreen: import("../foundation/context/types.js").Context<boolean>;
    export const canPlay: import("../foundation/context/types.js").Context<boolean>;
    export const canPlayThrough: import("../foundation/context/types.js").Context<boolean>;
    export const controls: import("../foundation/context/types.js").Context<boolean>;
    export const currentPoster: import("../foundation/context/types.js").Context<string>;
    export const currentSrc: import("../foundation/context/types.js").Context<string>;
    export const currentTime: import("../foundation/context/types.js").Context<number>;
    export const ended: import("../foundation/context/types.js").Context<boolean>;
    export const error: import('../foundation/context').Context<unknown | undefined>;
    export const fullscreen: import("../foundation/context/types.js").Context<boolean>;
    export const loop: import("../foundation/context/types.js").Context<boolean>;
    export const live: import("../foundation/context/types.js").DerivedContext<boolean>;
    export { mediaType };
    export const isAudio: import("../foundation/context/types.js").DerivedContext<boolean>;
    export const isVideo: import("../foundation/context/types.js").DerivedContext<boolean>;
    export { isLiveVideo };
    export const muted: import("../foundation/context/types.js").Context<boolean>;
    export const paused: import("../foundation/context/types.js").Context<boolean>;
    export const played: import("../foundation/context/types.js").Context<TimeRanges>;
    export const playing: import("../foundation/context/types.js").Context<boolean>;
    export const playsinline: import("../foundation/context/types.js").Context<boolean>;
    export { seekable };
    export const seekableAmount: import("../foundation/context/types.js").DerivedContext<number>;
    export const seeking: import("../foundation/context/types.js").Context<boolean>;
    export const started: import("../foundation/context/types.js").Context<boolean>;
    export { viewType };
    export const isAudioView: import("../foundation/context/types.js").DerivedContext<boolean>;
    export const isVideoView: import("../foundation/context/types.js").DerivedContext<boolean>;
    export const volume: import("../foundation/context/types.js").Context<number>;
    export const waiting: import("../foundation/context/types.js").Context<boolean>;
}
declare const buffered: import("../foundation/context/types.js").Context<TimeRanges>;
declare const duration: import("../foundation/context/types.js").Context<number>;
declare const mediaType: import("../foundation/context/types.js").Context<string>;
declare const isLiveVideo: import("../foundation/context/types.js").DerivedContext<boolean>;
declare const seekable: import("../foundation/context/types.js").Context<TimeRanges>;
declare const viewType: import("../foundation/context/types.js").Context<string>;
export {};
