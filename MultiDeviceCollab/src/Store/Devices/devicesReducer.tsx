import {getType} from 'typesafe-actions';
import {EndPoint} from '../../pages/DrawingZone/useGoogleNearby.hook';
import {
  addDeviceActionCreator,
  DeviceActions,
  setBottomSizeActionCreator,
  setLeftSizeActionCreator,
  setRightSizeActionCreator,
  setTopSizeActionCreator,
} from './deviceActions';

interface Device {
  endPoint: EndPoint | null;
  size: {width: number; height: number} | undefined;
}
export interface DeviceState {
  leftDevice: Device;
  rightDevice: Device;
  topDevice: Device;
  bottomDevice: Device;
}

export const initialDeviceState: DeviceState = {
  leftDevice: {endPoint: null, size: undefined},
  rightDevice: {endPoint: null, size: undefined},
  topDevice: {endPoint: null, size: undefined},
  bottomDevice: {endPoint: null, size: undefined},
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
    case getType(setBottomSizeActionCreator):
      return {
        ...state,
        bottomDevice: {
          size: action.payload,
          endPoint: state.bottomDevice.endPoint,
        },
      };
    case getType(setTopSizeActionCreator):
      return {
        ...state,
        topDevice: {
          size: action.payload,
          endPoint: state.topDevice.endPoint,
        },
      };
    case getType(setLeftSizeActionCreator):
      return {
        ...state,
        leftDevice: {
          size: action.payload,
          endPoint: state.leftDevice.endPoint,
        },
      };
    case getType(setRightSizeActionCreator):
      return {
        ...state,
        rightDevice: {
          size: action.payload,
          endPoint: state.rightDevice.endPoint,
        },
      };

    default:
      return state;
  }
};
