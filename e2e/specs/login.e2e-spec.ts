import { LoginPage } from '../poms/login.po';
import { BlockListPage } from '../poms/block-list.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser } from 'protractor';
import { teardown } from '../common/common';

describe('Login', () => {
  let dashboardPage: DashboardPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    dashboardPage = new DashboardPage();
    loginPage = new LoginPage();

    dashboardPage.navigateTo();
  });

  afterEach(teardown);

  it(`authenticated user is redirected to login after logging out`, () => {
    loginPage.login();
    dashboardPage.logout();
    expect(loginPage.isOnPage()).toBe(true, `not on login page after logging out`);
  });

  it(`user is redirected to dashboard after logging in`, () => {
    loginPage.login();
    expect(dashboardPage.isOnPage()).toBe(true, `not on dashboard page after logging in`);
  });
});
