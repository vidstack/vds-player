import { VdsElement } from '../../shared/elements';
import { VdsCustomEvent } from '../../shared/events';

export type ScreenOrientationHost = VdsElement;

export interface ScreenOrientationEvents {
	'orientation-lock-change': VdsCustomEvent<boolean>;
	'orientation-change': VdsCustomEvent<ScreenOrientation>;
}