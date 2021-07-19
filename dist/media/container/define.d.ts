import { MEDIA_CONTAINER_ELEMENT_TAG_NAME, MediaContainerElement } from './MediaContainerElement';
declare global {
    interface HTMLElementTagNameMap {
        [MEDIA_CONTAINER_ELEMENT_TAG_NAME]: MediaContainerElement;
    }
}
