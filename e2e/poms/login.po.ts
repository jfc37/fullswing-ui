import { AppShell } from './app-shell.po';
import { browser, by, element, promise, ExpectedConditions, $ } from 'protractor';

const WIDGET_SELECTOR = '.auth0-lock-widget';
const WIDGET_ALTERNATIVE_LINK_SELECTOR = 'a.auth0-lock-alternative-link';
const PASSWORD_SELECTOR = '[name="password"]';
const EMAIL_SELECTOR = '[name="email"]';
const LOG_IN_BUTTON_SELECTOR = 'button[type="submit"]';

export class LoginPage extends AppShell {
  public route = 'login';
  protected pageIdentifer = 'login-container';

  public isOnPage() {
    browser.ignoreSynchronization = true;
    return super.isOnPage()
      .then(isOnPage => browser.ignoreSynchronization = false || isOnPage);
  }

  public login() {
    this.navigateTo();

    browser.ignoreSynchronization = true;
    this.waitForWidgetToAppear();
    this.enterValue(EMAIL_SELECTOR, 'placid.joe@gmail.com');
    this.enterValue(PASSWORD_SELECTOR, 'password');
    this.clickButton(LOG_IN_BUTTON_SELECTOR);
    return browser.wait(ExpectedConditions.urlContains('dashboard'), null, 'never redirected to dashboard after login')
      .then(() => browser.ignoreSynchronization = false);
  }

  private waitForWidgetToAppear() {
    const el = element(by.css(WIDGET_SELECTOR));
    return browser.wait(ExpectedConditions.visibilityOf(el), null, 'Login widget never appeared');
  }

  private waitForEmailBoxToAppear() {
    const emailElement = element(by.css(EMAIL_SELECTOR));
    return browser.wait(ExpectedConditions.presenceOf(emailElement), null, `waiting for email box, never appeared`);
  }
}
