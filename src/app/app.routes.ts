import { AuthenticatedGuard } from './services/guards/authenticated.guard';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './+login/login.module#LoginModule',
  },
  {
    path: 'dashboard',
    canActivate: [AuthenticatedGuard],
    loadChildren: './+dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'blocks',
    canActivate: [AuthenticatedGuard],
    loadChildren: './+block/block.module#BlockModule',
  },
];
