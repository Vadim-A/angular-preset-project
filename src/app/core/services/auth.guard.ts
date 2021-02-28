import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { rootLinks } from '../constants/app-links';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAccessTokenValid()) {
      return true;
    } else {
      return this.router.createUrlTree([rootLinks.login], {
        queryParams: {
          redirectTo: state.url,
        },
      });
    }
  }
}
