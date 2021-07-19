export namespace SCRUBBER_PREVIEW_ELEMENT_STORYBOOK_ARG_TYPES {
    namespace noClamp {
        const control: string;
        const defaultValue: boolean;
    }
    namespace noTrackFill {
        const control_1: string;
        export { control_1 as control };
        const defaultValue_1: boolean;
        export { defaultValue_1 as defaultValue };
    }
    const onScrubberPreviewConnect: {
        action: "vds-scrubber-preview-connect";
        table: {
            disable: boolean;
        };
    };
    const onScrubberPreviewShow: {
        action: "vds-scrubber-preview-show";
        table: {
            disable: boolean;
        };
    };
    const onScrubberPreviewTimeUpdate: {
        action: "vds-scrubber-preview-time-update";
        table: {
            disable: boolean;
        };
    };
    const onScrubberPreviewHide: {
        action: "vds-scrubber-preview-hide";
        table: {
            disable: boolean;
        };
    };
}
