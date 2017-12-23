import { CheckInState } from '../../redux/check-in.state';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SetNewStudent, CreateStudentRequest } from '../../redux/new-student/new-student.actions';
import { StudentDetails } from '../../redux/new-student/new-student.state';
import { Observable } from 'rxjs/Observable';
import { getIsCreatingStudentSelector } from '../../redux/check-in.reducer';

@Component({
  selector: 'fs-create-new-student',
  templateUrl: './create-new-student.container.html',
  styleUrls: ['./create-new-student.container.scss']
})
export class CreateNewStudentContainer implements OnInit {
  public form: FormGroup;
  public disableCreate$: Observable<boolean>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<CheckInState>) { }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    const isFormInvalid$ = this.form.statusChanges
      .map(x => this.form.invalid);

    const isCreating$ = this._store.select(getIsCreatingStudentSelector);

    this.disableCreate$ = Observable.combineLatest(isFormInvalid$, isCreating$)
      .map(disabled => disabled.some(Boolean))
      .startWith(true);
  }

  public create(): void {
    const student = {
      firstName: this.form.get('firstName').value,
      surname: this.form.get('surname').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    };

    this._store.dispatch(new SetNewStudent(student));
    this._store.dispatch(new CreateStudentRequest());
  }
}
