import { PassOption, PassSelectionModel } from './pass-selection.component.model';
import { getElement, getElements } from '../../../../unit-test-helpers/html-queries';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassSelectionComponent } from './pass-selection.component';
import { ineeda } from 'ineeda';
import { MatRadioModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PassSelectionComponent', () => {
  let component: PassSelectionComponent;
  let fixture: ComponentFixture<PassSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatRadioModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PassSelectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassSelectionComponent);
    component = fixture.componentInstance;

    component.model = ineeda<PassSelectionModel>({ passes: [] });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should not display when model is null`, () => {
    component.model = null;

    fixture.detectChanges();

    const element = getElement(fixture.debugElement, 'pass-selection');
    expect(element).toBeFalsy();
  });

  it(`should have radio button for each pass option`, () => {
    component.model.passes = [
      ineeda<PassOption>({ cost: 30 }),
      ineeda<PassOption>({ cost: 30 }),
      ineeda<PassOption>({ cost: 30 }),
    ];

    fixture.detectChanges();

    const options = getElements(fixture.debugElement, 'pass-option');
    expect(options.length).toBe(component.model.passes.length);
  });

  it(`should emit id when radio button is selected`, () => {
    component.passOptionChanged.emit = jasmine.createSpy();
    component.model.passes = [
      ineeda<PassOption>({ id: 1, cost: 30 }),
      ineeda<PassOption>({ id: 2, cost: 30 }),
      ineeda<PassOption>({ id: 3, cost: 30 }),
    ];

    fixture.detectChanges();

    const options = getElements(fixture.debugElement, 'pass-option');

    options[0].query(By.css('.mat-radio-outer-circle')).nativeElement.click();
    expect(component.passOptionChanged.emit).toHaveBeenCalledWith(component.model.passes[0].id);

    fixture.detectChanges();

    options[2].query(By.css('.mat-radio-outer-circle')).nativeElement.click();
    expect(component.passOptionChanged.emit).toHaveBeenCalledWith(component.model.passes[2].id);

    fixture.detectChanges();
  });
});
