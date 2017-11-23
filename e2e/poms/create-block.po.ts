import { AppShell } from './app-shell.po';

const NAME_INPUT = '[data-test-id="name"]';
const START_DATE_INPUT = '[data-test-id="startDate"]';
const START_TIME_INPUT = '[data-test-id="startTime"]';
const MINUTES_PER_CLASS_INPUT = '[data-test-id="minutesPerClass"]';
const NUMBER_OF_CLASSES_INPUT = '[data-test-id="numberOfClasses"]';
const CLASS_CAPACITY_INPUT = '[data-test-id="classCapacity"]';
const TEACHER_INPUT = '[data-test-id="teacher"]';
const CREATE_BUTTON = '[data-test-id="create-button"]';

export class CreateBlockPage extends AppShell {
  public route = 'blocks/create';
  protected pageIdentifer = 'block-create-container';

  public fillFormInCorrectly() {
    this.enterValue(NAME_INPUT, 'E2E test block');
    this.enterValue(MINUTES_PER_CLASS_INPUT,  '60');
    this.enterValue(NUMBER_OF_CLASSES_INPUT,  '6');
    this.enterValue(CLASS_CAPACITY_INPUT,  '25');
    return this.chooseFromSelect(TEACHER_INPUT);
  }

  public setName(name: string) {
    return this.enterValue(NAME_INPUT, name);
  }

  public clickCreateButton() {
    this.clickButton(CREATE_BUTTON);
  }
}
