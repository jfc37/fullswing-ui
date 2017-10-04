import { LoginPage } from '../poms/login.po';
import { BlockListPage } from '../poms/block-list.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser } from 'protractor';

describe(`given unauthenticated user browses to dashboard`, () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(async () => {
    dashboardPage.navigateTo();
  });

  afterEach(async() => {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  describe(`when they login`, () => {
    beforeEach(async () => {
      loginPage.login();
    });

    it(`should redirect to dashboard`, async () => {
      dashboardPage.isOnPage();
    });
  });
});
