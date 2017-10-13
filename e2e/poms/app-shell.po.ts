import { browser, by, element, ExpectedConditions, $ } from 'protractor';

const LOG_OUT_SELECTOR = '[data-test-id="log-out"]';

export abstract class AppShell {

  public abstract route: string;
  protected abstract pageIdentifer: string;

  public getNavigationFor(title: string) {
    return element.all(by.css('nav a')).filter(elem => {
      return elem.getText().then(text => text === title);
    }).first();
  }

  public isOnPage() {
    return element.all(by.css(`[data-test-id="${this.pageIdentifer}"]`)).isPresent();
  }

  public navigateTo() {
    return browser.get(`/${this.route}`);
  }

  public async logout() {
    await this.clickButton(LOG_OUT_SELECTOR);
  }

  protected async enterValue(selector: string, value: string) {
    browser.wait(ExpectedConditions.visibilityOf($(selector)), 5000, `waiting for ${selector}, never appeared`);
    const el = element(by.css(selector));
    browser.wait(ExpectedConditions.visibilityOf(el), 5000, `waiting for ${selector}, never appeared`);
    expect(el.isDisplayed()).toBe(true, `${selector} not displayed...`);

    return el.sendKeys(value);
  }

  protected async clickButton(selector: string) {
    const el = element(by.css(selector));
    browser.wait(ExpectedConditions.visibilityOf(el), 10000, `waiting for ${selector}, never appeared`);
    expect(el.isDisplayed()).toBe(true, `${selector} not displayed...`);

    return el.click();
  }
}
