import { AppShell } from './app-shell.po';
import { browser, by, element, promise } from 'protractor';

export class LoginPage extends AppShell {
  public route = 'login';
  protected pageIdentifer = 'login-container';

  public async login() {
    // await browser.wait(() => element.all(by.css(`input[type="email"]`)).isPresent())
    //   .then(() => promise.all([
    //     element.all(by.css('input[type="password"]')).first().sendKeys('password'),
    //     element.all(by.css('input[type="email"]')).first().sendKeys('placid.joe@gmail.com'),
    //   ]))
    //   .then(() => browser.sleep(5000))
    //   .then(() => element.all(by.css('button[type="submit"]')).first().click());

    await browser.wait(() => element.all(by.css(`input[type="email"]`)).isPresent());
    await promise.all([
      element.all(by.css('input[type="password"]')).first().sendKeys('password'),
      element.all(by.css('input[type="email"]')).first().sendKeys('placid.joe@gmail.com'),
    ]);
    await browser.sleep(5000);
    await element.all(by.css('button[type="submit"]')).first().click();
    await browser.sleep(5000);
  }
}
