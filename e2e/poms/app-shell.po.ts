import { browser, by, element } from 'protractor';

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
}
