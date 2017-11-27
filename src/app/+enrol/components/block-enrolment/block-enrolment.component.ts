import { Component, Input } from '@angular/core';
import { BlockEnrolmentModel } from './block-enrolment.component.model';

@Component({
  selector: 'fs-blocks-for-enrolment',
  templateUrl: './block-enrolment.component.html',
  styleUrls: ['./block-enrolment.component.scss']
})
export class BlockEnrolmentComponent {
  @Input() public model: BlockEnrolmentModel;
}
