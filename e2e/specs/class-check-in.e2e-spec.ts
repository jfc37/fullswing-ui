import { ClassListPage } from '../poms/class-list.po';
import { BlockListPage } from '../poms/block-list.po';
import { CreateBlockPage } from '../poms/create-block.po';
import { UpdateBlockPage } from '../poms/update-block.po';
import { LoginPage } from '../poms/login.po';
import { teardown } from '../common/common';
import { BlockEnrolmentPage } from '../poms/block-enrolment.po';
import { DashboardPage } from '../poms/dashboard.po';
import { browser } from 'protractor';
import { ClassCheckInPage } from '../poms/class-check-in.po';

describe(`Class check in`, () => {
  const blockName = `CLASS CHECK IN E2E TEST`;
  const studentAddedToClass = 'Kaitlin Maddever';
  const studentEnroled = 'Johan Vork';

  const classListPage = new ClassListPage();
  const classCheckInPage = new ClassCheckInPage();

  beforeEach(() => {
    new LoginPage().login();
  });

  afterEach(() => {
    const blockListPage = new BlockListPage();
    blockListPage.navigateTo();
    blockListPage.deleteBlock(blockName);
    teardown();
  });

  function createBlock() {
    const createBlockPage = new CreateBlockPage();
    createBlockPage.navigateTo();
    createBlockPage.createFromScratch(blockName);
  }

  function goToClassCheckIn() {
    const blockListPage = new BlockListPage();
    blockListPage.navigateTo();
    blockListPage.clickFirstClassListButton();

    classListPage.clickFirstCheckInButton();

    expect(classCheckInPage.isOnPage()).toBe(true);
  }

  function addStudentToClass() {
    classCheckInPage.addStudentToClass(studentAddedToClass);
    classCheckInPage.waitForPurchasePassToAppear();
    classCheckInPage.purchaseSinglePass();
    classCheckInPage.ensureStudentAttendingClass(studentAddedToClass);

    classCheckInPage.removeStudentFromClass(studentAddedToClass);
    classCheckInPage.ensureStudentIsNotAttendingClass(studentAddedToClass);
    classCheckInPage.ensureStudentIsNotRegisteredForClass(studentAddedToClass);

    classCheckInPage.addStudentToClass(studentAddedToClass);
    classCheckInPage.ensureStudentAttendingClass(studentAddedToClass);
  }

  function enrolStudent() {
    classCheckInPage.enrolStudent(studentEnroled);
    classCheckInPage.waitForPurchasePassToAppear();
    classCheckInPage.purchaseSinglePass();
    classCheckInPage.ensureStudentAttendingClass(studentEnroled);

    classCheckInPage.removeStudentFromClass(studentEnroled);
    classCheckInPage.ensureStudentIsNotAttendingClass(studentEnroled);
    classCheckInPage.ensureStudentIsRegisteredForClass(studentEnroled);

    classCheckInPage.addStudentToClass(studentEnroled);
    classCheckInPage.ensureStudentAttendingClass(studentEnroled);
  }

  it(`class check in should work`, () => {
    createBlock();
    goToClassCheckIn();
    addStudentToClass();
    enrolStudent();
  });
});
