import { TOGGLE_ELEMENT_TAG_NAME, ToggleElement } from './ToggleElement';
declare global {
    interface HTMLElementTagNameMap {
        [TOGGLE_ELEMENT_TAG_NAME]: ToggleElement;
    }
}
