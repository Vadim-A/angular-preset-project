import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoreModule } from '@core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppPreloaderContainerComponent } from './components/app-preloader-container/app-preloader-container.component';
import { NsiRouterStateSerializer, rootReducers } from '@rootStore/reducers';
import { rootEffects } from '@rootStore/effects';
import { SnackbarContainerComponent } from './components/snackbar-container/snackbar-container.component';
import { SnackbarModule } from '@shared/modules/pure/snackbar/snackbar.module';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { i18n_environment } from 'src/environments/i18n/i18n';

if (!environment.production) {
  switch (i18n_environment.localeId) {
    case 'ru-RU':
      registerLocaleData(localeRu, i18n_environment.localeId);
      break;
    default:
      break;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AppShellComponent,
    SnackbarContainerComponent,
    NotFoundComponent,
    AppPreloaderContainerComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SnackbarModule,
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot(rootEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: NsiRouterStateSerializer,
    },
    ...(environment.production ? [] : [{ provide: LOCALE_ID, useValue: i18n_environment.localeId }]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
