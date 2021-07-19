import { HLS_ELEMENT_TAG_NAME, HlsElement } from './HlsElement';
declare global {
    interface HTMLElementTagNameMap {
        [HLS_ELEMENT_TAG_NAME]: HlsElement;
    }
}
