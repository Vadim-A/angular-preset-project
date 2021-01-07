import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { DemoRoutingModule } from './demo-routing.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, DemoRoutingModule],
})
export class DemoModule {}
