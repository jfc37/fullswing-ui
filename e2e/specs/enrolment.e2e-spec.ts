import { BlockListPage } from '../poms/block-list.po';
import { CreateBlockPage } from '../poms/create-block.po';
import { UpdateBlockPage } from '../poms/update-block.po';
import { LoginPage } from '../poms/login.po';
import { teardown } from '../common/common';
import { BlockEnrolmentPage } from '../poms/block-enrolment.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser } from 'protractor';

describe(`Enrolment`, () => {
  const blockName = `BLOCK ENROLMENT E2E TEST`;

  beforeEach(() => {
    new LoginPage().login();
  });

  afterEach(() => {
    const blockListPage = new BlockListPage();
    blockListPage.navigateTo();
    blockListPage.deleteBlock(blockName);
    teardown();
  });

  function createBlock() {
    const createBlockPage = new CreateBlockPage();
    createBlockPage.navigateTo();
    createBlockPage.createFromScratch(blockName);
  }

  it(`user should be able to enrol in a block`, () => {
    createBlock();

    const blockEnrolmentPage = new BlockEnrolmentPage();
    const dashboardPage = new DashboardPage();

    blockEnrolmentPage.navigateTo();
    blockEnrolmentPage.enrolInBlock(blockName);

    expect(dashboardPage.isOnPage()).toBe(true, `Was not redirected to dashboard after enrolling`);

    blockEnrolmentPage.clickOnNavigation('Block Enrolment');
    expect(blockEnrolmentPage.isAlreadyEnroled(blockName)).toBe(true, `User wasn't enrolled`);
  });
});
