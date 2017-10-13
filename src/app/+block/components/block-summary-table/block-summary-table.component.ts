import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import * as moment from 'moment';

import { TableDataSource } from '../../../core/service/table-data-source';
import { BlockSummaryModel } from '../blocks-summary/blocks-summary.component.model';

@Component({
  selector: 'fs-block-summary-table',
  templateUrl: './block-summary-table.component.html',
  styleUrls: ['./block-summary-table.component.scss']
})
export class BlockSummaryTableComponent implements OnInit {

  @Input() public model: BlockSummaryModel[];
  @ViewChild(MatPaginator) public paginator;
  @ViewChild(MatSort) public sort: MatSort;

  public displayedColumns = ['name', 'between', 'day', 'time'];
  public dataSource: TableDataSource<BlockSummaryModel>;

  private _ordering = {
    name: (a: BlockSummaryModel, b: BlockSummaryModel) => a.name < b.name ? -1 : 1,
    between: (a: BlockSummaryModel, b: BlockSummaryModel) => moment(a.startDate).isBefore(moment(b.startDate)) ? -1 : 1,
  };

  public ngOnInit() {
    this.dataSource = new TableDataSource<BlockSummaryModel>(this.paginator, this.sort, this._ordering);
    this.dataSource.sourceChange(this.model);
  }
}

