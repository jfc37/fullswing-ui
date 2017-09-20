import { AppShell } from './app-shell.po';
import { browser, by, element } from 'protractor';

export class BlockListPage extends AppShell {

  protected pageIdentifer = 'blocks-container';

  public navigateTo() {
    return browser.get('/blocks');
  }
}
