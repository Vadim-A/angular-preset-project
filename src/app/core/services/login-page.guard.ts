import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginPageGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isAccessTokenValid = this.authService.isAccessTokenValid();
    if (isAccessTokenValid) {
      return this.router.createUrlTree([]);
    } else {
      return true;
    }
  }
}
