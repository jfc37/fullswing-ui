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
  @Output() public addToClass = new EventEmitter<number>();
  @Output() public enrolInClass = new EventEmitter<number>();
  @Output() public newStudent = new EventEmitter<void>();

  private _selectedStudentId: number;

  public searchControl = new FormControl();
  private _destroy$ = new ReplaySubject<void>();

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .takeUntil(this._destroy$)
      .debounceTime(300)
      .filter(value => typeof value === 'string' && value.length > 2)
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
    this._selectedStudentId = selectedOption.option.value.id;
  }

  public addToClassClicked(): void {
    this.addToClass.emit(this._selectedStudentId);
    this.clearSelection();
  }

  public enrolInClassClicked(): void {
    this.enrolInClass.emit(this._selectedStudentId);
    this.clearSelection();
  }

  public newStudentClicked(): void {
    this.newStudent.emit();
    this.clearSelection();
  }

  public disableButton(): boolean {
    return !this._selectedStudentId;
  }

  private clearSelection(): void {
    this._selectedStudentId = null;
    this.searchControl.reset();
  }
}
