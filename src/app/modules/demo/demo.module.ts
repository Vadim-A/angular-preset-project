import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMainComponent } from './components/demo-main/demo-main.component';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoContentComponent } from './components/demo-content/demo-content.component';
import { DemoI18nComponent } from './components/demo-i18n/demo-i18n.component';
import { DemoSnackbarComponent } from './components/demo-snackbar/demo-snackbar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DemoMainComponent, DemoContentComponent, DemoI18nComponent, DemoSnackbarComponent],
  imports: [CommonModule, DemoRoutingModule, ReactiveFormsModule],
})
export class DemoModule {}
