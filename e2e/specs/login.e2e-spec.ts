import { LoginPage } from '../poms/login.po';
import { BlockListPage } from '../poms/block-list.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser } from 'protractor';

describe(`given authenticated user`, () => {
  let dashboardPage: DashboardPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    dashboardPage = new DashboardPage();
    loginPage = new LoginPage();

    dashboardPage.navigateTo();
    loginPage.login();
  });

  afterEach(() => {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  describe(`when they log out`, () => {
    it(`should redirect to login`, () => {
      dashboardPage.logout();
      expect(loginPage.isOnPage()).toBe(true, `not on login page after logging out`);
    });
  });
});

describe(`given unauthenticated user browses to dashboard`, () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    dashboardPage.navigateTo();
  });

  afterEach(() => {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  describe(`when they login`, () => {
    beforeEach(() => {
      loginPage.login();
    });

    it(`should redirect to dashboard`, () => {
      expect(dashboardPage.isOnPage()).toBe(true, `not on dashboard page after logging in`);
    });
  });
});
