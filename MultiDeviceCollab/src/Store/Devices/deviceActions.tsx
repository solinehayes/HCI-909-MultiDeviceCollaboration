import {ActionType, createAction} from 'typesafe-actions';
import {DeviceState} from './devicesReducer';

export enum DeviceActionKey {
  ADD_DEVICES = 'ADD_DEVICES',
  SET_BOTTOM_DEVICE_SIZE = 'SET_BOTTOM_DEVICE_SIZE',
  SET_TOP_DEVICE_SIZE = 'SET_TOP_DEVICE_SIZE',
  SET_LEFT_DEVICE_SIZE = 'SET_LEFT_DEVICE_SIZE',
  SET_RIGHT_DEVICE_SIZE = 'SET_RIGHT_DEVICE_SIZE',
}

export const addDeviceActionCreator = createAction(
  DeviceActionKey.ADD_DEVICES,
  (payload: Partial<DeviceState>) => payload,
)();
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

export type addDeviceAction = ActionType<typeof addDeviceActionCreator>;
export type setBottomDeviceSize = ActionType<typeof setBottomSizeActionCreator>;
export type setTopDeviceSize = ActionType<typeof setTopSizeActionCreator>;
export type setLeftDeviceSize = ActionType<typeof setLeftSizeActionCreator>;
export type setRightDeviceSize = ActionType<typeof setRightSizeActionCreator>;

export type DeviceActions =
  | addDeviceAction
  | setBottomDeviceSize
  | setLeftDeviceSize
  | setRightDeviceSize
  | setTopDeviceSize;
