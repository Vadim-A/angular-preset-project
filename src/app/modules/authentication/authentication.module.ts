import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationMainComponent } from './components/authentication-main/authentication-main.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthenticationMainComponent],
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule],
})
export class AuthenticationModule {}
