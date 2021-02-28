import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SelectivePreloadingStrategy } from './services/selective-preload-strategy';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { LoginPageGuard } from './services/login-page.guard';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    SelectivePreloadingStrategy,
    AuthService,
    AuthGuard,
    LoginPageGuard,
  ],
  exports: [ReactiveFormsModule],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
