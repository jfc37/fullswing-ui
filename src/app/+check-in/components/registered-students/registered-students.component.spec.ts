import { getElement, getElementInnerHtml } from '../../../../unit-test-helpers/html-queries';
import { RegisteredStudentsModel, StudentModel } from './registered-students.component.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredStudentsComponent } from './registered-students.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ineeda } from 'ineeda';
import { MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisteredStudentsComponent', () => {
  let component: RegisteredStudentsComponent;
  let fixture: ComponentFixture<RegisteredStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredStudentsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MatTableModule,
        NoopAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredStudentsComponent);
    component = fixture.componentInstance;

    component.model = ineeda<RegisteredStudentsModel>({ students: [] });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should not show when model is null`, () => {
    component.model = null;
    fixture.detectChanges();

    const element = getElement(fixture.debugElement, 'title');
    expect(element).toBeFalsy();
  });

  describe(`when there are no registered students`, () => {
    beforeEach(() => {
      component.model = ineeda<RegisteredStudentsModel>({ students: [] });

      fixture.detectChanges();
    });

    it(`should display message saying no students registered`, () => {
      const element = getElement(fixture.debugElement, 'no-registered-students');
      expect(element).toBeTruthy();
    });

    it(`should not display table of registered students`, () => {
      const element = getElement(fixture.debugElement, 'registered-students-table');
      expect(element).toBeFalsy();
    });
  });

  describe(`when there are registered students`, () => {
    const student = ineeda<StudentModel>({ name: 'student name', id: 633 });

    beforeEach(() => {
      component.model = ineeda<RegisteredStudentsModel>({ students: [student] });

      component.updateTable();
      fixture.detectChanges();
    });

    it(`should not display message saying no students registered`, () => {
      const element = getElement(fixture.debugElement, 'no-registered-students');
      expect(element).toBeFalsy();
    });

    it(`should display table of registered students`, () => {
      const element = getElement(fixture.debugElement, 'registered-students-table');
      expect(element).toBeTruthy();
    });

    it(`should display student name`, () => {
      const table = getElement(fixture.debugElement, 'registered-students-table');
      const name = getElementInnerHtml(table, 'name');
      expect(name).toBe(student.name);
    });

    it(`should display check in checkbox for student`, () => {
      const table = getElement(fixture.debugElement, 'registered-students-table');
      const checkIn = getElement(table, 'check-in');
      expect(checkIn).toBeTruthy();
    });

    describe(`when check in checkbox is clicked`, () => {
      beforeEach(() => {
        component.checkInStudent.emit = jasmine.createSpy();
        const checkIn = getElement(fixture.debugElement, 'check-in');
        checkIn.nativeElement.click();
      });

      it(`should emit with student's id`, () => {
        expect(component.checkInStudent.emit).toHaveBeenCalledWith(student.id);
      });
    });
  });
});
