export namespace MEDIA_PROVIDER_ELEMENT_STORYBOOK_ARG_TYPES {
    namespace autoplay {
        const control: boolean;
    }
    namespace controls {
        const control_1: string;
        export { control_1 as control };
        export const defaultValue: boolean;
    }
    namespace currentTime {
        const control_2: string;
        export { control_2 as control };
        const defaultValue_1: number;
        export { defaultValue_1 as defaultValue };
    }
    namespace loop {
        const control_3: string;
        export { control_3 as control };
    }
    namespace muted {
        const control_4: string;
        export { control_4 as control };
    }
    namespace paused {
        const control_5: string;
        export { control_5 as control };
        const defaultValue_2: boolean;
        export { defaultValue_2 as defaultValue };
    }
    namespace playsinline {
        const control_6: string;
        export { control_6 as control };
    }
    namespace volume {
        export namespace control_7 {
            const type: string;
            const step: number;
        }
        export { control_7 as control };
        const defaultValue_3: number;
        export { defaultValue_3 as defaultValue };
    }
    const onAbort: {
        action: "vds-abort";
        table: {
            disable: boolean;
        };
    };
    const onCanPlay: {
        action: "vds-can-play";
        table: {
            disable: boolean;
        };
    };
    const onCanPlayThrough: {
        action: "vds-can-play-through";
        table: {
            disable: boolean;
        };
    };
    const onDurationChange: {
        action: "vds-duration-change";
        table: {
            disable: boolean;
        };
    };
    const onEmptied: {
        action: "vds-emptied";
        table: {
            disable: boolean;
        };
    };
    const onEnded: {
        action: "vds-ended";
        table: {
            disable: boolean;
        };
    };
    const onError: {
        action: "vds-error";
        table: {
            disable: boolean;
        };
    };
    const onFullscreenChange: {
        action: "vds-fullscreen-change";
        table: {
            disable: boolean;
        };
    };
    const onLoadedData: {
        action: "vds-loaded-data";
        table: {
            disable: boolean;
        };
    };
    const onLoadedMetadata: {
        action: "vds-loaded-metadata";
        table: {
            disable: boolean;
        };
    };
    const onLoadStart: {
        action: "vds-load-start";
        table: {
            disable: boolean;
        };
    };
    const onMediaTypeChange: {
        action: "vds-media-type-change";
        table: {
            disable: boolean;
        };
    };
    const onPause: {
        action: "vds-pause";
        table: {
            disable: boolean;
        };
    };
    const onPlay: {
        action: "vds-play";
        table: {
            disable: boolean;
        };
    };
    const onPlaying: {
        action: "vds-playing";
        table: {
            disable: boolean;
        };
    };
    const onProgress: {
        action: "vds-progress";
        table: {
            disable: boolean;
        };
    };
    const onReplay: {
        action: "vds-replay";
        table: {
            disable: boolean;
        };
    };
    const onSeeked: {
        action: "vds-seeked";
        table: {
            disable: boolean;
        };
    };
    const onSeeking: {
        action: "vds-seeking";
        table: {
            disable: boolean;
        };
    };
    const onStalled: {
        action: "vds-stalled";
        table: {
            disable: boolean;
        };
    };
    const onStarted: {
        action: "vds-started";
        table: {
            disable: boolean;
        };
    };
    const onSuspend: {
        action: "vds-suspend";
        table: {
            disable: boolean;
        };
    };
    const onTimeUpdate: {
        action: "vds-time-update";
        table: {
            disable: boolean;
        };
    };
    const onViewTypeChange: {
        action: "vds-view-type-change";
        table: {
            disable: boolean;
        };
    };
    const onVolumeChange: {
        action: "vds-volume-change";
        table: {
            disable: boolean;
        };
    };
    const onWaiting: {
        action: "vds-waiting";
        table: {
            disable: boolean;
        };
    };
    const onMediaProviderConnect: {
        action: "vds-media-provider-connect";
        table: {
            disable: boolean;
        };
    };
}
