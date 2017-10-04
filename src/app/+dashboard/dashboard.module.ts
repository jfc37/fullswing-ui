import { UpcomingScheduleEffects } from './redux/upcoming-schedules/upcoming-schedules.effects';
import { CurrentPassesEffects } from './redux/current-passes/current-passes.effects';
import { dashboardReducer } from './redux/dashboard.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainer } from './containers/dashboard/dashboard.container';
import { RouterModule } from '@angular/router';
import { routes } from './dashboard.routes';
import { CurrentPassesComponent } from './components/current-passes/current-passes.component';
import { LoadableComponent } from '../shared/components/loadable/loadable.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UpcomingScheduleComponent } from './components/upcoming-schedule/upcoming-schedule.component';
import { SharedModule } from '../shared/shared.module';

console.log('`Dashboard` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([
      CurrentPassesEffects,
      UpcomingScheduleEffects
    ]),
  ],
  declarations: [
    DashboardContainer,
    CurrentPassesComponent,
    UpcomingScheduleComponent
  ]
})
export class DashboardModule { }
