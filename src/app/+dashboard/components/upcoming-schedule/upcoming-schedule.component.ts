import { UpcomingScheduleModel } from './upcoming-schedule.component.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fs-upcoming-schedule',
  templateUrl: './upcoming-schedule.component.html',
  styleUrls: ['./upcoming-schedule.component.scss']
})
export class UpcomingScheduleComponent {
  @Input() public model: UpcomingScheduleModel;

  public hasScheduled(): boolean {
    return this.model && this.model.scheduledClasses.length > 0;
  }
}
