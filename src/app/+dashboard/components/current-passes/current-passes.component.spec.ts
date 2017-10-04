import { CurrentPassesModel, PassModel } from './current-passes.component.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPassesComponent } from './current-passes.component';
import { ineeda } from 'ineeda';
import { By } from '@angular/platform-browser';
import { getElement, getElementInnerHtml } from '../../../../unit-test-helpers/html-queries';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CurrentPassesComponent', () => {
  let component: CurrentPassesComponent;
  let fixture: ComponentFixture<CurrentPassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentPassesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPassesComponent);
    component = fixture.componentInstance;

    component.model = ineeda<CurrentPassesModel>({ isLoading: false, hasError: false });

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should exist without model', () => {
    component.model = null;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe(`when there are no current passes`, () => {
    beforeEach(() => {
      component.model.passes = [];
      fixture.detectChanges();
    });

    it(`should display 'No Passes' message`, () => {
      const el = getElement(fixture.debugElement, 'no-current-passes');
      expect(el).toBeTruthy();
    });
  });

  describe(`when there are current passes`, () => {
    const pass = ineeda<PassModel>({ type: 'Clip', expiry: new Date('2017-03-14'), additionalInfo: '4 clips remaining' });

    beforeEach(() => {
      component.model.passes = [pass, ineeda<PassModel>({ expiry: new Date() })];
      fixture.detectChanges();
    });

    it(`should not display 'No Passes' message`, () => {
      const el = getElement(fixture.debugElement, 'no-current-passes');
      expect(el).toBeFalsy();
    });

    it(`should list all the passes`, () => {
      const firstPass = getElementInnerHtml(fixture.debugElement, 'current-pass-0');
      expect(firstPass).toBeTruthy();

      const secondPass = getElementInnerHtml(fixture.debugElement, 'current-pass-1');
      expect(secondPass).toBeTruthy();
    });

    it(`should pass type information`, () => {
      const passHtml = getElementInnerHtml(fixture.debugElement, 'current-pass-0');
      expect(passHtml).toContain(pass.type);
    });

    it(`should pass expiry information`, () => {
      const passHtml = getElementInnerHtml(fixture.debugElement, 'current-pass-0');
      expect(passHtml).toContain(pass.expiry.toDateString());
    });

    it(`should additional information`, () => {
      const passHtml = getElementInnerHtml(fixture.debugElement, 'current-pass-0');
      expect(passHtml).toContain(pass.additionalInfo);
    });
  });
});
