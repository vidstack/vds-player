import { SLIDER_ELEMENT_TAG_NAME, SliderElement } from './SliderElement';
declare global {
    interface HTMLElementTagNameMap {
        [SLIDER_ELEMENT_TAG_NAME]: SliderElement;
    }
}
