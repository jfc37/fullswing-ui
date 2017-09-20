import { AppShell } from './app-shell.po';
import { browser, by, element } from 'protractor';

export class DashboardPage extends AppShell {

  protected pageIdentifer = 'dashboard-container';

  public navigateTo() {
    return browser.get('/dashboard');
  }

  public getHeaderText() {
    return element(by.css('[data-test-id="dashboard-container"] h1')).getText();
  }
}
