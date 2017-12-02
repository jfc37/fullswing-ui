import { ClassCheckInContainer } from './containers/class-check-in/class-check-in.container';
import { CLASS_CHECK_IN_ROUTE } from './check-in.routes.constants';


export const routes = [
  { path: '', children: [
    { path: CLASS_CHECK_IN_ROUTE, component: ClassCheckInContainer },
  ]},
];
