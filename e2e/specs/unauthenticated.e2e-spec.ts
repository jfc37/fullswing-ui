import { teardown } from '../common/common';
import { LoginPage } from '../poms/login.po';
import { BlockListPage } from '../poms/block-list.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser } from 'protractor';

describe(`Unauthenticated users`, () => {

  afterEach(teardown);

  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const blocksPage = new BlockListPage();

  [dashboardPage, blocksPage].forEach(page => {
    it(`unauthenticated user browsing to ${page.route} should redirects to login screen`, () => {
      page.attemptToNavigateTo();
      expect(loginPage.isOnPage()).toBe(true, `didn't end up on login screen`);
    });
  });
});

