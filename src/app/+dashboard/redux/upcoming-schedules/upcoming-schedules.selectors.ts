import { UpcomingSchedulesState } from './upcoming-schedules.state';
import { UpcomingScheduleModel, ScheduledClass } from '../../components/upcoming-schedule/upcoming-schedule.component.model';

export const getUpcomingScheduleModel = (state: UpcomingSchedulesState) => {
  if (!!state) {
    return {
      isLoading: !state.hasLoaded,
      hasError: !!state.loadError,
      scheduledClasses: state.classes.map(theClass => ({
        name: theClass.name,
        startTime: theClass.startTime,
      } as ScheduledClass))
    } as UpcomingScheduleModel;
  }

  return null;
};
