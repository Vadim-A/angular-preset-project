import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import * as rootActions from '@rootStore/actions';
import { RootModuleState } from '@rootStore/reducers';

@Component({
  selector: 'app-authentication-main',
  templateUrl: './authentication-main.component.html',
  styleUrls: ['./authentication-main.component.scss'],
})
export class AuthenticationMainComponent implements OnDestroy {
  form = this.fb.group({
    usermame: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  signInFail = false;

  private ngUnsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<RootModuleState>,
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onSubmit() {
    const actionId = 'login';
    this.store.dispatch(rootActions.ShowLoader({ loaderId: actionId }));
    this.authService
      .login(this.form.get('usermame')?.value, this.form.get('password')?.value)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        finalize(() => this.store.dispatch(rootActions.HideLoader({ loaderId: actionId }))),
      )
      .subscribe(user => {
        if (user) {
          this.store.dispatch(rootActions.SetUser({ user }));
          const redirectTo = this.route.snapshot.queryParams.redirectTo;
          const urlTree = this.router.createUrlTree(redirectTo ? [redirectTo] : []);
          this.router.navigateByUrl(urlTree);
        } else {
          this.signInFail = true;
        }
      });
  }
}
