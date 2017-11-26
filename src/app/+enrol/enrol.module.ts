import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockEnrolmentContainer } from './containers/block-enrolment/block-enrolment.container';
import { RouterModule } from '@angular/router';
import { routes } from './enrol.routes';

console.log('`Enrol` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BlockEnrolmentContainer]
})
export class EnrolModule { }
