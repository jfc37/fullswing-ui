import { TeacherGuard } from './core/guards/teacher.guard';
import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

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
    canActivate: [AuthenticatedGuard, TeacherGuard],
    loadChildren: './+block/block.module#BlockModule',
  },
  {
    path: 'enrol',
    canActivate: [AuthenticatedGuard],
    loadChildren: './+enrol/enrol.module#EnrolModule',
  },
  {
    path: 'check-in',
    canActivate: [AuthenticatedGuard, TeacherGuard],
    loadChildren: './+check-in/check-in.module#CheckInModule',
  },
];
