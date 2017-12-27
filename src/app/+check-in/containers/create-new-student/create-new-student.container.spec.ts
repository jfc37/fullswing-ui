import { CheckInState } from '../../redux/check-in.state';
import { getElement } from '../../../../unit-test-helpers/html-queries';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewStudentContainer } from './create-new-student.container';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatCheckboxModule, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { ineeda } from 'ineeda';
import { ReplaySubject } from 'rxjs';

describe('CreateNewStudentContainer', () => {
  let component: CreateNewStudentContainer;
  let fixture: ComponentFixture<CreateNewStudentContainer>;

  let dialog: MatDialogRef<CreateNewStudentContainer>;
  let store: Store<CheckInState>;
  let isDisabledReplay: ReplaySubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
        MatFormFieldModule,
        NoopAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Store, useValue: {} }
      ],
      declarations: [CreateNewStudentContainer]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewStudentContainer);
    component = fixture.componentInstance;

    dialog = TestBed.get(MatDialogRef);
    dialog.close = jasmine.createSpy();

    isDisabledReplay = new ReplaySubject();
    store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy();
    store.select = jasmine.createSpy()
      .and.returnValue(isDisabledReplay);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`create button`, () => {
    let button: DebugElement;

    beforeEach(() => {
      button = getElement(fixture.debugElement, 'create-student-button');
      isDisabledReplay.next(false);
    });

    it(`should start as disabled`, () => {
      expect(button.nativeElement.disabled).toBe(true);
    });

    it(`should be enabled when all fields are filled in`, () => {
      Object.values(component.form.controls)
        .forEach(control => control.setValue('xxx'));
      component.form.controls['termsAndConditions'].setValue(true);

      fixture.detectChanges();

      expect(button.nativeElement.disabled).toBe(false);
    });

    it(`should be disabled when saving`, () => {
      Object.values(component.form.controls)
        .forEach(control => control.setValue('xxx'));
      component.form.controls['termsAndConditions'].setValue(true);
      isDisabledReplay.next(true);

      fixture.detectChanges();

      expect(button.nativeElement.disabled).toBe(true);
    });
  });
});
