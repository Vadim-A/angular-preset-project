import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import { RootModuleState, RouterState } from '@rootStore/reducers';
import * as rootActions from '@rootStore/actions';
import { Store } from '@ngrx/store';

@Injectable()
export class RouterEffects {
  routerNavigation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        map((action: RouterNavigationAction<RouterState>) => action.payload.routerState),
        tap(routerState => {
          this.store.dispatch(rootActions.SetTitle({ title: routerState.title }));
          this.titleService.setTitle(routerState.title);
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private titleService: Title, private store: Store<RootModuleState>) {}
}
