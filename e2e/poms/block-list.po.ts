import { AppShell } from './app-shell.po';
import { browser, by, element, ExpectedConditions } from 'protractor';

const CREATE_BLOCK_BUTTON = '[data-test-id="new-block-button"]';
const DELETE_BLOCK_BUTTONS = '[data-test-id*="delete-block-"]';
const GENERATE_BLOCK_BUTTONS = '[data-test-id*="generate-block-"]';
const CLASS_LIST_BUTTONS = '[data-test-id="class-list-button"]';
const ROW_SELECTOR = (name) => `[data-block-name="${name}"]`;

export class BlockListPage extends AppShell {
  public route = 'blocks';
  protected pageIdentifer = 'blocks-container';

  public clickCreateButton() {
    this.clickButton(CREATE_BLOCK_BUTTON);
  }

  public doesBlockExist(name: string) {
    return element(by.linkText(name)).isDisplayed();
  }

  public clickOnBlock(name: string) {
    return element(by.linkText(name)).click();
  }

  public clickFirstClassListButton() {
    return element(by.css(CLASS_LIST_BUTTONS)).click();
  }

  public clickGenerateButton(name: string) {
    const row = this.getRows(name).first();
    row.element(by.css(GENERATE_BLOCK_BUTTONS)).click();
    return browser.wait(element.all(by.css(ROW_SELECTOR(name)))
      .count()
      .then(numberOfRows => numberOfRows === 2), null, `Genearted block didn't appear in list`);
  }

  public deleteBlock(name: string) {
    let rowCount = 0;
    const rows = this.getRows(name);
    rows.count().then(count => rowCount = count);
    rows.first().element(by.css(DELETE_BLOCK_BUTTONS)).click();
    return browser.wait(rows.count().then(currentCount => currentCount < rowCount), null, `Block wasn't removed after deleting`);
  }

  private getRows(name: string) {
    return element.all(by.css(ROW_SELECTOR(name)));
  }
}
