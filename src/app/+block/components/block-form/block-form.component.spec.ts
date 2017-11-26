import { getElementInnerHtml } from '../../../../unit-test-helpers/html-queries';
import { BlockFormModel, BlockModel } from './block-form.component.model';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BlockFormComponent } from './block-form.component';
import { NO_ERRORS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ineeda } from 'ineeda';
import * as moment from 'moment';
import { MatCheckboxModule, MatSelectModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { INPUT_DEBOUNCE } from '../../../core/constants';
import { getArgument, resetSpy } from '../../../../unit-test-helpers/spy';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

const formControlNames = [
  'name',
  'startDate',
  'startTime',
  'minutesPerClass',
  'numberOfClasses',
  'classCapacity',
  'teacher'
];

describe('BlockFormComponent', () => {
  let component: BlockFormComponent;
  let fixture: ComponentFixture<BlockFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        // BrowserAnimationsModule,,
        NoopAnimationsModule
      ],
      declarations: [BlockFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockFormComponent);
    component = fixture.componentInstance;
    component.model = ineeda<BlockFormModel>({
      isLoading: false,
      teachers: []
    });
    spyOn(component.modelChanged, 'emit');
    spyOn(component.statusChanged, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`validation`, () => {
    formControlNames
      .forEach(name => {
        it(`${name} should be required`, () => {
          const formControl = component.form.get(name);
          formControl.setValue('');

          expect(formControl.valid).toBe(false);
        });
      });
  });

  describe(`input change`, () => {
    const block = {
      startDate: new Date(),
      inviteOnly: true,
      minutesPerClass: 40,
      name: 'First block',
      numberOfClasses: 10,
      classCapacity: 20,
      teacher: 3,
    };

    beforeEach(() => {
      component.model = ineeda<BlockFormModel>({
        block: ineeda<BlockModel>(block)
      });

      component.ngOnChanges({ model: new SimpleChange(null, null, false) });
    });

    it(`should not emit model changed event`, fakeAsync(() => {
      component.model = ineeda<BlockFormModel>({
        block: ineeda<BlockModel>(block)
      });
      component.ngOnChanges({ model: new SimpleChange(null, null, false) });
      tick(INPUT_DEBOUNCE);

      expect(component.modelChanged.emit).not.toHaveBeenCalled();
    }));

    [
      { formControlName: 'name', expectedValue: block.name },
      { formControlName: 'minutesPerClass', expectedValue: block.minutesPerClass },
      { formControlName: 'numberOfClasses', expectedValue: block.numberOfClasses },
      { formControlName: 'classCapacity', expectedValue: block.classCapacity },
      { formControlName: 'inviteOnly', expectedValue: block.inviteOnly },
      { formControlName: 'startDate', expectedValue: block.startDate },
      { formControlName: 'startTime', expectedValue: moment(block.startDate).format('HH:mm') },
    ].forEach(data => {
      it(`should set ${data.formControlName} form control`, () => {
        expect(component.form.get(data.formControlName).value).toBe(data.expectedValue);
      });
    });
  });

  describe(`emit model`, () => {
    formControlNames.forEach(name => {
      it(`should emit when ${name} changes`, fakeAsync(() => {
        component.form.get(name).setValue('blah');

        tick(INPUT_DEBOUNCE);

        expect(component.modelChanged.emit).toHaveBeenCalled();
      }));
    });

    it(`should combine startDate and startTime`, fakeAsync(() => {
      component.form.get('startDate').setValue(new Date('2017-02-20'));
      component.form.get('startTime').setValue('17:00');
      const expectedStartDate = new Date('2017-02-20T17:00');

      tick(INPUT_DEBOUNCE);

      const emittedValue = getArgument<BlockModel>(component.modelChanged.emit);

      expect(emittedValue.startDate).toEqual(expectedStartDate);
    }));
  });

  describe(`emit status`, () => {
    const block = {
      startDate: new Date(),
      inviteOnly: true,
      minutesPerClass: 40,
      name: 'First block',
      numberOfClasses: 10,
      classCapacity: 20,
      teacher: 1
    };

    beforeEach(() => {
      component.model = ineeda<BlockFormModel>({
        block: ineeda<BlockModel>(block)
      });

      component.ngOnChanges({ model: new SimpleChange(null, null, false) });
      resetSpy(component.statusChanged.emit);
    });

    it(`should emit when model input changes`, fakeAsync(() => {
      resetSpy(component.statusChanged.emit);
      component.model.block.name = '';

      component.ngOnChanges({ model: new SimpleChange(null, null, false) });
      tick(INPUT_DEBOUNCE);

      expect(component.statusChanged.emit).toHaveBeenCalled();
    }));

    it(`should emit when status becomes invalid`, fakeAsync(() => {
      component.form.get('name').setValue('aaa');
      tick(INPUT_DEBOUNCE);
      resetSpy(component.statusChanged.emit);

      component.form.get('name').setValue('');
      tick(INPUT_DEBOUNCE);

      expect(component.statusChanged.emit).toHaveBeenCalledWith(false);
    }));

    it(`should emit when status becomes valid`, fakeAsync(() => {
      component.form.get('name').setValue('');
      tick(INPUT_DEBOUNCE);
      resetSpy(component.statusChanged.emit);

      component.form.get('name').setValue('aaa');
      tick(INPUT_DEBOUNCE);

      expect(component.statusChanged.emit).toHaveBeenCalledWith(true);
    }));

    it(`should not emit when status remains invalid`, fakeAsync(() => {
      component.form.get('name').setValue('');
      tick(INPUT_DEBOUNCE);
      resetSpy(component.statusChanged.emit);

      component.form.get('name').setValue('');

      tick(INPUT_DEBOUNCE);

      expect(component.statusChanged.emit).not.toHaveBeenCalled();
    }));

    it(`should not emit when status remains valid`, fakeAsync(() => {
      component.form.get('name').setValue('aaa');
      tick(INPUT_DEBOUNCE);
      resetSpy(component.statusChanged.emit);

      component.form.get('name').setValue('bbb');

      tick(INPUT_DEBOUNCE);

      expect(component.statusChanged.emit).not.toHaveBeenCalled();
    }));
  });
});
