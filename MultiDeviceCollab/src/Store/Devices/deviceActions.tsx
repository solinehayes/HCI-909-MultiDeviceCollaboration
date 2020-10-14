import {ActionType, createAction} from 'typesafe-actions';
import {DeviceState} from './devicesReducer';

export enum DeviceActionKey {
  ADD_DEVICES = 'ADD_DEVICES',
}

export const addDeviceActionCreator = createAction(
  DeviceActionKey.ADD_DEVICES,
  (payload: Partial<DeviceState>) => payload,
)();

export type addDeviceAction = ActionType<typeof addDeviceActionCreator>;

export type DeviceActions = addDeviceAction;
