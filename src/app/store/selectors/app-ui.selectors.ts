import { createSelector } from '@ngrx/store';
import * as fromStore from '../reducers';
import * as fromAppUI from '../reducers/app-ui.reducer';

export const selectActiveLoaders = createSelector(fromStore.selectAppUIState, fromAppUI.selectActiveLoaders);
export const selectShowLoader = createSelector(
  selectActiveLoaders,
  (activateLoaders): boolean => activateLoaders.length > 0,
);

export const selectTitle = createSelector(fromStore.selectAppUIState, fromAppUI.selectTitle);
export const selectUser = createSelector(fromStore.selectAppUIState, fromAppUI.selectUser);
