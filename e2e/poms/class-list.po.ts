import { AppShell } from './app-shell.po';
import { browser, by, element, ExpectedConditions } from 'protractor';

export class ClassListPage extends AppShell {
  public route = 'blocks/:id/classes';
  protected pageIdentifer = 'block-classes-container';

}
