import { AttendingStudentsModel, StudentModel } from './attending-students.component.model';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TableDataSource } from '../../../core/service/table-data-source';

@Component({
  selector: 'fs-attending-students',
  templateUrl: './attending-students.component.html',
  styleUrls: ['./attending-students.component.scss']
})
export class AttendingStudentsComponent implements OnInit, OnChanges {
  @Input() public model: AttendingStudentsModel;
  @Output() public removeStudent = new EventEmitter<number>();

  public displayedColumns = ['remove', 'name'];
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

  public remove(id: number): void {
    this.removeStudent.emit(id);
  }

}
