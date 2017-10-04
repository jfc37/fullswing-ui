import { SharedModule } from './shared/shared.module';
import { LoadableComponent } from './shared/components/loadable/loadable.component';
import { ClassRepository } from './shared/repositories/class.repository';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NoPreloading, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { ROUTES } from './app.routes';
import { AppComponent } from './core/components/app/app.component';
import { CoreModule } from './core/core.module';
import { UserEffects } from './core/redux/user/user.effects';
import { metaReducers, reducers } from './reducers';
import { CustomRouterStateSerializer } from './reducers/custom-router.state';
import { PassRepository } from './shared/repositories/pass.repository';

console.log('`App` bundle loaded synchronously');

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: NoPreloading }),
    CoreModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,

    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
