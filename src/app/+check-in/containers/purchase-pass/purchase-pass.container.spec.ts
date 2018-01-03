import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePassContainer } from './purchase-pass.container';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CheckInState } from '../../redux/check-in.state';
import { InitialisePassTemplates } from '../../redux/pass-templates/pass-templates.actions';
import { ResetPassPurchase, SetStudentForPassPurchase, PurchasePassRequest } from '../../redux/pass-purchase/pass-purchase.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

describe('PurchasePassContainer', () => {
  let component: PurchasePassContainer;
  let fixture: ComponentFixture<PurchasePassContainer>;

  let store: Store<CheckInState>;
  let dialogRef: MatDialogRef<PurchasePassContainer>;
  const studentId = 62332;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasePassContainer],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        { provide: Store, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { studentId } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePassContainer);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy('dispatch');
    store.select = jasmine.createSpy('select')
      .and.returnValue(Observable.of(false));

    dialogRef = TestBed.get(MatDialogRef);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should initialise pass templates`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new InitialisePassTemplates());
  });

  it(`should reset pass purchase`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new ResetPassPurchase());
  });

  it(`should set student for pass purchase`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new SetStudentForPassPurchase(studentId));
  });

  describe(`when purchase is clicked`, () => {
    beforeEach(() => {
      component.purchase();
    });

    it(`should dispatch purchase action`, () => {
      expect(store.dispatch).toHaveBeenCalledWith(new PurchasePassRequest());
    });
  });

  describe(`when purchase is complete`, () => {
    beforeEach(() => {
      dialogRef.close = jasmine.createSpy();

      store.select = jasmine.createSpy()
        .and.returnValue(Observable.of(true));

      component.ngOnInit();
    });

    it(`should dispatch purchase action`, () => {
      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });
});
