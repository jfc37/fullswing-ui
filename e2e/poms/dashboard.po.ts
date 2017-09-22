import { AppShell } from './app-shell.po';
import { browser, by, element } from 'protractor';

export class DashboardPage extends AppShell {

  public route = 'dashboard';
  protected pageIdentifer = 'dashboard-container';

  public getHeaderText() {
    return element(by.css('[data-test-id="dashboard-container"] h1')).getText();
  }
}
