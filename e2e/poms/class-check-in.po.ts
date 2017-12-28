import { AppShell } from './app-shell.po';
import { browser, by, element, ExpectedConditions } from 'protractor';

export class ClassCheckInPage extends AppShell {
  public route = 'check-in/class/:id';
  protected pageIdentifer = 'class-check-in-container';
}
