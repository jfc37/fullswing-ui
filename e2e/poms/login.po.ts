import { AppShell } from './app-shell.po';
import { browser, by, element, promise } from 'protractor';

export class LoginPage extends AppShell {
  public route = 'login';
  protected pageIdentifer = 'login-container';

  public async login() {
    await browser.wait(() => element.all(by.className('auth0-lock-widget')).isPresent());
    const isLoggedInPreviously = await element.all(by.className('auth0-lock-last-login-pane')).isPresent();

    if (isLoggedInPreviously) {
      const lastLoggedIn = element.all(by.css('a.auth0-lock-alternative-link')).first();
      await lastLoggedIn.click();
    }

    const emailSelector = by.css(`input[type="email"]`);
    const passwordSelector = by.css(`input[type="password"]`);
    const submitSelector = by.css(`button[type="submit"]`);

    await browser.wait(() => element.all(emailSelector).first().isPresent(), 5000, 'Timeout out waiting for login box to appear');
    await promise.all([
      element.all(passwordSelector).first().sendKeys('password'),
      element.all(emailSelector).first().sendKeys('placid.joe@gmail.com'),
    ]);
    await browser.sleep(5000);
    await browser.wait(() => element.all(submitSelector).first().isPresent(), 5000, 'Timeout out waiting for submit button');
    await element.all(submitSelector).first().click();
    await browser.sleep(5000);
  }
}
