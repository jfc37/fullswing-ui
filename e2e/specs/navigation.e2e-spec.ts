import { LoginPage } from '../poms/login.po';
import { login } from '../helpers/authentication.helpers';
import { BlockListPage } from '../poms/block-list.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser, promise, element, by } from 'protractor';

describe('Application navigation', () => {
  let dashboardPage: DashboardPage;
  let blocksPage: BlockListPage;

  beforeEach(async () => {
    dashboardPage = new DashboardPage();
    blocksPage = new BlockListPage();

    dashboardPage.navigateTo();
    new LoginPage().login();
  });

  afterEach(async () => {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  [
    {
      navTitle: 'Dashboard',
      getPageObject: () => dashboardPage,
    },
    {
      navTitle: 'Blocks',
      getPageObject: () => blocksPage,
    },
  ].forEach(data => {
    it(`should browse to '${data.navTitle}' from navigation`, () => {
      const pageObject = data.getPageObject();
      const navElement = pageObject.getNavigationFor(data.navTitle);

      expect(navElement.isPresent()).toBe(true, `Failed to find '${data.navTitle}' item in the navigation`);
      expect(navElement.getAttribute('href')).toBe(`${browser.baseUrl}/${pageObject.route}`, `Navigation '${data.navTitle}' had the wrong link`);

      navElement.click();
      expect(pageObject.isOnPage()).toBe(true, `Clicking on '${data.navTitle}' navigation didn't redirect to ${data.navTitle} page`);
    });
  });
});
