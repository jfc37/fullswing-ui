import { LoginPage } from '../poms/login.po';
import { BlockListPage } from '../poms/block-list.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser } from 'protractor';

// describe(`given authenticated user`, () => {
//   let dashboardPage: DashboardPage;
//   let loginPage: LoginPage;

//   beforeEach(async () => {
//     dashboardPage = new DashboardPage();
//     loginPage = new LoginPage();

//     dashboardPage.navigateTo();
//     loginPage.login();
//   });

//   afterEach(async () => {
//     browser.executeScript('window.sessionStorage.clear();');
//     browser.executeScript('window.localStorage.clear();');
//   });

//   describe(`when they log out`, () => {
//     it(`should redirect to login`, async () => {
//       dashboardPage.navigateTo().catch(x => console.error('xxxx nav', x));
//       dashboardPage.logout().catch(x => console.error('xxxx logout', x));
//       expect(loginPage.isOnPage()).toBe(true).catch(x => console.error('xxxx expect', x));
//     });
//   });
// });

describe(`given unauthenticated user browses to dashboard`, () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(async () => {
    dashboardPage.navigateTo();
  });

  afterEach(async () => {
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
