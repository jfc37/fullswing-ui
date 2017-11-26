import { Component, Input } from '@angular/core';
import { ClassesSummaryModel } from './classes-summary.component.model';

@Component({
  selector: 'fs-classes-summary',
  templateUrl: './classes-summary.component.html',
  styleUrls: ['./classes-summary.component.scss']
})
export class ClassesSummaryComponent {
  @Input() public model: ClassesSummaryModel;

  public hasClasses(): boolean {
    return this.model.classes.length > 0;
  }
}
