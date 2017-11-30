import { AppShell } from './app-shell.po';
import { browser, by, element, ExpectedConditions } from 'protractor';

const BLOCK_CARD_SELECTOR = (name) => `[data-block-name="${name}"]`;
const ENROL_CHECKBOX = `[data-test-id="enrol-checkbox"]`;
const BLOCK_ALREADY_ENROLLED = `[data-test-id="already-enrolled"]`;
const ENROL_BUTTON = `[data-test-id="enrol-button"]`;

export class BlockEnrolmentPage extends AppShell {
  public route = 'enrol/blocks';
  protected pageIdentifer = 'block-enrolment-container';

  public enrolInBlock(name: string) {
    const blockCard = element(by.css(BLOCK_CARD_SELECTOR(name)));
    expect(blockCard.isPresent()).toBe(true, `Could not find block called '${name}' on the block enrolment page`);

    const enrolCheckbox = blockCard.$(ENROL_CHECKBOX);
    expect(enrolCheckbox.isPresent()).toBe(true, `Could not find enrol checkbox for block '${name}' on the block enrolment page`);
    enrolCheckbox.click();

    const enrolButton = element(by.css(ENROL_BUTTON));
    expect(enrolCheckbox.isPresent()).toBe(true, `Could not find the enrol button on the block enrolment page`);
    expect(enrolCheckbox.isEnabled()).toBe(true, `Enrol button was not enabled on the block enrolment page`);
    return enrolButton.click();
  }

  public isAlreadyEnroled(name: string) {
    const blockCard = element(by.css(BLOCK_CARD_SELECTOR(name)));
    expect(blockCard.isPresent()).toBe(true, `Could not find block called '${name}' on the block enrolment page`);

    const alreadyEnrolledElement = blockCard.$(BLOCK_ALREADY_ENROLLED);
    return alreadyEnrolledElement.isPresent();
  }
}
