import { LoginPage } from '../poms/login.po';
import { BlockListPage } from '../poms/block-list.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser } from 'protractor';

describe(`given unauthenticated user browses to dashboard`, () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(async () => {
    await dashboardPage.navigateTo();
  });

  afterEach(async() => {
    await browser.executeScript('window.sessionStorage.clear();');
    await browser.executeScript('window.localStorage.clear();');
  });

  describe(`when they login`, () => {
    beforeEach(async () => {
      await loginPage.login();
    });

    it(`should redirect to dashboard`, async () => {
      await dashboardPage.isOnPage();
    });
  });
});
