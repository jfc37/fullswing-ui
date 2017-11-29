import { Component, Input, Output } from '@angular/core';
import { BlockEnrolmentModel, BlockModel } from './block-enrolment.component.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'fs-blocks-for-enrolment',
  templateUrl: './block-enrolment.component.html',
  styleUrls: ['./block-enrolment.component.scss']
})
export class BlockEnrolmentComponent {
  @Input() public model: BlockEnrolmentModel;
  @Output() public blockClicked = new EventEmitter<number>();

  public hasBlocks(): boolean {
    return this.model.groupedBlocks.length > 0;
  }

  public showLackOfSpaceWarning(block: BlockModel) {
    return block.spacesLeft < 6;
  }

  public isOutOfSpace(block: BlockModel) {
    return block.spacesLeft < 1;
  }
}
