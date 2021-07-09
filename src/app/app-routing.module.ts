import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { rootLinks } from '@core/constants/app-links';
import { AuthGuard } from '@core/services/auth.guard';
import { LoginPageGuard } from '@core/services/login-page.guard';
import { SelectivePreloadingStrategy } from '@core/services/selective-preload-strategy';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: rootLinks.home },
      {
        path: rootLinks.home,
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        data: {
          preload: true,
          title: 'Home page',
        },
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: rootLinks.demo,
    loadChildren: () => import('./modules/demo/demo.module').then(m => m.DemoModule),
    data: {
      preload: true,
      title: 'Demo page',
    },
  },
  {
    path: rootLinks.login,
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    data: { preload: false, title: 'Login page' },
    canActivate: [LoginPageGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      preload: true,
      title: '404',
    },
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectivePreloadingStrategy,
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
