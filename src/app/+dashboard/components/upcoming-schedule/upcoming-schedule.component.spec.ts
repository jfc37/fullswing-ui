import { ScheduledClass, UpcomingScheduleModel } from './upcoming-schedule.component.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingScheduleComponent } from './upcoming-schedule.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ineeda } from 'ineeda';
import { getElement, getElementInnerHtml } from '../../../../unit-test-helpers/html-queries';

describe('UpcomingScheduleComponent', () => {
  let component: UpcomingScheduleComponent;
  let fixture: ComponentFixture<UpcomingScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingScheduleComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingScheduleComponent);
    component = fixture.componentInstance;
    component.model = ineeda<UpcomingScheduleModel>();
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

  describe(`when there are no scheduled classes`, () => {
    beforeEach(() => {
      component.model.scheduledClasses = [];
      fixture.detectChanges();
    });

    it(`should display 'Nothing scheduled' message`, () => {
      const el = getElement(fixture.debugElement, 'nothing-scheduled');
      expect(el).toBeTruthy();
    });
  });

  describe(`when there are scheduled classes`, () => {
    const scheduledClass = ineeda<ScheduledClass>({ name: 'Class name', startTime: new Date(2017, 10, 23, 19, 15)});

    beforeEach(() => {
      component.model.scheduledClasses = [scheduledClass, ineeda<ScheduledClass>({ startTime: new Date() })];
      fixture.detectChanges();
    });

    it(`should not display 'Nothing scheduled' message`, () => {
      const el = getElement(fixture.debugElement, 'nothing-scheduled');
      expect(el).toBeFalsy();
    });

    it(`should list all the scheduled classes`, () => {
      const firstClass = getElementInnerHtml(fixture.debugElement, 'scheduled-class-0');
      expect(firstClass).toBeTruthy();

      const secondClass = getElementInnerHtml(fixture.debugElement, 'scheduled-class-1');
      expect(secondClass).toBeTruthy();
    });

    it(`should include class name`, () => {
      const passHtml = getElementInnerHtml(fixture.debugElement, 'scheduled-class-0');
      expect(passHtml).toContain(scheduledClass.name);
    });

    it(`should include start time information`, () => {
      const passHtml = getElementInnerHtml(fixture.debugElement, 'scheduled-class-0');
      expect(passHtml).toContain(scheduledClass.startTime.toTimeString());
    });
  });
});
