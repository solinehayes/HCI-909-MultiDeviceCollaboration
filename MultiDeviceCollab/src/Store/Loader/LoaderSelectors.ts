const loadingStatusSelector = (state, key: string) => state.loader[key];

export const isLoadingSelector = (key: string) => (state): boolean => {
  const loadingStatus = loadingStatusSelector(state, key);
  return loadingStatus ? loadingStatus.isLoading : false;
};

export const hasErroredSelector = (key: string) => (state): boolean => {
  const loadingStatus = loadingStatusSelector(state, key);
  return loadingStatus ? !!loadingStatus.error : false;
};

export const errorSelector = (key: string) => (state): string | undefined => {
  const loadingStatus = loadingStatusSelector(state, key);
  return loadingStatus ? loadingStatus.error : undefined;
};
