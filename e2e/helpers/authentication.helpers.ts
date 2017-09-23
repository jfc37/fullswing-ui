import { browser, by, element } from 'protractor';

export function login() {
  browser.get(browser.baseUrl + 'login');
  browser.wait(() => {
    return element.all(by.css(`input[type="email"]`)).isPresent();
      // return browser.findElement(by.css('input[type="email"]')).isDisplayed();
  }, 10000).then(() => {
    browser.findElement(by.css('input[type="email"]')).sendKeys('placid.joe@gmail.com');
    browser.findElement(by.css('input[type="password"]')).sendKeys('password');
    browser.findElement(by.css('button[type="submit"]')).click();
  });
}
