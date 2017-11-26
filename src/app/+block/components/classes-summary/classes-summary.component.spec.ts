import { ClassesSummaryTableComponent } from '../classes-summary-table/classes-summary-table.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesSummaryComponent } from './classes-summary.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getElement, getElementInnerHtml } from '../../../../unit-test-helpers/html-queries';
import { ClassesSummaryModel, ClassSummaryModel } from './classes-summary.component.model';
import { ineeda } from 'ineeda';
import { By } from '@angular/platform-browser';

describe('ClassesSummaryComponent', () => {
  let component: ClassesSummaryComponent;
  let fixture: ComponentFixture<ClassesSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClassesSummaryComponent,
        ClassesSummaryTableComponent
      ],
      imports: [
        MatTableModule,
        NoopAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesSummaryComponent);
    component = fixture.componentInstance;
    component.model = ineeda<ClassesSummaryModel>({classes: []});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist without model', () => {
    component.model = null;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe(`when there are no classes`, () => {
    beforeEach(() => {
      component.model.classes = [];
      fixture.detectChanges();
    });

    it(`should display 'No Classes' message`, () => {
      const el = getElement(fixture.debugElement, 'no-classes');
      expect(el).toBeTruthy();
    });

    it(`should not display classes table`, () => {
      const el = getElement(fixture.debugElement, 'classes-table');
      expect(el).toBeFalsy();
    });
  });

  describe(`when there are classes`, () => {
    beforeEach(() => {
      component.model.classes = [
        ineeda<ClassSummaryModel>(),
        ineeda<ClassSummaryModel>(),
        ineeda<ClassSummaryModel>()
      ];
      fixture.detectChanges();
    });

    it(`should not display 'No Classes' message`, () => {
      const el = getElement(fixture.debugElement, 'no-classes');
      expect(el).toBeFalsy();
    });

    it(`should display classes table`, () => {
      const el = getElement(fixture.debugElement, 'classes-table');
      expect(el).toBeTruthy();
    });

    it(`should display a row for each class`, () => {
      const expectedRows = component.model.classes.length;

      const rows = fixture.debugElement.queryAll(By.css('mat-row'));

      expect(rows.length).toBe(expectedRows);
    });

    it(`should display class name`, () => {
      const expectedName = 'xxx';
      component.model.classes[0].name = expectedName;

      fixture.detectChanges();

      const className = getElementInnerHtml(fixture.debugElement, 'class-details-link');
      expect(className).toBe(expectedName);
    });

    it(`should display class date`, () => {
      const expectedDate = 'xxx';
      component.model.classes[0].date = expectedDate;

      fixture.detectChanges();

      const classDate = getElementInnerHtml(fixture.debugElement, 'class-date');
      expect(classDate).toBe(expectedDate);
    });

    it(`should display attendence number`, () => {
      const expectedAttendenceNumber = 42;
      component.model.classes[0].attendenceNumber = expectedAttendenceNumber;

      fixture.detectChanges();

      const classDate = getElementInnerHtml(fixture.debugElement, 'class-attendence-number');
      expect(classDate).toBe(String(expectedAttendenceNumber));
    });
  });
});
