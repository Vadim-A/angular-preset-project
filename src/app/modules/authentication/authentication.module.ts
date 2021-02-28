import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule],
})
export class AuthenticationModule {}
