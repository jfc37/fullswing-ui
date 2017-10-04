import { AuthoriseContainer } from './containers/authorise/authorise.container';
import { LoginContainer } from './containers/login/login.container';

export const routes = [
  { path: '', children: [
    { path: '', component: LoginContainer },
    { path: 'authorise', component: AuthoriseContainer },
  ]},
];
