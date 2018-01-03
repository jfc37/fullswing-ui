import { CreateBlockPage } from '../poms/create-block.po';
import { BlockListPage } from '../poms/block-list.po';
import { LoginPage } from '../poms/login.po';
import { teardown } from '../common/common';
import { UpdateBlockPage } from '../poms/update-block.po';
import { browser } from 'protractor';

describe('Blocks', () => {
  let blockListPage: BlockListPage;
  let createBlockPage: CreateBlockPage;
  let updateBlockPage: UpdateBlockPage;

  beforeEach(() => {
    blockListPage = new BlockListPage();
    createBlockPage = new CreateBlockPage();
    updateBlockPage = new UpdateBlockPage();

    new LoginPage().login();

  });

  afterEach(teardown);

  function create(name: string) {
    blockListPage.navigateTo();
    blockListPage.clickCreateButton();
    expect(createBlockPage.isOnPage()).toBe(true, `Clicking the create button didn't move to the create page`);

    createBlockPage.fillFormInCorrectly();
    createBlockPage.setName(name);
    createBlockPage.clickCreateButton();

    blockListPage.isOnPage();
    expect(blockListPage.doesBlockExist(name)).toBe(true, `Block '${name} wasn't found in list`);
  }

  function update(currentName: string, updatedName: string) {
    blockListPage.clickOnBlock(currentName);
    updateBlockPage.setName(updatedName);
    updateBlockPage.clickSaveButton();
    blockListPage.isOnPage();
    expect(blockListPage.doesBlockExist(updatedName)).toBe(true, `Block '${updatedName} wasn't found in list`);
  }

  it(`user should be able to create, update, generate and delete block`, () => {
    const newBlockName = 'New Block xxx';
    const updatedBlockName = 'Updated Block yyy';

    create(newBlockName);
    update(newBlockName, updatedBlockName);
    blockListPage.clickGenerateButton(updatedBlockName);
    blockListPage.deleteBlock(updatedBlockName);
    blockListPage.deleteBlock(updatedBlockName);
  });
});
