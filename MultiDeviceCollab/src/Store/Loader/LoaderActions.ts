import {action, ActionType} from 'typesafe-actions';

export enum LoadingStatusKey {
  CONNECT_TO_DEVICE = 'CONNECT_TO_DEVICE',
}

export const startLoading = (key: LoadingStatusKey) =>
  action('LOADING_START', {key});
export const finishLoading = (key: LoadingStatusKey) =>
  action('LOADING_END', {key});

const actions = {
  startLoading,
  finishLoading,
};

export type LoaderAction = ActionType<typeof actions>;
