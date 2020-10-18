import {createReducer} from 'typesafe-actions';
import {LoaderAction} from './LoaderActions';

export interface LoaderState {
  [key: string]: {
    isLoading: boolean;
  };
}

export const initialLoaderState = {};

export const loaderReducer = createReducer<LoaderState, LoaderAction>(
  initialLoaderState,
  {
    /***
    Function modifies the state according to the action type
    If the action is LOADING START: sets the loading boolean of the loading status key to true
    If the action is LOADING END: sets the loading boolean of the loading status key back to false
    ***/
    LOADING_START: (state, action) => ({
      ...state,
      [action.payload.key]: {
        ...state[action.payload.key],
        isLoading: true,
      },
    }),
    LOADING_END: (state, action) => ({
      ...state,
      [action.payload.key]: {
        ...state[action.payload.key],
        isLoading: false,
      },
    }),
  },
);
