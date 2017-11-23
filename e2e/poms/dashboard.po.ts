import { AppShell } from './app-shell.po';
import { browser, by, element } from 'protractor';

export class DashboardPage extends AppShell {

  public route = 'dashboard';
  protected pageIdentifer = 'dashboard-container';
}
