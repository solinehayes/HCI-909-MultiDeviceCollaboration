import {getType} from 'typesafe-actions';
import {EndPoint} from '../../pages/DrawingZone/useGoogleNearby.hook';
import {addDeviceActionCreator, DeviceActions} from './deviceActions';

interface Device {
  endPoint: EndPoint | undefined;
  size: {width: number; height: number} | undefined;
}
export interface DeviceState {
  leftDevice: Device;
  rightDevice: Device;
  topDevice: Device;
  bottomDevice: Device;
}

export const initialDeviceState: DeviceState = {
  leftDevice: {endPoint: undefined, size: undefined},
  rightDevice: {endPoint: undefined, size: undefined},
  topDevice: {endPoint: undefined, size: undefined},
  bottomDevice: {endPoint: undefined, size: undefined},
};

export const deviceReducer = (
  state: DeviceState = initialDeviceState,
  action: DeviceActions,
): DeviceState => {
  switch (action.type) {
    case getType(addDeviceActionCreator):
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
