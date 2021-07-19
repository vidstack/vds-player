import { BUTTON_ELEMENT_TAG_NAME, ButtonElement } from './ButtonElement';
declare global {
    interface HTMLElementTagNameMap {
        [BUTTON_ELEMENT_TAG_NAME]: ButtonElement;
    }
}
