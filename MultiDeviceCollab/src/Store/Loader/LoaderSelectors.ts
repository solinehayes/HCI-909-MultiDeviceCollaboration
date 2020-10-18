const loadingStatusSelector = (state, key: string) => state.loader[key];

export const isLoadingSelector = (key: string) => (state): boolean => {
  /***
  Function that returns the loading status of the loading status key defined in parameter
  ***/
  const loadingStatus = loadingStatusSelector(state, key);
  return loadingStatus ? loadingStatus.isLoading : false;
};
