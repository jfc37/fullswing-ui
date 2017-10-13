import { TopNavModel } from './top-nav.component.model';
import { getElement, getElementInnerHtml } from '../../../../unit-test-helpers/html-queries';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavComponent } from './top-nav.component';
import { ineeda } from 'ineeda';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopNavComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    component.model = ineeda<TopNavModel>({ name: 'Joe Blogs', canLogout: true });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle when model is null', () => {
    component.model = null;

    expect(() => fixture.detectChanges()).not.toThrowError();
  });

  it(`should display name when there is a name`, () => {
    component.model.name = 'Joe';

    fixture.detectChanges();

    const nameHtml = getElementInnerHtml(fixture.debugElement, 'user-name');
    expect(nameHtml).toContain(component.model.name);
  });

  it(`should not display name when there is none`, () => {
    component.model.name = null;

    fixture.detectChanges();

    const el = getElement(fixture.debugElement, 'user-name');
    expect(el).toBeNull();
  });

  it(`should not show logout when user can't log out`, () => {
    component.model.canLogout = false;

    fixture.detectChanges();

    const el = getElement(fixture.debugElement, 'log-out');
    expect(el).toBeNull();
  });

  it(`should show logout when user can log out`, () => {
    component.model.canLogout = true;

    fixture.detectChanges();

    const el = getElement(fixture.debugElement, 'log-out');
    expect(el).toBeTruthy();
  });

  it(`should emit event when log out is clicked`, () => {
    component.loggedOut.emit = jasmine.createSpy('loggedOut');

    component.logOut();

    expect(component.loggedOut.emit).toHaveBeenCalled();
  });
});
