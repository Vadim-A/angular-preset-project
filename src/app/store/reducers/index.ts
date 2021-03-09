import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { appUIReducer, AppUIState } from './app-ui.reducer';

export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
  title: string;
}

export interface RootModuleState {
  appUI: AppUIState;
}

export const rootReducers: ActionReducerMap<RootModuleState> = {
  appUI: appUIReducer,
};

export const selectAppUIState = createFeatureSelector<AppUIState>('appUI');

@Injectable()
export class NsiRouterStateSerializer implements RouterStateSerializer<RouterState> {
  serialize(routerState: RouterStateSnapshot): RouterState {
    const {
      url,
      root: { queryParams },
    } = routerState;

    let route: ActivatedRouteSnapshot = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { params } = route;
    const title = route.data['title'] || '';

    return { url, queryParams, params, title };
  }
}
