import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {
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
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onSubmit() {
    this.authService
      .login(this.form.get('usermame')?.value, this.form.get('password')?.value)
      .pipe(take(1), takeUntil(this.ngUnsubscribe$))
      .subscribe(result => {
        if (result) {
          const redirectTo = this.route.snapshot.queryParams.redirectTo;
          const urlTree = this.router.createUrlTree(redirectTo ? [redirectTo] : []);
          this.router.navigateByUrl(urlTree);
        } else {
          this.signInFail = true;
        }
      });
  }
}
