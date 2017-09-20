import { BlockListPage } from './block-list.po';
import { DashboardPage } from './dashboard.po';
import { browser } from 'protractor';

describe('Browsing around the app', () => {
  let dashboardPage: DashboardPage;
  let blocksPage: BlockListPage;

  beforeEach(() => {
    dashboardPage = new DashboardPage();
    blocksPage = new BlockListPage();

    dashboardPage.navigateTo();
  });

  it(`should browse to 'Blocks' from navigation`, () => {
    const blockNavigation = dashboardPage.getNavigationFor('Blocks');

    expect(blockNavigation.isPresent()).toBe(true, `Failed to find 'Blocks' item in the navigation`);
    expect(blockNavigation.getAttribute('href')).toBe(`${browser.baseUrl}/blocks`, `Navigation 'Block' had the wrong link`);

    blockNavigation.click();
    expect(blocksPage.isOnPage()).toBe(true, `Clicking on 'Blocks' navigation didn't redirect to Blocks page`);
  });
});
