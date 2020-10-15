import {createReducer} from 'typesafe-actions';
import {LoaderAction} from './LoaderActions';

export interface LoaderState {
  [key: string]: {
    error?: string;
    isLoading: boolean;
  };
}

export const initialLoaderState = {};

export const loaderReducer = createReducer<LoaderState, LoaderAction>(
  initialLoaderState,
  {
    LOADING_START: (state, action) => ({
      ...state,
      [action.payload.key]: {
        ...state[action.payload.key],
        isLoading: true,
        error: undefined,
      },
    }),
    LOADING_END: (state, action) => ({
      ...state,
      [action.payload.key]: {
        ...state[action.payload.key],
        isLoading: false,
        error: undefined,
      },
    }),
    LOADING_ERROR: (state, action) => ({
      ...state,
      [action.payload.key]: {
        ...state[action.payload.key],
        isLoading: false,
        error: action.payload.error,
      },
    }),
  },
);
