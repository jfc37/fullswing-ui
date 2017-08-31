import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: './+dashboard#DashboardModule'
  },
];
