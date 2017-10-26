import { TeachersEffects } from './redux/teachers/teachers.effects';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './components/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './service/auth.service';
import { LocalStorageService } from './service/local-storage.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './redux/user/user.effects';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

console.log('`Core` bundle loaded synchronously');

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('id_token'))
  }), http, options);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    EffectsModule.forRoot([
      UserEffects,
      TeachersEffects,
    ]),
  ],
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavComponent,
  ],
  providers: [
    AuthService,
    LocalStorageService,
    AuthenticatedGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
  ]
})
export class CoreModule { }
