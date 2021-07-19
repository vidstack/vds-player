export const HTML5_MEDIA_ELEMENT_STORYBOOK_ARG_TYPES: {
    controlsList: {
        control: string;
    };
    crossOrigin: {
        control: string;
    };
    defaultMuted: {
        control: string;
    };
    defaultPlaybackRate: {
        control: string;
    };
    disableRemotePlayback: {
        control: string;
    };
    height: {
        control: string;
    };
    preload: {
        control: string;
    };
    srcObject: {
        control: string;
    };
    width: {
        control: string;
    };
    autoplay: {
        control: boolean;
    };
    controls: {
        control: string;
        defaultValue: boolean;
    };
    currentTime: {
        control: string;
        defaultValue: number;
    };
    loop: {
        control: string;
    };
    muted: {
        control: string;
    };
    paused: {
        control: string;
        defaultValue: boolean;
    };
    playsinline: {
        control: string;
    };
    volume: {
        control: {
            type: string;
            step: number;
        };
        defaultValue: number;
    };
    onAbort: {
        action: "vds-abort";
        table: {
            disable: boolean;
        };
    };
    onCanPlay: {
        action: "vds-can-play";
        table: {
            disable: boolean;
        };
    };
    onCanPlayThrough: {
        action: "vds-can-play-through";
        table: {
            disable: boolean;
        };
    };
    onDurationChange: {
        action: "vds-duration-change";
        table: {
            disable: boolean;
        };
    };
    onEmptied: {
        action: "vds-emptied";
        table: {
            disable: boolean;
        };
    };
    onEnded: {
        action: "vds-ended";
        table: {
            disable: boolean;
        };
    };
    onError: {
        action: "vds-error";
        table: {
            disable: boolean;
        };
    };
    onFullscreenChange: {
        action: "vds-fullscreen-change";
        table: {
            disable: boolean;
        };
    };
    onLoadedData: {
        action: "vds-loaded-data";
        table: {
            disable: boolean;
        };
    };
    onLoadedMetadata: {
        action: "vds-loaded-metadata";
        table: {
            disable: boolean;
        };
    };
    onLoadStart: {
        action: "vds-load-start";
        table: {
            disable: boolean;
        };
    };
    onMediaTypeChange: {
        action: "vds-media-type-change";
        table: {
            disable: boolean;
        };
    };
    onPause: {
        action: "vds-pause";
        table: {
            disable: boolean;
        };
    };
    onPlay: {
        action: "vds-play";
        table: {
            disable: boolean;
        };
    };
    onPlaying: {
        action: "vds-playing";
        table: {
            disable: boolean;
        };
    };
    onProgress: {
        action: "vds-progress";
        table: {
            disable: boolean;
        };
    };
    onReplay: {
        action: "vds-replay";
        table: {
            disable: boolean;
        };
    };
    onSeeked: {
        action: "vds-seeked";
        table: {
            disable: boolean;
        };
    };
    onSeeking: {
        action: "vds-seeking";
        table: {
            disable: boolean;
        };
    };
    onStalled: {
        action: "vds-stalled";
        table: {
            disable: boolean;
        };
    };
    onStarted: {
        action: "vds-started";
        table: {
            disable: boolean;
        };
    };
    onSuspend: {
        action: "vds-suspend";
        table: {
            disable: boolean;
        };
    };
    onTimeUpdate: {
        action: "vds-time-update";
        table: {
            disable: boolean;
        };
    };
    onViewTypeChange: {
        action: "vds-view-type-change";
        table: {
            disable: boolean;
        };
    };
    onVolumeChange: {
        action: "vds-volume-change";
        table: {
            disable: boolean;
        };
    };
    onWaiting: {
        action: "vds-waiting";
        table: {
            disable: boolean;
        };
    };
    onMediaProviderConnect: {
        action: "vds-media-provider-connect";
        table: {
            disable: boolean;
        };
    };
};
