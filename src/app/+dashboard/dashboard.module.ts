import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainer } from './containers/dashboard/dashboard.container';
import { RouterModule } from '@angular/router';
import { routes } from './dashboard.routes';

console.log('`Dashboard` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DashboardContainer]
})
export class DashboardModule { }
