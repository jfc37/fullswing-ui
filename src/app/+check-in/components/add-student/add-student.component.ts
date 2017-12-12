import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AddStudentModel } from './add-student.component.model';
import { StudentModel } from '../attending-students/attending-students.component.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ReplaySubject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'fs-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit, OnDestroy {
  @Input() public model: AddStudentModel;

  @Output() public searchChanged = new EventEmitter<string>();

  public searchControl = new FormControl();
  private _destroy$ = new ReplaySubject<void>();

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .takeUntil(this._destroy$)
      .debounceTime(300)
      .subscribe(value => this.searchChanged.emit(value));
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public displayFn(student: StudentModel): string | StudentModel {
    return student ? student.name : student;
  }

  public optionSelected(selectedOption: MatAutocompleteSelectedEvent): void {
    console.error('xxx', selectedOption.option.value);
  }
}
