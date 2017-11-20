import { Component, Input, OnInit, ViewChild, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import * as moment from 'moment';

import { TableDataSource } from '../../../core/service/table-data-source';
import { BlockSummaryModel } from '../blocks-summary/blocks-summary.component.model';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'fs-block-summary-table',
  templateUrl: './block-summary-table.component.html',
  styleUrls: ['./block-summary-table.component.scss']
})
export class BlockSummaryTableComponent implements OnInit, OnChanges {
  @Input() public model: BlockSummaryModel[];
  @Output() public generateBlock = new EventEmitter<number>();
  @Output() public deleteBlock = new EventEmitter<number>();
  @ViewChild(MatPaginator) public paginator;
  @ViewChild(MatSort) public sort: MatSort;

  public displayedColumns = ['name', 'between', 'day', 'time', 'actions'];
  public dataSource: TableDataSource<BlockSummaryModel>;

  private _ordering = {
    name: (a: BlockSummaryModel, b: BlockSummaryModel) => a.name < b.name ? -1 : 1,
    between: (a: BlockSummaryModel, b: BlockSummaryModel) => moment(a.startDate).isBefore(moment(b.startDate)) ? -1 : 1,
  };

  public ngOnInit() {
    this.updateTable();
    this.sort.sort({id: 'between', start: 'desc', disableClear: false});
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['model'].isFirstChange()) {
      this.updateTable();
    }
  }

  public clickGenerate(block: BlockSummaryModel): void {
    this.generateBlock.emit(block.id);
  }

  public clickDelete(block: BlockSummaryModel): void {
    this.deleteBlock.emit(block.id);
  }

  private updateTable() {
    this.dataSource = new TableDataSource<BlockSummaryModel>(this.paginator, this.sort, this._ordering);
    this.dataSource.sourceChange(this.model);
  }
}

