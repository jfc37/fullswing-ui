import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { RouterModule, NoPreloading } from '@angular/router';
import { HttpDecorator } from './service/common/http/http-decorator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: NoPreloading }),
  ],
  providers: [
    { provide: Http, useClass: HttpDecorator },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
