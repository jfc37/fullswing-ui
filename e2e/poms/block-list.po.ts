import { AppShell } from './app-shell.po';
import { browser, by, element } from 'protractor';

export class BlockListPage extends AppShell {
  public route = 'blocks';
  protected pageIdentifer = 'blocks-container';
}
