import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { MOCK_DATA_USERS } from '@core/constants/api';
import { Store } from '@ngrx/store';
import * as rootActions from '@rootStore/actions';
import { RootModuleState } from '@rootStore/reducers';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  users: object[] = [];

  private ngUnsubscribe$ = new Subject();

  constructor(private httpClient: HttpClient, private store: Store<RootModuleState>) {}

  ngOnInit() {
    const actionId = 'Get mock data';
    this.store.dispatch(rootActions.ShowLoader({ loaderId: actionId }));
    this.httpClient
      .get<object[]>(MOCK_DATA_USERS)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        finalize(() => this.store.dispatch(rootActions.HideLoader({ loaderId: actionId }))),
      )
      .subscribe(users => {
        this.users = users;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
