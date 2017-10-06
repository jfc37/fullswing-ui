import { BlocksSummaryModel } from './blocks-summary.component.model';
import { Component, Input } from '@angular/core';

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
