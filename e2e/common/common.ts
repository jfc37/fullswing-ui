import { browser, ExpectedConditions, element, by } from 'protractor';

export function teardown() {
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
}

export function waitForElementToAppear(selector: string, failMessage: string) {
  return browser.wait(ExpectedConditions.presenceOf(element(by.css(selector))), null, failMessage);
}

export function waitForElementToDisappear(selector: string, failMessage: string) {
  return browser.wait(ExpectedConditions.stalenessOf(element(by.css(selector))), null, failMessage);
}

export function clickOnElement(selector: string) {
  return element(by.css(selector)).click();
}
