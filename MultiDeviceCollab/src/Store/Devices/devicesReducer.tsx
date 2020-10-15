import {getType} from 'typesafe-actions';
import {EndPoint} from '../../pages/DrawingZone/useGoogleNearby.hook';
import {
  addDeviceActionCreator,
  DeviceActions,
  setBottomSizeActionCreator,
  setLeftSizeActionCreator,
  setRightSizeActionCreator,
  setTopSizeActionCreator,
  setBottomEndpointActionCreator,
  setLeftEndpointActionCreator,
  setRightEndpointActionCreator,
  setTopEndpointActionCreator,
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
      console.log("set Left Size");
      console.log({
        ...state,
        leftDevice: {
          size: action.payload,
          endPoint: state.leftDevice.endPoint,
        },
      })
      return {
        ...state,
        leftDevice: {
          size: action.payload,
          endPoint: state.leftDevice.endPoint,
        },
      };
    case getType(setRightSizeActionCreator):
      console.log("set right size");
      console.log({
        ...state,
        rightDevice: {
          size: action.payload,
          endPoint: state.rightDevice.endPoint,
        },
      });
      return {
        ...state,
        rightDevice: {
          size: action.payload,
          endPoint: state.rightDevice.endPoint,
        },
      };

      case getType(setBottomEndpointActionCreator):
        return {
          ...state,
          bottomDevice: {
            size: state.bottomDevice.size,
            endPoint: action.payload,
          },
        };
      case getType(setTopEndpointActionCreator):
        return {
          ...state,
          topDevice: {
            size: state.topDevice.size,
            endPoint: action.payload,
          },
        };
      case getType(setLeftEndpointActionCreator):
        console.log("set left endpoint");
        console.log({
          ...state,
          leftDevice: {
            size: state.leftDevice.size,
            endPoint: action.payload,
          },
        })
        return {
          ...state,
          leftDevice: {
            size: state.leftDevice.size,
            endPoint: action.payload,
          },
        };
      case getType(setRightEndpointActionCreator):
        console.log("set right endpoint");
        console.log({
          ...state,
          rightDevice: {
            size: state.rightDevice.size,
            endPoint: action.payload,
          },
        });
        return {
          ...state,
          rightDevice: {
            size: state.rightDevice.size,
            endPoint: action.payload,
          },
        };

    default:
      return state;
  }
};
