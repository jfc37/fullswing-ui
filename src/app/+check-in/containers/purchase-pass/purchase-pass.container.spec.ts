import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePassContainer } from './purchase-pass.container';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CheckInState } from '../../redux/check-in.state';
import { InitialisePassTemplates } from '../../redux/pass-templates/pass-templates.actions';
import { Reset } from '../../redux/pass-purchase/pass-purchase.actions';

describe('PurchasePassContainer', () => {
  let component: PurchasePassContainer;
  let fixture: ComponentFixture<PurchasePassContainer>;

  let store: Store<CheckInState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasePassContainer],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        { provide: Store, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePassContainer);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy('dispatch');
    store.select = jasmine.createSpy('select');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should initialise pass templates`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new InitialisePassTemplates());
  });

  it(`should reset pass purchase`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new Reset());
  });
});
