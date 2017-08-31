import { DashboardContainer } from './containers/dashboard/dashboard.container';

export const routes = [
  { path: '', children: [
    { path: '', component: DashboardContainer }
  ]},
];
