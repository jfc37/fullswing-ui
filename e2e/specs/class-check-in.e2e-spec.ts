// import { ClassListPage } from '../poms/class-list.po';
// import { BlockListPage } from '../poms/block-list.po';
// import { CreateBlockPage } from '../poms/create-block.po';
// import { UpdateBlockPage } from '../poms/update-block.po';
// import { LoginPage } from '../poms/login.po';
// import { teardown } from '../common/common';
// import { BlockEnrolmentPage } from '../poms/block-enrolment.po';
// import { DashboardPage } from '../poms/dashboard.po';
// import { browser } from 'protractor';
// import { ClassCheckInPage } from '../poms/class-check-in.po';

// fdescribe(`Class check in`, () => {
//   const blockName = `CLASS CHECK IN E2E TEST`;

//   beforeEach(() => {
//     new LoginPage().login();
//   });

//   // afterEach(() => {
//   //   const blockListPage = new BlockListPage();
//   //   blockListPage.navigateTo();
//   //   blockListPage.deleteBlock(blockName);
//   //   teardown();
//   // });

//   function createBlock() {
//     const createBlockPage = new CreateBlockPage();
//     createBlockPage.navigateTo();
//     createBlockPage.createFromScratch(blockName);
//   }

//   function goToClassCheckIn() {
//     const blockListPage = new BlockListPage();
//     blockListPage.navigateTo();
//     blockListPage.clickFirstClassListButton();

//     const classListPage = new ClassListPage();
//     classListPage.clickFirstCheckInButton();

//     const classCheckInPage = new ClassCheckInPage();
//     expect(classCheckInPage.isOnPage()).toBe(true);
//   }

//   it(`class check in should work`, () => {
//     // create block
//     createBlock();

//     // navigate to class check in
//     goToClassCheckIn();

//     // add student to class
//     // enrol student to class
//     // add new student
//     // uncheck all students
//     // ensure enrolled student is registered
//     // refresh page
//     // ensure enrolled student is registered
//   });
// });
