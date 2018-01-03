import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendingStudentsComponent } from './attending-students.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ineeda } from 'ineeda';
import { AttendingStudentsModel, StudentModel } from './attending-students.component.model';
import { getElement, getElementInnerHtml } from '../../../../unit-test-helpers/html-queries';

describe('AttendingStudentsComponent', () => {
  let component: AttendingStudentsComponent;
  let fixture: ComponentFixture<AttendingStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendingStudentsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MatTableModule,
        NoopAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendingStudentsComponent);

    component = fixture.componentInstance;

        component.model = ineeda<AttendingStudentsModel>({ students: [] });
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

    describe(`when there are no attending students`, () => {
      beforeEach(() => {
        component.model = ineeda<AttendingStudentsModel>({ students: [] });

        fixture.detectChanges();
      });

      it(`should display message saying no students attending`, () => {
        const element = getElement(fixture.debugElement, 'no-attending-students');
        expect(element).toBeTruthy();
      });

      it(`should not display table of attending students`, () => {
        const element = getElement(fixture.debugElement, 'attending-students-table');
        expect(element).toBeFalsy();
      });
    });

    describe(`when there are attending students`, () => {
      const student = ineeda<StudentModel>({ name: 'student name', id: 633 });

      beforeEach(() => {
        component.model = ineeda<AttendingStudentsModel>({ students: [student] });

        component.updateTable();
        fixture.detectChanges();
      });

      it(`should not display message saying no students attending`, () => {
        const element = getElement(fixture.debugElement, 'no-attending-students');
        expect(element).toBeFalsy();
      });

      it(`should display table of attending students`, () => {
        const element = getElement(fixture.debugElement, 'attending-students-table');
        expect(element).toBeTruthy();
      });

      it(`should display student name`, () => {
        const table = getElement(fixture.debugElement, 'attending-students-table');
        const name = getElementInnerHtml(table, 'name');
        expect(name).toBe(student.name);
      });

      it(`should display check in checkbox for student`, () => {
        const table = getElement(fixture.debugElement, 'attending-students-table');
        const checkIn = getElement(table, 'remove');
        expect(checkIn).toBeTruthy();
      });

      describe(`when remove checkbox is clicked`, () => {
        beforeEach(() => {
          component.removeStudent.emit = jasmine.createSpy();
          const checkIn = getElement(fixture.debugElement, 'remove');
          checkIn.nativeElement.click();
        });

        it(`should emit with student's id`, () => {
          expect(component.removeStudent.emit).toHaveBeenCalledWith(student.id);
        });
      });
    });
  });

