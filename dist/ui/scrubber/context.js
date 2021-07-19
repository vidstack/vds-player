import {
  createContext,
  derivedContext
} from '../../foundation/context/index.js';
const dragging = createContext(false);
const pointing = createContext(false);
export const scrubberContext = {
  dragging,
  pointing,
  interacting: derivedContext(
    [dragging, pointing],
    ([isDragging, isPointing]) => isDragging || isPointing
  )
};
//# sourceMappingURL=context.js.map
