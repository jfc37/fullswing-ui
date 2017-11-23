import { AppShell } from '../poms/app-shell.po';
import { teardown } from '../common/common';
import { LoginPage } from '../poms/login.po';
import { BlockListPage } from '../poms/block-list.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser, promise, element, by } from 'protractor';

describe('Side navigation', () => {
  let dashboardPage: DashboardPage;
  let blocksPage: BlockListPage;

  beforeEach(() => {
    dashboardPage = new DashboardPage();
    blocksPage = new BlockListPage();

    dashboardPage.navigateTo();
    new LoginPage().login();
  });

  afterEach(teardown);

  it(`user can use side nav to browse around`, () => {
    useNavigation(blocksPage, 'Blocks');
    useNavigation(dashboardPage, 'Dashboard');
  });

  function useNavigation(pom: AppShell, navTitle: string) {
    const navElement = pom.getNavigationFor(navTitle);

    expect(navElement.isPresent()).toBe(true, `Failed to find '${navTitle}' item in the navigation`);
    expect(navElement.getAttribute('href')).toBe(`${browser.baseUrl}/${pom.route}`, `Navigation '${navTitle}' had the wrong link`);

    navElement.click();
    expect(pom.isOnPage()).toBe(true, `Clicking on '${navTitle}' navigation didn't redirect to ${navTitle} page`);
  }
});
