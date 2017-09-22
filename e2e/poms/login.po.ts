import { AppShell } from './app-shell.po';
import { browser, by, element } from 'protractor';

export class LoginPage extends AppShell {
  public route = 'login';
  protected pageIdentifer = 'login-container';
}
