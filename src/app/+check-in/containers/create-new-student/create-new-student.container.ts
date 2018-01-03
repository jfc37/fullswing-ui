import { CheckInState } from '../../redux/check-in.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SetNewStudent, CreateStudentRequest, ResetNewStudent } from '../../redux/new-student/new-student.actions';
import { StudentDetails } from '../../redux/new-student/new-student.state';
import { Observable } from 'rxjs/Observable';
import { getIsCreatingStudentSelector, getCreatedStudentIdSelector } from '../../redux/check-in.reducer';
import { matchOtherValidator } from '../../../shared/validators/match-other.validator';
import { isTrueValidator } from '../../../shared/validators/is-true.validator';
import { MatDialogRef } from '@angular/material';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'fs-create-new-student',
  templateUrl: './create-new-student.container.html',
  styleUrls: ['./create-new-student.container.scss']
})
export class CreateNewStudentContainer implements OnInit, OnDestroy {
  public form: FormGroup;
  public disableCreate$: Observable<boolean>;

  private _destroy$ = new ReplaySubject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<CheckInState>,
    private _dialogRef: MatDialogRef<CreateNewStudentContainer>) { }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, matchOtherValidator('password')]],
      termsAndConditions: ['', [isTrueValidator()]],
    });

    const isFormInvalid$ = this.form.statusChanges
      .map(x => this.form.invalid);

    const isCreating$ = this._store.select(getIsCreatingStudentSelector);

    this.disableCreate$ = Observable.combineLatest(isFormInvalid$, isCreating$)
      .map(disabled => disabled.some(Boolean))
      .startWith(true);

    this._store.select(getCreatedStudentIdSelector)
      .takeUntil(this._destroy$)
      .filter(Boolean)
      .subscribe(id => {
        this._store.dispatch(new ResetNewStudent());
        this._dialogRef.close(id);
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public create(): void {
    const student = {
      firstName: this.form.get('firstName').value,
      surname: this.form.get('surname').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      agreesToTerms: this.form.get('termsAndConditions').value,
    };

    this._store.dispatch(new SetNewStudent(student));
    this._store.dispatch(new CreateStudentRequest());
  }
}
