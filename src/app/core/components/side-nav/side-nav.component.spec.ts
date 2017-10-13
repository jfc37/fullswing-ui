import { getElement, getElementInnerHtml, getElements } from '../../../../unit-test-helpers/html-queries';
import { SideNavItemModel, SideNavModel } from './side-nav.component.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ineeda } from 'ineeda';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavComponent ],
      imports: [
        BrowserModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    component.model = ineeda<SideNavModel>({items: []});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should not break when no model`, () => {
    component.model = null;

    expect(() => fixture.detectChanges()).not.toThrowError();
  });

  it(`should display all menu items`, () => {
    component.model.items = [ineeda<SideNavItemModel>(), ineeda<SideNavItemModel>()];

    fixture.detectChanges();

    const menuItems = getElements(fixture.debugElement, 'menu-item-');
    expect(menuItems.length).toBe(component.model.items.length);
  });

  it(`should display menu item name`, () => {
    const expectedName = 'my name';
    component.model.items = [ineeda<SideNavItemModel>({name: expectedName})];

    fixture.detectChanges();

    const innerHtml = getElementInnerHtml(fixture.debugElement, 'menu-item-0');
    expect(innerHtml).toContain(expectedName);
  });

  it(`should have menu item router link`, () => {
    const expectedRouterLink = ['link'];
    component.model.items = [ineeda<SideNavItemModel>({routerLink: expectedRouterLink})];

    fixture.detectChanges();

    const el = getElement(fixture.debugElement, 'menu-item-0');
    expect(el.properties['routerLink']).toBe(expectedRouterLink);
  });
});
