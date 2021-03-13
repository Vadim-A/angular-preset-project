import { User } from '@core/models/user.model';
import { Action, createReducer, on } from '@ngrx/store';
import { Snackbar } from '@shared/models/snackbar.model';
import {
  AddSnackbarMessage,
  HideLoader,
  RemoveSnackbarMessage,
  SetTitle,
  SetUser,
  ShowLoader,
} from '../actions/app-ui.actions';

export interface AppUIState {
  activeLoaders: string[];
  title: string;
  user: User | null;
  snackbars: Snackbar[];
}

export const initialState: AppUIState = {
  activeLoaders: [],
  title: '',
  user: null,
  snackbars: [],
};

const reducer = createReducer(
  initialState,
  on(ShowLoader, (state: AppUIState, { loaderId }) => ({
    ...state,
    activeLoaders: [...state.activeLoaders, loaderId],
  })),
  on(HideLoader, (state: AppUIState, { loaderId }) => {
    const actionIndex = state.activeLoaders.indexOf(loaderId);
    const activeLoaders =
      actionIndex === -1
        ? state.activeLoaders
        : [...state.activeLoaders.slice(0, actionIndex), ...state.activeLoaders.slice(actionIndex + 1)];
    return {
      ...state,
      activeLoaders,
    };
  }),
  on(SetTitle, (state: AppUIState, { title }) => ({ ...state, title })),
  on(SetUser, (state: AppUIState, { user }) => ({ ...state, user })),

  on(AddSnackbarMessage, (state: AppUIState, { snackbarConfig }) => ({
    ...state,
    snackbars: [...state.snackbars, { ...snackbarConfig, id: new Date().valueOf() }],
  })),

  on(RemoveSnackbarMessage, (state: AppUIState, { id }) => ({
    ...state,
    snackbars: state.snackbars.filter(snackbar => snackbar.id !== id),
  })),
);

export function appUIReducer(state: AppUIState | undefined, action: Action): AppUIState {
  return reducer(state, action);
}

export const selectActiveLoaders = (state: AppUIState) => state.activeLoaders;
export const selectTitle = (state: AppUIState) => state.title;
export const selectUser = (state: AppUIState) => state.user;
export const selectSnackbars = (state: AppUIState) => state.snackbars;
