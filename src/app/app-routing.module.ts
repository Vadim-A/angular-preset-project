import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { appLinks } from './core/constants/app-links';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: appLinks.home,
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
        data: { preload: true },
      },
      {
        path: appLinks.demo,
        loadChildren: () =>
          import('./modules/demo/demo.module').then((m) => m.DemoModule),
        data: { preload: true },
      },
    ],
    // canActivate: [AuthGuard],
  },

  {
    path: appLinks.login,
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
    // canActivate: [LoginPageRedirectGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
