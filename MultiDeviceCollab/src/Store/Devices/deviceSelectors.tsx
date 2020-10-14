export const leftDeviceSelector = (state) => {
  return {
    ...state.devices.leftDevice.endPoint,
    size: state.devices.leftDevice.size,
  };
};

export const rightDeviceSelector = (state) => {
  return {
    ...state.devices.rightDevice.endPoint,
    size: state.devices.rightDevice.size,
  };
};
export const topDeviceSelector = (state) => {
  return {
    ...state.devices.topDevice.endPoint,
    size: state.devices.topDevice.size,
  };
};
export const bottomDeviceSelector = (state) => {
  return {
    ...state.devices.bottomDevice.endPoint,
    size: state.devices.bottomDevice.size,
  };
};
