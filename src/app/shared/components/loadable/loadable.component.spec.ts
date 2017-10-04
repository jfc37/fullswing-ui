import { LoadableModel } from './loadable.component.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadableComponent } from './loadable.component';
import { ineeda } from 'ineeda';
import { getElement } from '../../../../unit-test-helpers/html-queries';

describe('LoadableComponent', () => {
  let component: LoadableComponent;
  let fixture: ComponentFixture<LoadableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadableComponent);
    component = fixture.componentInstance;
    component.model = ineeda<LoadableModel>({hasError: false, isLoading: false});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`when loading`, () => {
    beforeEach(() => {
      component.model.isLoading = true;
      fixture.detectChanges();
    });

    it(`should show loader`, () => {
      const el = getElement(fixture.debugElement, 'loader');
      expect(el).toBeTruthy();
    });

    it(`should not show content`, () => {
      const el = getElement(fixture.debugElement, 'content');
      expect(el).toBeFalsy();
    });
  });

  describe(`when not loading`, () => {
    beforeEach(() => {
      component.model.isLoading = false;
      fixture.detectChanges();
    });

    it(`should not show loader`, () => {
      const el = getElement(fixture.debugElement, 'loader');
      expect(el).toBeFalsy();
    });

    it(`should show content`, () => {
      const el = getElement(fixture.debugElement, 'content');
      expect(el).toBeTruthy();
    });
  });

  describe(`when there is an error`, () => {
    beforeEach(() => {
      component.model.hasError = true;
      fixture.detectChanges();
    });

    it(`should show error`, () => {
      const el = getElement(fixture.debugElement, 'error');
      expect(el).toBeTruthy();
    });

    it(`should not show content`, () => {
      const el = getElement(fixture.debugElement, 'content');
      expect(el).toBeFalsy();
    });
  });

  describe(`when there is no error`, () => {
    beforeEach(() => {
      component.model.hasError = false;
      fixture.detectChanges();
    });

    it(`should not show error`, () => {
      const el = getElement(fixture.debugElement, 'error');
      expect(el).toBeFalsy();
    });

    it(`should show content`, () => {
      const el = getElement(fixture.debugElement, 'content');
      expect(el).toBeTruthy();
    });
  });
});
