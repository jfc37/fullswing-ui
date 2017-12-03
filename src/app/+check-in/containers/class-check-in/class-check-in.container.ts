import { User } from '../../../shared/state-models/teacher';
import { getSelectedClassNameSelector, getUnattendingRegisteredStudentsSelector, getAttendingStudentsSelector } from '../../redux/check-in.reducer';
import { SetSelectedClassId } from '../../redux/classes/classes.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { CheckInState } from '../../redux/check-in.state';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fs-class-check-in',
  templateUrl: './class-check-in.container.html',
  styleUrls: ['./class-check-in.container.scss']
})
export class ClassCheckInContainer implements OnInit, OnDestroy {
  public name$: Observable<string>;
  public registeredStudents$: Observable<User[]>;
  public attendingStudents$: Observable<User[]>;

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
    this.registeredStudents$ = this._store.select(getUnattendingRegisteredStudentsSelector);
    this.attendingStudents$ = this._store.select(getAttendingStudentsSelector);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
