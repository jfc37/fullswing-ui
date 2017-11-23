import { AppShell } from './app-shell.po';

const NAME_INPUT = '[data-test-id="name"]';
const SAVE_BUTTON = '[data-test-id="save-button"]';

export class UpdateBlockPage extends AppShell {
  public route = 'blocks/update/:id';
  protected pageIdentifer = 'block-update-container';

  public setName(name: string) {
    return this.enterValue(NAME_INPUT, name);
  }

  public clickSaveButton() {
    this.clickButton(SAVE_BUTTON);
  }
}
