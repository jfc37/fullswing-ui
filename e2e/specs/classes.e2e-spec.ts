import { CreateBlockPage } from '../poms/create-block.po';
import { BlockListPage } from '../poms/block-list.po';
import { LoginPage } from '../poms/login.po';
import { teardown } from '../common/common';
import { UpdateBlockPage } from '../poms/update-block.po';
import { ClassListPage } from '../poms/class-list.po';
import { browser } from 'protractor';

describe('Classes', () => {
  let blockListPage: BlockListPage;
  let classListPage: ClassListPage;

  beforeEach(() => {
    blockListPage = new BlockListPage();
    classListPage = new ClassListPage();

    blockListPage.navigateTo();
    new LoginPage().login();
  });

  afterEach(teardown);

  it(`user should be able to browse classes for block`, () => {
    blockListPage.navigateTo();
    browser.wait(blockListPage.isOnPage(), null, `Did not navigate to block list page`);
    blockListPage.clickFirstClassListButton();
    expect(classListPage.isOnPage()).toBe(true);
  });
});
