import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainer } from './containers/dashboard/dashboard.container';
import { RouterModule } from '@angular/router';
import { routes } from './dashboard.routes';
import { CurrentPassesComponent } from './components/current-passes/current-passes.component';

console.log('`Dashboard` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DashboardContainer, CurrentPassesComponent]
})
export class DashboardModule { }
