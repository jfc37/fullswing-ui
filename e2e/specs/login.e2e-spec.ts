import { LoginPage } from '../poms/login.po';
import { BlockListPage } from '../poms/block-list.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser } from 'protractor';

fdescribe(`given unauthenticated user browses to dashboard`, () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  // beforeEach(() => {
  //   dashboardPage.navigateTo();
  // });

  describe(`when they login`, () => {
    // beforeEach(() => {
    //   loginPage.login();
    // });

    it(`should redirect to dashboard`, async() => {
      dashboardPage.navigateTo();
      await loginPage.login();
      await dashboardPage.isOnPage();
    });
  });
});

