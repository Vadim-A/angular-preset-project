import { User } from '@core/models/user.model';
import { Action, createReducer, on } from '@ngrx/store';
import { HideLoader, SetTitle, SetUser, ShowLoader } from '../actions/app-ui.actions';

export interface AppUIState {
  activeLoaders: string[];
  title: string;
  user: User | null;
}

export const initialState: AppUIState = {
  activeLoaders: [],
  title: '',
  user: null,
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
);

export function appUIReducer(state: AppUIState | undefined, action: Action): AppUIState {
  return reducer(state, action);
}

export const selectActiveLoaders = (state: AppUIState) => state.activeLoaders;
export const selectTitle = (state: AppUIState) => state.title;
export const selectUser = (state: AppUIState) => state.user;
