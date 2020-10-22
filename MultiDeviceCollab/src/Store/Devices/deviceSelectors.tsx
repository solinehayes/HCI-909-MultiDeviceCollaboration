export const leftDeviceSelector = (state) => {
  /***
  Function that returns the left device configuration
  ***/
  return {
    ...state.devices.leftDevice,
  };
};

export const rightDeviceSelector = (state) => {
  /***
  Function that returns the right device configuration
  ***/
  return {
    ...state.devices.rightDevice,
  };
};
export const topDeviceSelector = (state) => {
  /***
  Function that returns the top device configuration
  ***/
  return {
    ...state.devices.topDevice,
  };
};
export const bottomDeviceSelector = (state) => {
  /***
  Function that returns the bottom device configuration
  ***/
  return {
    ...state.devices.bottomDevice,
  };
};
