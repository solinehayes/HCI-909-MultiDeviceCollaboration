import {ActionType, createAction} from 'typesafe-actions';
import {EndPoint} from '../../pages/DrawingZone/useGoogleNearby.hook';

export enum DeviceActionKey {
  SET_BOTTOM_DEVICE_SIZE = 'SET_BOTTOM_DEVICE_SIZE',
  SET_TOP_DEVICE_SIZE = 'SET_TOP_DEVICE_SIZE',
  SET_LEFT_DEVICE_SIZE = 'SET_LEFT_DEVICE_SIZE',
  SET_RIGHT_DEVICE_SIZE = 'SET_RIGHT_DEVICE_SIZE',

  SET_BOTTOM_DEVICE_ENDPOINT = 'SET_BOTTOM_DEVICE_ENDPOINT',
  SET_TOP_DEVICE_ENDPOINT = 'SET_TOP_DEVICE_ENDPOINT',
  SET_LEFT_DEVICE_ENDPOINT = 'SET_LEFT_DEVICE_ENDPOINT',
  SET_RIGHT_DEVICE_ENDPOINT = 'SET_RIGHT_DEVICE_ENDPOINT',
}

export const setBottomSizeActionCreator = createAction(
  DeviceActionKey.SET_BOTTOM_DEVICE_SIZE,
  (payload: {width: number; height: number}) => payload,
)();
export const setTopSizeActionCreator = createAction(
  DeviceActionKey.SET_TOP_DEVICE_SIZE,
  (payload: {width: number; height: number}) => payload,
)();
export const setLeftSizeActionCreator = createAction(
  DeviceActionKey.SET_LEFT_DEVICE_SIZE,
  (payload: {width: number; height: number}) => payload,
)();
export const setRightSizeActionCreator = createAction(
  DeviceActionKey.SET_RIGHT_DEVICE_SIZE,
  (payload: {width: number; height: number}) => payload,
)();

export const setBottomEndpointActionCreator = createAction(
  DeviceActionKey.SET_BOTTOM_DEVICE_ENDPOINT,
  (payload: EndPoint) => payload,
)();
export const setTopEndpointActionCreator = createAction(
  DeviceActionKey.SET_TOP_DEVICE_ENDPOINT,
  (payload: EndPoint) => payload,
)();
export const setLeftEndpointActionCreator = createAction(
  DeviceActionKey.SET_LEFT_DEVICE_ENDPOINT,
  (payload: EndPoint) => payload,
)();
export const setRightEndpointActionCreator = createAction(
  DeviceActionKey.SET_RIGHT_DEVICE_ENDPOINT,
  (payload: EndPoint) => payload,
)();

export type setBottomDeviceSize = ActionType<typeof setBottomSizeActionCreator>;
export type setTopDeviceSize = ActionType<typeof setTopSizeActionCreator>;
export type setLeftDeviceSize = ActionType<typeof setLeftSizeActionCreator>;
export type setRightDeviceSize = ActionType<typeof setRightSizeActionCreator>;

export type setBottomDeviceEndpoint = ActionType<
  typeof setBottomEndpointActionCreator
>;
export type setTopDeviceEndpoint = ActionType<
  typeof setTopEndpointActionCreator
>;
export type setLeftDeviceEndpoint = ActionType<
  typeof setLeftEndpointActionCreator
>;
export type setRightDeviceEndpoint = ActionType<
  typeof setRightEndpointActionCreator
>;

export type DeviceActions =
  | setBottomDeviceSize
  | setLeftDeviceSize
  | setRightDeviceSize
  | setTopDeviceSize
  | setBottomDeviceEndpoint
  | setTopDeviceEndpoint
  | setLeftDeviceEndpoint
  | setRightDeviceEndpoint;
