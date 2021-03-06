import { DialogService } from './services/dialog.service';
import { PassesEffects } from './redux/passes/passes.effects';
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
import { AttendingStudentsComponent } from './components/attending-students/attending-students.component';
import { PassTemplatesEffects } from './redux/pass-templates/pass-templates.effects';
import { PurchasePassContainer } from './containers/purchase-pass/purchase-pass.container';
import { PurchasePassPreambleComponent } from './components/purchase-pass-preamble/purchase-pass-preamble.component';
import { PassSelectionComponent } from './components/pass-selection/pass-selection.component';
import { StudentCheckInEffects } from './redux/student-check-in/student-check-in.effects';
import { PassPurchaseEffects } from './redux/pass-purchase/pass-purchase.effects';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { StudentSearchEffects } from './redux/student-search/student-search.effects';
import { StudentEnrolEffects } from './redux/student-enrol/student-enrol.effects';
import { CreateNewStudentContainer } from './containers/create-new-student/create-new-student.container';
import { NewStudentEffects } from './redux/new-student/new-student.effects';

console.log('`Check In` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('checkIn', checkInReducer),
    EffectsModule.forFeature([
      ClassesEffects,
      PassesEffects,
      PassTemplatesEffects,
      StudentCheckInEffects,
      PassPurchaseEffects,
      StudentSearchEffects,
      StudentEnrolEffects,
      NewStudentEffects,
    ]),
  ],
  declarations: [
    ClassCheckInContainer,
    RegisteredStudentsComponent,
    AttendingStudentsComponent,
    PurchasePassContainer,
    PurchasePassPreambleComponent,
    PassSelectionComponent,
    AddStudentComponent,
    CreateNewStudentContainer,
  ],
  entryComponents: [
    PurchasePassContainer,
    CreateNewStudentContainer,
  ],
  providers: [
    CheckInRepository,
    DialogService,
  ]
})
export class CheckInModule { }
