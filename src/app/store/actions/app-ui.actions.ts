import { User } from '@core/models/user.model';
import { createAction, props } from '@ngrx/store';
import { SnackbarConfig } from '@shared/models/snackbar.model';

export const ShowLoader = createAction('[UI] Show Loader', props<{ loaderId: string }>());
export const HideLoader = createAction('[UI] Hide Loader', props<{ loaderId: string }>());

export const AddSnackbarMessage = createAction(
  '[UI] Add Snackbar Message',
  props<{ snackbarConfig: SnackbarConfig }>(),
);
export const RemoveSnackbarMessage = createAction('[UI] Remove Snackbar Message', props<{ id: number }>());

export const SetTitle = createAction('[UI] Set Title', props<{ title: string }>());
export const SetUser = createAction('[UI] Set User', props<{ user: User | null }>());
