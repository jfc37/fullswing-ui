import { LoadableModel } from '../../../shared/components/loadable/loadable.component.model';

export interface UpcomingScheduleModel extends LoadableModel {
  scheduledClasses: ScheduledClass[];
}

export interface ScheduledClass {
  name: string;
  startTime: Date;
}
