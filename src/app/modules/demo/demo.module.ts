import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoContentComponent } from './components/demo-content/demo-content.component';
import { DemoI18nComponent } from './components/demo-i18n/demo-i18n.component';
import { DemoSnackbarComponent } from './components/demo-snackbar/demo-snackbar.component';

@NgModule({
  declarations: [MainComponent, DemoContentComponent, DemoI18nComponent, DemoSnackbarComponent],
  imports: [CommonModule, DemoRoutingModule],
})
export class DemoModule {}
