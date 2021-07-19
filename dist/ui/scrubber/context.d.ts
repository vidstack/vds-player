export namespace scrubberContext {
    export { dragging };
    export { pointing };
    export const interacting: import("../../foundation/context/types.js").DerivedContext<boolean>;
}
declare const dragging: import("../../foundation/context/types.js").Context<boolean>;
declare const pointing: import("../../foundation/context/types.js").Context<boolean>;
export {};
