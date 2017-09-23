import { browser, by, element } from 'protractor';

export function login() {
  browser.get(browser.baseUrl + 'dashboard');
  browser.wait(() => {
    return element.all(by.css(`input[type="email"]`)).isPresent();
  }).then(() => {
    element.all(by.css('input[type="password"]')).first().sendKeys('password');
    element.all(by.css('input[type="email"]')).first().sendKeys('placid.joe@gmail.com');
    element.all(by.css('button[type="submit"]')).first().click();
  }).then(() => {
    browser.wait(() => {
      return browser.getCurrentUrl().then(url => {
        return url.indexOf('login') === -1;
      });
    });
  });

}
