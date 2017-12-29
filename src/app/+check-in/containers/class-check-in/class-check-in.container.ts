import { User } from '../../../shared/state-models/teacher';
import {
  getAttendingStudentsModelSelector,
  getPassesForStudentSelector,
  getRegisteredStudentsModelSelector,
  getSelectedClassNameSelector,
  getHasStudentGotValidPassSelector,
  getAddStudentModelSelector,
  getCheckInClassId,
  getSelectedClassBlockIdSelector,
  getHasEnrolledStudentSelector,
  getCheckInStudentId,
} from '../../redux/check-in.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { CheckInState } from '../../redux/check-in.state';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RegisteredStudentsModel } from '../../components/registered-students/registered-students.component.model';
import { AttendingStudentsModel } from '../../components/attending-students/attending-students.component.model';
import { InitialisePassesForStudent } from '../../redux/passes/passes.actions';
import { InitialisePassTemplates } from '../../redux/pass-templates/pass-templates.actions';
import { PurchasePassContainer } from '../purchase-pass/purchase-pass.container';
import { DialogService } from '../../services/dialog.service';
import { SetClassForCheckIn, SetStudentForCheckIn, CheckInRequest, RemoveStudentRequest } from '../../redux/student-check-in/student-check-in.actions';
import { SetStudentForPassPurchase } from '../../redux/pass-purchase/pass-purchase.actions';
import { AddStudentModel } from '../../components/add-student/add-student.component.model';
import { ResetStudentSearch, SetStudentSearchText } from '../../redux/student-search/student-search.actions';
import { SetBlockToEnrolIn, SetStudentToEnrol, StudentEnrolRequest, ResetStudentEnrol, StudentEnrolmentComplete } from '../../redux/student-enrol/student-enrol.actions';

@Component({
  selector: 'fs-class-check-in',
  templateUrl: './class-check-in.container.html',
  styleUrls: ['./class-check-in.container.scss']
})
export class ClassCheckInContainer implements OnInit, OnDestroy {
  public name$: Observable<string>;
  public registeredStudentsModel$: Observable<RegisteredStudentsModel>;
  public attendingStudentsModel$: Observable<AttendingStudentsModel>;
  public addStudentModel$: Observable<AddStudentModel>;

  private _destroy$ = new ReplaySubject<void>();

  constructor(
    private _store: Store<CheckInState>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public _dialogService: DialogService) { }

  public ngOnInit(): void {
    this.setupDispatchers();
    this.setupSelectors();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public checkIn(id: number): void {
    this._store.dispatch(new SetStudentForCheckIn(id));
    this._store.dispatch(new InitialisePassesForStudent(id));

    this._store.select(getCheckInStudentId)
      .filter(studentId => studentId === id)
      .switchMapTo(this._store.select(getPassesForStudentSelector))
      .filter(Boolean)
      .switchMapTo(this._store.select(getHasStudentGotValidPassSelector))
      .first()
      .subscribe(hasValidPass => {
        if (hasValidPass) {
          this._store.dispatch(new CheckInRequest());
        } else {
          this._dialogService.openPassPurchase(id)
            .filter(Boolean)
            .subscribe(() => this._store.dispatch(new CheckInRequest()));
        }
      });
  }

  public newStudent(): void {
    this._dialogService.openCreateNewStudent()
      .filter(Boolean)
      .subscribe(id => this.checkIn(id));
  }

  public remove(id: number): void {
    this._store.dispatch(new SetStudentForCheckIn(id));
    this._store.dispatch(new RemoveStudentRequest());
  }

  public searchChanged(text: string): void {
    this._store.dispatch(new SetStudentSearchText(text));
  }

  public enrolStudent(id: number): void {
    this._store.dispatch(new SetStudentToEnrol(id));
    this._store.dispatch(new StudentEnrolRequest());

    this._store.select(getHasEnrolledStudentSelector)
      .filter(Boolean)
      .first()
      .subscribe(() => {
        this._store.dispatch(new StudentEnrolmentComplete());
        this.checkIn(id);
      });
  }

  private setupDispatchers(): void {
    this._store.dispatch(new ResetStudentSearch());
    this._store.dispatch(new ResetStudentEnrol());

    this._activatedRoute.params
      .takeUntil(this._destroy$)
      .map(params => +params['id'])
      .subscribe(id => this._store.dispatch(new SetClassForCheckIn(id)));

    this._store.select(getSelectedClassBlockIdSelector)
      .takeUntil(this._destroy$)
      .filter(Boolean)
      .distinctUntilChanged()
      .subscribe(id => this._store.dispatch(new SetBlockToEnrolIn(id)));
  }

  private setupSelectors(): void {
    this.name$ = this._store.select(getSelectedClassNameSelector)
      .filter(Boolean);

    this.registeredStudentsModel$ = this._store.select(getRegisteredStudentsModelSelector);
    this.attendingStudentsModel$ = this._store.select(getAttendingStudentsModelSelector);
    this.addStudentModel$ = this._store.select(getAddStudentModelSelector);
  }
}
