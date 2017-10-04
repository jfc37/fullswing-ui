import { LoadUpcomingScheduleRequest } from '../../redux/upcoming-schedules/upcoming-schedules.actions';
import { UpcomingScheduleModel } from '../../components/upcoming-schedule/upcoming-schedule.component.model';
import { getCurrentPassesModelSelector, getUpcomingScheduleModelSelector } from '../../redux/dashboard.reducer';
import { DashboardState } from '../../redux/dashboard.state';
import { CurrentPassesModel } from '../../components/current-passes/current-passes.component.model';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoadCurrentPassesRequest } from '../../redux/current-passes/current-passes.actions';

@Component({
  selector: 'fs-dashboard',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardContainer implements OnInit {
  public currentPasses$: Observable<CurrentPassesModel>;
  public upcomingSchedule$: Observable<UpcomingScheduleModel>;

  constructor(private _store: Store<DashboardState>) { }

  public ngOnInit(): void {
    this._store.dispatch(new LoadCurrentPassesRequest());
    this._store.dispatch(new LoadUpcomingScheduleRequest());
    this.currentPasses$ = this._store.select(getCurrentPassesModelSelector);
    this.upcomingSchedule$ = this._store.select(getUpcomingScheduleModelSelector);
  }
}
