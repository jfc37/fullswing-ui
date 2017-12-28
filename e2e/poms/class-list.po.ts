import { AppShell } from './app-shell.po';
import { browser, by, element, ExpectedConditions } from 'protractor';

const CLASS_CHECK_IN_BUTTON = '[data-test-id="check-in-button"]';

export class ClassListPage extends AppShell {
  public route = 'blocks/:id/classes';
  protected pageIdentifer = 'block-classes-container';

    public clickFirstCheckInButton() {
      browser.sleep(10000);
      browser.wait(element(by.css(CLASS_CHECK_IN_BUTTON)).isPresent(), null, `Class check in didn't appear`);

      return element(by.css(CLASS_CHECK_IN_BUTTON)).click();
    }

}
