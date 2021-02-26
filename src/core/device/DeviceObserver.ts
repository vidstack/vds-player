import { listenTo } from '@wcom/events';
import { buildVdsEvent, Unsubscribe } from '../../shared';
import { isUndefined, IS_CLIENT, IS_MOBILE, noop } from '../../utils';

export enum Device {
  Mobile = 'mobile',
  Desktop = 'desktop',
}

export class DeviceChangeEvent extends buildVdsEvent<Device, 'device-change'>(
  'device-change',
) {}

export interface DeviceObserver {
  /**
   * The type of device that is currently used. This is determined by using `ResizeObserver`
   * (if available), otherwise it'll fallback to parsing `window.navigator.userAgent`. The
   * maximum width for the device to be considered mobile is 480px.
   */
  readonly device: Device;

  /**
   * Whether the current `device` is mobile (shorthand for `device === Device.Mobile`).
   */
  readonly isMobileDevice: boolean;

  /**
   * Whether the current `device` is desktop (shorthand for `device === Device.Desktop`).
   */
  readonly isDesktopDevice: boolean;
}

/**
 * Listens for device changes (mobile/desktop) and invokes a callback whether the current
 * view is mobile. It determines the type by either listening for `resize` events
 * on the window (if API is available), otherwise it'll fallback to parsing the user agent string.
 *
 * @param callback - Called when the device changes.
 * @param maxWidth - The maximum window width in pixels to consider device as mobile.
 */
export const onDeviceChange = (
  callback: (device: Device) => void,
  maxWidth = 480,
  isClient = IS_CLIENT,
  isMobile = IS_MOBILE,
): Unsubscribe => {
  const isServerSide = !isClient;
  const isResizeObsDefined = !isUndefined(window.ResizeObserver);

  if (isServerSide || !isResizeObsDefined) {
    callback(isMobile ? Device.Mobile : Device.Desktop);
    return noop;
  }

  function handleWindowResize() {
    const isMobileScreen = window.innerWidth <= maxWidth;
    callback(isMobileScreen || isMobile ? Device.Mobile : Device.Desktop);
  }

  handleWindowResize();
  return listenTo(window, 'resize', handleWindowResize);
};
