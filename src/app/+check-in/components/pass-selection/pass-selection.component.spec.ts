import { PassOption, PassSelectionModel } from './pass-selection.component.model';
import { getElement, getElements } from '../../../../unit-test-helpers/html-queries';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassSelectionComponent } from './pass-selection.component';
import { ineeda } from 'ineeda';
import { MatRadioModule } from '@angular/material';

describe('PassSelectionComponent', () => {
  let component: PassSelectionComponent;
  let fixture: ComponentFixture<PassSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatRadioModule],
      declarations: [ PassSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassSelectionComponent);
    component = fixture.componentInstance;

    component.model = ineeda<PassSelectionModel>({passes: []});

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
      ineeda<PassOption>({cost: 30}),
      ineeda<PassOption>({cost: 30}),
      ineeda<PassOption>({cost: 30}),
    ];

    fixture.detectChanges();

    const options = getElements(fixture.debugElement, 'pass-option');
    expect(options.length).toBe(component.model.passes.length);
  });
});
