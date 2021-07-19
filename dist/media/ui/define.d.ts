import { MEDIA_UI_ELEMENT_TAG_NAME, MediaUiElement } from './MediaUiElement';
declare global {
    interface HTMLElementTagNameMap {
        [MEDIA_UI_ELEMENT_TAG_NAME]: MediaUiElement;
    }
}
