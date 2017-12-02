import { ClassCheckInContainer } from './containers/class-check-in/class-check-in.container';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './check-in.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

console.log('`Check In` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [ClassCheckInContainer]
})
export class CheckInModule { }
