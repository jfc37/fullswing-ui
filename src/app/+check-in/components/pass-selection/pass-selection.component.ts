import { PassSelectionModel } from './pass-selection.component.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fs-pass-selection',
  templateUrl: './pass-selection.component.html',
  styleUrls: ['./pass-selection.component.scss']
})
export class PassSelectionComponent {
  @Input() public model: PassSelectionModel;
}
