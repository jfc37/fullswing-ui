import { User } from '../../../shared/state-models/teacher';
import {
  getAttendingStudentsModelSelector,
  getPassesForStudentSelector,
  getRegisteredStudentsModelSelector,
  getSelectedClassNameSelector,
  getHasStudentGotValidPassSelector,
} from '../../redux/check-in.reducer';
import { CheckInRequest, SetSelectedClassId, RemoveStudentRequest } from '../../redux/classes/classes.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { CheckInState } from '../../redux/check-in.state';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RegisteredStudentsModel } from '../../components/registered-students/registered-students.component.model';
import { AttendingStudentsModel } from '../../components/attending-students/attending-students.component.model';
import { InitialiseForStudent } from '../../redux/passes/passes.actions';
import { SetCurrentStudent } from '../../redux/current-student/current-student.actions';

@Component({
  selector: 'fs-class-check-in',
  templateUrl: './class-check-in.container.html',
  styleUrls: ['./class-check-in.container.scss']
})
export class ClassCheckInContainer implements OnInit, OnDestroy {
  public name$: Observable<string>;
  public registeredStudentsModel$: Observable<RegisteredStudentsModel>;
  public attendingStudentsModel$: Observable<AttendingStudentsModel>;

  private _destroy$ = new ReplaySubject<void>();
  constructor(
    private _store: Store<CheckInState>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this._activatedRoute.params
      .takeUntil(this._destroy$)
      .map(params => +params['id'])
      .subscribe(id => {
        this._store.dispatch(new SetSelectedClassId(id));
      });

    this.name$ = this._store.select(getSelectedClassNameSelector);
    this.registeredStudentsModel$ = this._store.select(getRegisteredStudentsModelSelector);
    this.attendingStudentsModel$ = this._store.select(getAttendingStudentsModelSelector);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public checkIn(id: number): void {
    this._store.dispatch(new SetCurrentStudent(id));
    this._store.dispatch(new InitialiseForStudent(id));

    this._store.select(getPassesForStudentSelector)
      .filter(Boolean)
      .switchMapTo(this._store.select(getHasStudentGotValidPassSelector))
      .first()
      .subscribe(hasValidPass => {
        if (hasValidPass) {
          this._store.dispatch(new CheckInRequest(id));
        } else {
          alert('Student has no valid passes');
        }
      });
  }

  public remove(id: number): void {
    this._store.dispatch(new RemoveStudentRequest(id));
  }
}
