import { BlocksSummaryModel, BlockSummaryModel } from './blocks-summary.component.model';
import { Component, Input, OnInit, OnChanges, ViewChild, SimpleChanges, AfterViewChecked } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { ReplaySubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'fs-blocks-summary',
  templateUrl: './blocks-summary.component.html',
  styleUrls: ['./blocks-summary.component.scss']
})
export class BlocksSummaryComponent {
  @Input() public model: BlocksSummaryModel;

  public hasBlocks(): boolean {
    return this.model.blocks.length > 0;
  }
}
