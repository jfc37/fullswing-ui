import { LoginPage } from '../poms/login.po';
import { BlockListPage } from '../poms/block-list.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser } from 'protractor';

describe(`given user is unauthenticated`, () => {

  afterEach(() => {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const blocksPage = new BlockListPage();

  [dashboardPage, blocksPage].forEach(page => {
    describe(`when they browse to the ${page.route}`, () => {
      beforeEach(() => {
        page.navigateTo();
      });

      it(`then redirects to login screen`, () => {
        expect(loginPage.isOnPage()).toBe(true, `didn't end up on login screen`);
      });
    });
  });
});

