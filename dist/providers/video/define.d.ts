import { VIDEO_ELEMENT_TAG_NAME, VideoElement } from './VideoElement';
declare global {
    interface HTMLElementTagNameMap {
        [VIDEO_ELEMENT_TAG_NAME]: VideoElement;
    }
}
