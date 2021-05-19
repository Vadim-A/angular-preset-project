import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoContentComponent } from './components/demo-content/demo-content.component';
import { DemoI18nComponent } from './components/demo-i18n/demo-i18n.component';
import { DemoSnackbarComponent } from './components/demo-snackbar/demo-snackbar.component';
import { DemoMainComponent } from './components/demo-main/demo-main.component';

const routes: Routes = [
  {
    path: '',
    component: DemoMainComponent,
    children: [
      {
        path: 'content',
        component: DemoContentComponent,
        data: {
          title: 'content',
        },
      },
      {
        path: 'snackbar',
        component: DemoSnackbarComponent,
        data: {
          title: 'snackbar',
        },
      },
      {
        path: 'i18n',
        component: DemoI18nComponent,
        data: {
          title: 'i18n',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
