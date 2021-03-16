import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeMainComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
