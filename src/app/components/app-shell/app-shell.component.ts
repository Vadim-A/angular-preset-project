import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as rootSelectors from '@rootStore/selectors';
import { RootModuleState } from '@rootStore/reducers';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import * as rootActions from '@rootStore/actions';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { rootLinks } from '@core/constants/app-links';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent implements OnDestroy {
  title$ = this.store.pipe(select(rootSelectors.selectTitle));
  userName$ = this.store.pipe(
    select(rootSelectors.selectUser),
    map(user => user?.name),
  );

  private ngUnsubscribe$ = new Subject();

  constructor(private authService: AuthService, private store: Store<RootModuleState>, private router: Router) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onLogoutClick() {
    const actionId = 'logout';
    this.store.dispatch(rootActions.ShowLoader({ loaderId: actionId }));
    this.authService
      .logout()
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        finalize(() => this.store.dispatch(rootActions.HideLoader({ loaderId: actionId }))),
      )
      .subscribe(result => {
        if (result) {
          this.store.dispatch(rootActions.SetUser({ user: null }));

          const urlTree = this.router.createUrlTree([rootLinks.login], {
            queryParams: {
              redirectTo: this.router.routerState.snapshot.url,
            },
          });
          this.router.navigateByUrl(urlTree);
        }
      });
  }
}
