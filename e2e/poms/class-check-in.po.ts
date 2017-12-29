import { AppShell } from './app-shell.po';
import { by, element } from 'protractor';
import { waitForElementToAppear, clickOnElement, waitForElementToDisappear } from '../common/common';

const STUDENT_SEARCH_INPUT = `[data-test-id="student-search-input"]`;
const ADD_TO_CLASS_BUTTON = `[data-test-id="add-to-class-button"]`;
const ENROL_IN_CLASS_BUTTON = `[data-test-id="enrol-in-class-button"]`;
const PURCHASE_PASS_BUTTON = `[data-test-id="purchase-button"]`;
const ATTENDING_STUDENTS_TABLE = `[data-test-id="attending-students-table"]`;
const REGISTERED_STUDENTS_TABLE = `[data-test-id="registered-students-table"]`;
const PURCHASE_PASS_CONTAINER = `[data-test-id="purchase-pass-container"]`;


export class ClassCheckInPage extends AppShell {
  public route = 'check-in/class/:id';
  protected pageIdentifer = 'class-check-in-container';

  public addStudentToClass(name: string) {
    this.selectStudent(name);
    waitForElementToAppear(ADD_TO_CLASS_BUTTON, `Add to class button never appeared`);
    return clickOnElement(ADD_TO_CLASS_BUTTON);
  }

  public enrolStudent(name: string) {
    this.selectStudent(name);
    return clickOnElement(ENROL_IN_CLASS_BUTTON);
  }

  public ensureStudentAttendingClass(name: string) {
    waitForElementToAppear(ATTENDING_STUDENTS_TABLE, `Attending student table never appeared`);
    return waitForElementToAppear(`${ATTENDING_STUDENTS_TABLE} [data-student-name="${name}"]`, `Student '${name} didn't appear in attending table`);
  }

  public ensureStudentIsNotAttendingClass(name: string) {
    return waitForElementToDisappear(`${ATTENDING_STUDENTS_TABLE} [data-student-name="${name}"]`, `Student '${name} is still found in attending table`);
  }

  public ensureStudentIsNotRegisteredForClass(name: string) {
    return waitForElementToDisappear(`${REGISTERED_STUDENTS_TABLE} [data-student-name="${name}"]`, `Student '${name} is still found in registered table`);
  }

  public ensureStudentIsRegisteredForClass(name: string) {
    return waitForElementToAppear(`${REGISTERED_STUDENTS_TABLE} [data-student-name="${name}"]`, `Student '${name} is not found in registered table`);
  }

  public removeStudentFromClass(name: string) {
    waitForElementToAppear(ATTENDING_STUDENTS_TABLE, `Attending student table never appeared`);
    return clickOnElement(`${ATTENDING_STUDENTS_TABLE} [data-student-name="${name}"] [data-test-id="remove"]`);
  }

  public purchaseSinglePass() {
    clickOnElement(`[data-test-name="Casual"] label`);
    clickOnElement(PURCHASE_PASS_BUTTON);
    return this.waitForPurchasePassToDisappear();
  }

  private selectStudent(name: string) {
    this.enterValue(STUDENT_SEARCH_INPUT, name);
    return clickOnElement('mat-option');
  }

  public waitForPurchasePassToAppear() {
    return waitForElementToAppear(PURCHASE_PASS_CONTAINER, `Purchase pass container never appeared`);
  }

  public waitForPurchasePassToDisappear() {
    return waitForElementToAppear(PURCHASE_PASS_CONTAINER, `Purchase pass container never disappeared`);
  }
}
