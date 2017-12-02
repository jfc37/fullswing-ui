import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ClassSummaryModel } from '../classes-summary/classes-summary.component.model';
import { TableDataSource } from '../../../core/service/table-data-source';

@Component({
  selector: 'fs-classes-summary-table',
  templateUrl: './classes-summary-table.component.html',
  styleUrls: ['./classes-summary-table.component.scss']
})
export class ClassesSummaryTableComponent implements OnInit, OnChanges {
  @Input() public model: ClassSummaryModel[];

  public displayedColumns = ['name', 'attendenceNumber', 'date', 'actions'];
  public dataSource: TableDataSource<ClassSummaryModel>;

  public ngOnInit() {
    this.updateTable();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['model'].isFirstChange()) {
      this.updateTable();
    }
  }

  private updateTable() {
    this.dataSource = new TableDataSource<ClassSummaryModel>();
    this.dataSource.sourceChange(this.model);
  }
}
