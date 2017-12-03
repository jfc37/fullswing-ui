import { ClassesEffects } from './redux/classes/classes.effects';
import { ClassCheckInContainer } from './containers/class-check-in/class-check-in.container';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './check-in.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { checkInReducer } from './redux/check-in.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RegisteredStudentsComponent } from './components/registered-students/registered-students.component';
import { CheckInRepository } from './repositories/check-in.repository';

console.log('`Check In` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('checkIn', checkInReducer),
    EffectsModule.forFeature([
      ClassesEffects,
    ]),
  ],
  declarations: [ClassCheckInContainer, RegisteredStudentsComponent],
  providers: [
    CheckInRepository
  ]
})
export class CheckInModule { }