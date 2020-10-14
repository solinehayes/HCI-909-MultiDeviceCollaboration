export const leftDeviceSelector = (state) => {
  return {
    ...state.device.leftDevice.endPoint,
    size: state.device.leftDevice.size,
  };
};

export const rightDeviceSelector = (state) => {
  return {
    ...state.device.rightDevice.endPoint,
    size: state.device.rightDevice.size,
  };
};
export const topDeviceSelector = (state) => {
  return {
    ...state.device.topDevice.endPoint,
    size: state.device.topDevice.size,
  };
};
export const bottomDeviceSelector = (state) => {
  return {
    ...state.device.bottomDevice.endPoint,
    size: state.device.bottomDevice.size,
  };
};
