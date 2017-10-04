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

  public async login() {
    this.waitForWidgetToAppear();
    this.clearLoggedInPreviously();
    browser.waitForAngular();
    this.enterValue(EMAIL_SELECTOR, 'placid.joe@gmail.com');
    browser.waitForAngular();
    this.enterValue(PASSWORD_SELECTOR, 'password');
    this.clickButton(LOG_IN_BUTTON_SELECTOR);
  }

  private waitForWidgetToAppear() {
    const el = element(by.css(WIDGET_SELECTOR));
    return browser.wait(ExpectedConditions.visibilityOf(el), 10000, 'Login widget never appeared');
  }

  private async clearLoggedInPreviously() {
    const link = element(by.css(WIDGET_ALTERNATIVE_LINK_SELECTOR));
    const linkText = await link.getText();
    const isPreviousLoginSelected = linkText === 'Not your account?';

    if (isPreviousLoginSelected) {
      link.click();
    }
    return promise.fulfilled(true);
  }

  private waitForEmailBoxToAppear() {
    const emailElement = element(by.css(EMAIL_SELECTOR));
    return browser.wait(ExpectedConditions.presenceOf(emailElement), 10000, `waiting for email box, never appeared`);
  }

  private async enterValue(selector: string, value: string) {
    browser.wait(ExpectedConditions.visibilityOf($(selector)), 5000, `waiting for ${selector}, never appeared`);
    const el = element(by.css(selector));
    browser.wait(ExpectedConditions.visibilityOf(el), 5000, `waiting for ${selector}, never appeared`);
    expect(el.isDisplayed()).toBe(true, `${selector} not displayed...`);

    return el.sendKeys(value);
  }

  private async clickButton(selector: string) {
    const el = element(by.css(selector));
    browser.wait(ExpectedConditions.visibilityOf(el), 10000, `waiting for ${selector}, never appeared`);
    expect(el.isDisplayed()).toBe(true, `${selector} not displayed...`);

    return el.click();
  }
}
