import { CurrentPassesModel } from './current-passes.component.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fs-current-passes',
  templateUrl: './current-passes.component.html',
  styleUrls: ['./current-passes.component.scss']
})
export class CurrentPassesComponent {
  @Input() public model: CurrentPassesModel;

  public hasPasses(): boolean {
    return this.model.passes.length > 0;
  }
}
