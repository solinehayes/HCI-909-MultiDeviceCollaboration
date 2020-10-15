export const leftDeviceSelector = (state) => {
  return {
    ...state.devices.leftDevice,
  };
};

export const rightDeviceSelector = (state) => {
  return {
    ...state.devices.rightDevice,
  };
};
export const topDeviceSelector = (state) => {
  return {
    ...state.devices.topDevice,
  };
};
export const bottomDeviceSelector = (state) => {
  return {
    ...state.devices.bottomDevice,
  };
};
