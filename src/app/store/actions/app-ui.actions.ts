import { User } from '@core/models/user.model';
import { createAction, props } from '@ngrx/store';

export const ShowLoader = createAction('[UI] Show Loader', props<{ loaderId: string }>());
export const HideLoader = createAction('[UI] Hide Loader', props<{ loaderId: string }>());

export const AddSnackBarMessage = createAction('[UI] Add SnackBar Message', props<{ message: string }>());
export const RemoveSnackBarMessage = createAction('[UI] Remove SnackBar Message', props<{ message: string }>());

export const SetTitle = createAction('[UI] Set Title', props<{ title: string }>());
export const SetUser = createAction('[UI] Set User', props<{ user: User | null }>());
