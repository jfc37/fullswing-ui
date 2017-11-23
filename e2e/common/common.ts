import { browser } from 'protractor';

export function teardown() {
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
}
