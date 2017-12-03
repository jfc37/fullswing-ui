import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { RegisteredStudentsModel, StudentModel } from './registered-students.component.model';
import { TableDataSource } from '../../../core/service/table-data-source';

@Component({
  selector: 'fs-registered-students',
  templateUrl: './registered-students.component.html',
  styleUrls: ['./registered-students.component.scss']
})
export class RegisteredStudentsComponent implements OnInit, OnChanges {
  @Input() public model: RegisteredStudentsModel;
  @Output() public checkInStudent = new EventEmitter<number>();

  public displayedColumns = ['checkIn', 'name'];
  public dataSource: TableDataSource<StudentModel>;

  public ngOnInit() {
    this.updateTable();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['model'].isFirstChange()) {
      this.updateTable();
    }
  }

  public hasStudents() {
    return this.model.students.length > 0;
  }

  public updateTable() {
    if (this.model) {
      this.dataSource = new TableDataSource<StudentModel>();
      this.dataSource.sourceChange(this.model.students);
    }
  }

  public checkIn(id: number): void {
    this.checkInStudent.emit(id);
  }
}
