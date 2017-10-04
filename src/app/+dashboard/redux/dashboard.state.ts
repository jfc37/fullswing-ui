import { UpcomingSchedulesState } from './upcoming-schedules/upcoming-schedules.state';
import { CurrentPassesState } from './current-passes/current-passes.state';

export interface DashboardState {
  currentPasses: CurrentPassesState;
  upcomingSchedules: UpcomingSchedulesState;
}
