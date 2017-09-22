import { LoginContainer } from './containers/login/login.container';

export const routes = [
  { path: '', children: [
    { path: '', component: LoginContainer }
  ]},
];
