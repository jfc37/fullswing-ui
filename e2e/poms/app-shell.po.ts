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

  public clickOnNavigation(title: string) {
    return this.getNavigationFor(title).click();
  }

  public isOnPage() {
    return element.all(by.css(`[data-test-id="${this.pageIdentifer}"]`)).isPresent();
  }

  public navigateTo() {
    return browser.get(`/${this.route}`);
  }

  public logout() {
    return this.clickButton(LOG_OUT_SELECTOR);
  }

  protected enterValue(selector: string, value: string) {
    browser.wait(ExpectedConditions.visibilityOf($(selector)), null, `waiting for ${selector}, never appeared`);
    const el = element(by.css(selector));
    browser.wait(ExpectedConditions.visibilityOf(el), null, `waiting for ${selector}, never appeared`);
    expect(el.isDisplayed()).toBe(true, `${selector} not displayed...`);
    el.clear();
    return el.sendKeys(value);
  }

  protected chooseFromSelect(selector: string) {
    browser.wait(ExpectedConditions.visibilityOf($(selector)), null, `waiting for ${selector}, never appeared`);
    const el = element(by.css(selector));
    browser.wait(ExpectedConditions.visibilityOf(el), null, `waiting for ${selector}, never appeared`);
    expect(el.isDisplayed()).toBe(true, `${selector} not displayed...`);
    el.click();
    return element(by.css('mat-option')).click();
  }

  protected clickButton(selector: string) {
    const el = element(by.css(selector));
    browser.wait(ExpectedConditions.visibilityOf(el), null, `waiting for ${selector}, never appeared`);
    expect(el.isDisplayed()).toBe(true, `${selector} not displayed...`);

    return el.click();
  }
}
