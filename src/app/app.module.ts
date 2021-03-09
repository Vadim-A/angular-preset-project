import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [AppComponent, AppShellComponent, NotFoundComponent, AppPreloaderContainerComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot(rootEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }), // todo: разобраться с этим инструментом
    StoreRouterConnectingModule.forRoot(), // todo: разобраться с этим инструментом
    // StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer, stateKey: 'router' }),
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: NsiRouterStateSerializer,
    },
    {
      // todo: разобраться с этим провайдером
      provide: LOCALE_ID,
      useValue: 'ru-RU',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
